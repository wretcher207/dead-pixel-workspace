mod agent;
mod commands;
mod config;
mod parser;
mod session;
mod state;
mod uploader;
mod watcher;

use agent::spawn_agent;
use commands::{get_agent_status, get_config, save_config, set_paused};
use state::{new_shared_state, AgentState};
use std::sync::{atomic::AtomicBool, Arc};
use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager, WindowEvent,
};

pub fn run() {
    let shared = new_shared_state();
    let paused_flag: Arc<AtomicBool> = Arc::new(AtomicBool::new(false));

    tauri::Builder::default()
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_autostart::init(
            tauri_plugin_autostart::MacosLauncher::LaunchAgent,
            Some(vec![]),
        ))
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_shell::init())
        .manage(shared.clone())
        .manage(paused_flag.clone())
        .invoke_handler(tauri::generate_handler![
            get_agent_status,
            get_config,
            save_config,
            set_paused,
        ])
        .setup(move |app| {
            // Build tray menu
            let settings_item =
                MenuItem::with_id(app, "settings", "Settings", true, None::<&str>)?;
            let toggle_item =
                MenuItem::with_id(app, "toggle", "Pause", true, None::<&str>)?;
            let dashboard_item =
                MenuItem::with_id(app, "dashboard", "Open Dashboard", true, None::<&str>)?;
            let quit_item = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            let menu = Menu::with_items(
                app,
                &[&settings_item, &toggle_item, &dashboard_item, &quit_item],
            )?;

            TrayIconBuilder::new()
                .icon(app.default_window_icon().unwrap().clone())
                .tooltip("Claude's Receipts")
                .menu(&menu)
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "quit" => app.exit(0),
                    "settings" => {
                        if let Some(w) = app.get_webview_window("settings") {
                            let _ = w.show();
                            let _ = w.set_focus();
                        }
                    }
                    "dashboard" => {
                        use tauri_plugin_shell::ShellExt;
                        let _ = app.shell().open(
                            "https://claudes-receipts.netlify.app",
                            None,
                        );
                    }
                    "toggle" => {
                        // Pause/Resume is handled via IPC from the status popup.
                        // Menu item kept for discoverability; clicking it does nothing here.
                    }
                    _ => {}
                })
                .on_tray_icon_event(|tray, event| {
                    if let TrayIconEvent::Click {
                        button: MouseButton::Left,
                        button_state: MouseButtonState::Up,
                        ..
                    } = event
                    {
                        let app = tray.app_handle();
                        if let Some(w) = app.get_webview_window("status") {
                            let visible = w.is_visible().unwrap_or(false);
                            if visible {
                                let _ = w.hide();
                            } else {
                                let _ = w.show();
                                let _ = w.set_focus();
                            }
                        }
                    }
                })
                .build(app)?;

            // Register deep link handler
            use tauri_plugin_deep_link::DeepLinkExt;
            app.deep_link().on_open_url(|event| {
                for url in event.urls() {
                    handle_deep_link(url.as_str());
                }
            });

            // Auto-hide status popup on focus loss
            if let Some(status_win) = app.get_webview_window("status") {
                let win_for_cb = status_win.clone();
                status_win.on_window_event(move |event| {
                    if let WindowEvent::Focused(false) = event {
                        let _ = win_for_cb.hide();
                    }
                });
            }

            // Open Settings if unconfigured on first launch
            if config::read_config().is_none() {
                if let Some(w) = app.get_webview_window("settings") {
                    let _ = w.show();
                }
            }

            // Spawn agent task
            spawn_agent(shared.clone());

            // Silence unused-variant warning by referencing AgentState once.
            let _ = AgentState::Unconfigured;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn handle_deep_link(url: &str) {
    if !url.starts_with("claudes-receipts://auth") {
        return;
    }
    let query = url.split('?').nth(1).unwrap_or("");
    let params: std::collections::HashMap<&str, &str> = query
        .split('&')
        .filter_map(|pair| {
            let mut parts = pair.splitn(2, '=');
            Some((parts.next()?, parts.next()?))
        })
        .collect();

    let Some(device_id) = params.get("device-id") else { return };
    let Some(ingest_key) = params.get("ingest-key") else { return };
    let endpoint = params
        .get("endpoint")
        .copied()
        .unwrap_or("https://claudes-receipts.netlify.app");

    let cfg = config::HelperConfig {
        endpoint: url_decode(endpoint),
        device_id: url_decode(device_id),
        ingest_key: url_decode(ingest_key),
        surface: "desktop".into(),
    };
    let _ = config::write_config(&cfg);
}

fn url_decode(s: &str) -> String {
    let bytes = s.as_bytes();
    let mut out = Vec::with_capacity(bytes.len());
    let mut i = 0;
    while i < bytes.len() {
        match bytes[i] {
            b'+' => {
                out.push(b' ');
                i += 1;
            }
            b'%' if i + 2 < bytes.len() => {
                let hi = from_hex(bytes[i + 1]);
                let lo = from_hex(bytes[i + 2]);
                if let (Some(h), Some(l)) = (hi, lo) {
                    out.push((h << 4) | l);
                    i += 3;
                } else {
                    out.push(bytes[i]);
                    i += 1;
                }
            }
            b => {
                out.push(b);
                i += 1;
            }
        }
    }
    String::from_utf8_lossy(&out).into_owned()
}

fn from_hex(b: u8) -> Option<u8> {
    match b {
        b'0'..=b'9' => Some(b - b'0'),
        b'a'..=b'f' => Some(b - b'a' + 10),
        b'A'..=b'F' => Some(b - b'A' + 10),
        _ => None,
    }
}

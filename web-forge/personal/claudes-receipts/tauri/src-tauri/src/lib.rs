mod agent;
mod config;
mod parser;
mod session;
mod state;
mod uploader;
mod watcher;

pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error running tauri app");
}

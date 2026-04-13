mod config;
mod parser;

pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error running tauri app");
}

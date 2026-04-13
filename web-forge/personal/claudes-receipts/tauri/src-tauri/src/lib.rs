mod config;
mod parser;
mod session;
mod uploader;

pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error running tauri app");
}

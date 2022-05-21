#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use databara::commands;
use databara::error::DatabaraError;
use databara::models::DbState;
use databara::session::DfState;
use tauri::{CustomMenuItem, Menu};

fn main() -> std::result::Result<(), DatabaraError> {
    let menu = Menu::new().add_item(CustomMenuItem::new("file", "File"));
    tauri::Builder::default()
        .menu(menu)
        .manage(DfState::new()?)
        .manage(DbState::try_new()?)
        .invoke_handler(tauri::generate_handler![
            commands::catalogs,
            commands::schemas,
            commands::tables,
            commands::seed_table,
            commands::preview_table,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
    Ok(())
}

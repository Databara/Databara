#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use databara::commands;
use databara::db::DbState;
use databara::error::Result;
use databara::session::DfState;

fn main() -> Result<()> {
    tauri::Builder::default()
        .manage(DfState::new()?)
        .manage(DbState::try_new()?)
        .invoke_handler(tauri::generate_handler![
            commands::catalogs,
            commands::schemas,
            commands::tables,
            commands::seed_table,
            commands::preview_schema,
            commands::preview_table,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
    Ok(())
}

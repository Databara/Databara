#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use databara::commands;
use databara::error::DatabaraError;
use databara::models::DbState;
use databara::session::DfState;

fn main() -> std::result::Result<(), DatabaraError> {
  tauri::Builder::default()
    .manage(DfState::new())
    .manage(DbState::try_new()?)
    .invoke_handler(tauri::generate_handler![commands::catalogs])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
  Ok(())
}

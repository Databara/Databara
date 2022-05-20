mod catalog;

use super::session::DfState;

#[tauri::command]
pub fn catalogs(state: tauri::State<DfState>) -> Vec<String> {
  let state = state.ctx.lock().unwrap();
  catalog::get_catalog_names(&state)
}

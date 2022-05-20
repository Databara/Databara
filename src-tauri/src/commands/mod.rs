mod catalog;

use super::session::DfState;

#[tauri::command]
pub fn catalogs(state: tauri::State<DfState>) -> Vec<String> {
  let state = state.ctx.lock().unwrap();
  catalog::get_catalog_names(&state)
}

#[tauri::command]
pub fn schemas(state: tauri::State<DfState>, catalog: String) -> Option<Vec<String>> {
  let state = state.ctx.lock().unwrap();
  catalog::get_schema_names(&state, &catalog)
}

#[tauri::command]
pub fn tables(
  state: tauri::State<DfState>,
  catalog: String,
  schema: String,
) -> Option<Vec<String>> {
  let state = state.ctx.lock().unwrap();
  catalog::get_table_names(&state, &catalog, &schema)
}

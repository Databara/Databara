mod catalog;
mod editor;
mod preview;
mod seed;

use crate::session::DfState;

#[tauri::command]
pub fn catalogs(state: tauri::State<DfState>) -> Vec<String> {
    let ctx = state.ctx.clone();
    catalog::get_catalog_names(&ctx)
}

#[tauri::command]
pub fn schemas(state: tauri::State<DfState>, catalog: String) -> Option<Vec<String>> {
    let ctx = state.ctx.clone();
    catalog::get_schema_names(&ctx, &catalog)
}

#[tauri::command]
pub fn tables(
    state: tauri::State<DfState>,
    catalog: String,
    schema: String,
) -> Option<Vec<String>> {
    let ctx = state.ctx.clone();
    catalog::get_table_names(&ctx, &catalog, &schema)
}

#[tauri::command]
pub async fn seed_table(state: tauri::State<'_, DfState>) -> std::result::Result<String, String> {
    let ctx = state.ctx.clone();
    seed::seed_table(&ctx).await.map_err(|e| e.to_string())?;
    Ok("".to_string())
}

#[tauri::command]
pub async fn preview_table(
    state: tauri::State<'_, DfState>,
    catalog: String,
    schema: String,
    table: String,
) -> std::result::Result<Vec<serde_json::Map<String, serde_json::Value>>, String> {
    let ctx = state.ctx.clone();
    preview::preview_table(&ctx, catalog, schema, table)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn preview_schema(
    state: tauri::State<'_, DfState>,
    catalog: String,
    schema: String,
    table: String,
) -> std::result::Result<Vec<serde_json::Map<String, serde_json::Value>>, String> {
    let ctx = state.ctx.clone();
    preview::preview_schema(&ctx, catalog, schema, table)
        .await
        .map_err(|e| e.to_string())
}

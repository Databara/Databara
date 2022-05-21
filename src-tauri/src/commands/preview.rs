use arrow::json::writer::record_batches_to_json_rows;
use datafusion::error::DataFusionError;
use datafusion::execution::context::SessionContext;
use serde_json::map::Map;
use serde_json::Value;

pub(crate) async fn preview_table(
    ctx: &SessionContext,
    catalog: String,
    schema: String,
    table: String,
) -> std::result::Result<Vec<Map<String, Value>>, DataFusionError> {
    let sql = format!("SELECT * FROM {}.{}.{} LIMIT 1000", catalog, schema, table);
    let df = ctx.sql(&sql).await?;
    let batches = df.collect().await?;
    record_batches_to_json_rows(batches.as_slice()).map_err(DataFusionError::ArrowError)
}

use datafusion::arrow::json::writer::record_batches_to_json_rows;
use datafusion::error::DataFusionError;
use datafusion::error::Result;
use datafusion::execution::context::SessionContext;
use serde_json::map::Map;
use serde_json::Value;

type JsonResult = Vec<Map<String, Value>>;

async fn sql_to_json(ctx: &SessionContext, sql: &str) -> Result<JsonResult> {
    let df = ctx.sql(sql).await?;
    let batches = df.collect().await?;
    record_batches_to_json_rows(batches.as_slice()).map_err(DataFusionError::ArrowError)
}

pub(crate) async fn preview_table(
    ctx: &SessionContext,
    catalog: String,
    schema: String,
    table: String,
) -> Result<JsonResult> {
    let sql = format!("SELECT * FROM {}.{}.{} LIMIT 1000", catalog, schema, table);
    sql_to_json(ctx, &sql).await
}

pub(crate) async fn preview_schema(
    ctx: &SessionContext,
    catalog: String,
    schema: String,
    table: String,
) -> Result<JsonResult> {
    let sql = format!(
        "SELECT * FROM datafusion.information_schema.columns
            WHERE table_catalog = '{}'
            AND   table_schema = '{}'
            AND   table_name = '{}'",
        catalog, schema, table
    );
    sql_to_json(ctx, &sql).await
}

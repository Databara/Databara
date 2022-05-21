use datafusion::error::DataFusionError;
use datafusion::execution::context::SessionContext;

pub(crate) async fn seed_table(ctx: &SessionContext) -> std::result::Result<(), DataFusionError> {
    let _df = ctx
        .sql("CREATE TABLE valuetable AS VALUES(1,'HELLO'),(12,'DATAFUSION');")
        .await?;
    Ok(())
}

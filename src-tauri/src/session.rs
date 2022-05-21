use datafusion::error::DataFusionError;
use datafusion::execution::context::SessionContext;
use std::sync::Arc;

pub struct DfState {
    pub ctx: Arc<SessionContext>,
}

impl DfState {
    pub fn new() -> std::result::Result<Self, DataFusionError> {
        Ok(DfState {
            ctx: Arc::new(create_datafusion_context()?),
        })
    }
}

fn create_datafusion_context() -> std::result::Result<SessionContext, DataFusionError> {
    Ok(SessionContext::new())
}

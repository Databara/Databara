use datafusion::execution::context::SessionContext;
use std::sync::Mutex;

pub struct DfState {
  pub ctx: Mutex<SessionContext>,
}

impl DfState {
  pub fn new() -> Self {
    DfState {
      ctx: Mutex::new(create_datafusion_context()),
    }
  }
}

fn create_datafusion_context() -> SessionContext {
  SessionContext::new()
}

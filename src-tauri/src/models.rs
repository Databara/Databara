use crate::error::DatabaraError;
use rusqlite::Connection;
use std::sync::Mutex;

pub struct DbState {
  pub conn: Mutex<Connection>,
}

impl DbState {
  pub fn try_new() -> std::result::Result<Self, DatabaraError> {
    Ok(DbState {
      conn: Mutex::new(create_rusqlite_conn()?),
    })
  }
}

fn create_rusqlite_conn() -> std::result::Result<Connection, DatabaraError> {
  let conn = Connection::open_in_memory()?;
  Ok(conn)
}

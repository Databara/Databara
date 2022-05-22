use crate::error::{DatabaraError, Result};
use diesel::sqlite::SqliteConnection;
use std::env;
use std::sync::Mutex;

pub struct DbState {
  pub conn: Mutex<SqliteConnection>,
}

impl DbState {
  pub fn try_new() -> Result<Self> {
    Ok(DbState {
      conn: Mutex::new(establish_connection()?),
    })
  }
}

const IN_MEMORY_URL: &str = "sqlite://:memory:";

fn establish_connection() -> SqliteConnection {
  dotenv().ok();
  let database_url = env::var("DATABASE_URL").unwrap_or(IN_MEMORY_URL.to_string());
  SqliteConnection::establish(&database_url)
    .expect(&format!("Error connecting to {}", database_url))
}

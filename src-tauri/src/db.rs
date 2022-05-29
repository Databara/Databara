use crate::error::Result;
use diesel::connection::Connection;
use diesel::sqlite::SqliteConnection;
use dotenv::dotenv;
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

const IN_MEMORY_URL: &str = ":memory:";

fn establish_connection() -> Result<SqliteConnection> {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").unwrap_or_else(|| IN_MEMORY_URL.to_string());
    let conn = SqliteConnection::establish(&database_url)?;
    Ok(conn)
}

use thiserror::Error;

#[derive(Error, Debug)]
pub enum DatabaraError {
  #[error("rusqlite error")]
  RusqliteError(#[from] rusqlite::Error),
}

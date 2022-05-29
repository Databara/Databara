use thiserror::Error;

#[derive(Error, Debug)]
pub enum DatabaraError {
    #[error("diesel connection error")]
    DbConnectionError(#[from] diesel::ConnectionError),
    #[error("datafusion error")]
    DataFusionError(#[from] datafusion::error::DataFusionError),
}

pub type Result<T> = std::result::Result<T, DatabaraError>;

use diesel::backend::Backend;
use diesel::Queryable;
use std::time::Duration;
use std::time::SystemTime;

#[derive(Debug)]
pub struct Timestamp(pub SystemTime);

impl Into<u64> for Timestamp {
    fn into(self) -> u64 {
        self.0.elapsed().unwrap().as_secs()
    }
}

impl<DB, ST> Queryable<ST, DB> for Timestamp
where
    DB: Backend,
    u64: Queryable<ST, DB>,
{
    type Row = <u64 as Queryable<ST, DB>>::Row;

    fn build(row: Self::Row) -> Self {
        let ts = SystemTime::UNIX_EPOCH + Duration::from_secs(u64::build(row));
        Timestamp(ts)
    }
}

#[derive(Debug, Queryable)]
pub struct EditorTab {
    pub id: i32,
    pub title: Option<String>,
    pub content: Option<String>,
    #[diesel(deserialize_as = "Timestamp")]
    pub created_at: Timestamp,
    #[diesel(deserialize_as = "Timestamp")]
    pub updated_at: Timestamp,
}

use diesel::Queryable;
use std::time::SystemTime;

#[derive(Debug, Queryable)]
pub struct EditorTab {
    pub id: i32,
    pub title: String,
    pub content: String,
    pub created_at: SystemTime,
    pub updated_at: SystemTime,
}

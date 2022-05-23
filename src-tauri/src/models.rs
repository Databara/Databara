use diesel::Queryable;
use serde::Serialize;
use std::time::SystemTime;

#[derive(Debug, Queryable)]
struct EditorTab {
  pub id: i32,
  pub title: String,
  pub content: String,
  pub created_at: SystemTime,
  pub updated_at: SystemTime,
}

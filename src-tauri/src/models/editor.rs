use serde::Serialize;
use std::time::SystemTime;

#[derive(Debug, Serialize)]
struct EditorTab {
    id: i32,
    title: String,
    content: String,
    created_at: SystemTime,
    updated_at: SystemTime,
}

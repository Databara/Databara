mod editor;

extern crate diesel;

pub use editor::EditorTab;

use diesel::prelude::*;
use diesel::SqliteConnection;

pub fn load_editor_tabs(conn: &SqliteConnection) -> Vec<EditorTab> {
  use crate::schema::editor_tabs::dsl::*;
  editor_tabs.limit(5).load::<EditorTab>(conn).unwrap()
}

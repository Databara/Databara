-- Your SQL goes here
CREATE TABLE IF NOT EXISTS editor_tabs (
  id INTEGER PRIMARY KEY,
  title TEXT,
  content TEXT,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
  updated_at INTEGER NOT NULL DEFAULT (strftime('%s','now'))
) STRICT;

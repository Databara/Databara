-- Your SQL goes here
CREATE TABLE IF NOT EXISTS editor_tabs (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  content TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT (strftime('%s','now')),
  updated_at TIMESTAMP NOT NULL DEFAULT (strftime('%s','now'))
) STRICT;

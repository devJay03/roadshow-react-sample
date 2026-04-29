CREATE TABLE roles(
	id SERIAL PRIMARY KEY NOT NULL,
	name TEXT NOT NULL UNIQUE
)
-- seed niyo nalang to
INSERT INTO roles (name) VALUES ('admin'), ('employee');
-- update niyo nalang users table 
ALTER TABLE users
ADD COLUMN role_id INTEGER REFERENCES roles(id);
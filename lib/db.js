const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.resolve(__dirname, "../data/library.db"));

const sqlBookTable = `
CREATE TABLE IF NOT EXISTS book (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	image TEXT NOT NULL,
	title TEXT NOT NULL,
	tome TEXT DEFAULT NULL,
	author TEXT NOT NULL,
	editor TEXT NOT NULL,
	date INTEGER NOT NULL,
	link TEXT NOT NULL,
	
	section TEXT NOT NULL,
	genre TEXT NOT NULL,
	thematic TEXT NOT NULL,
	format TEXT NOT NULL,
	age INTEGER DEFAULT NULL,
	
	ean TEXT NOT NULL,
	deweyClass TEXT NOT NULL,
	deweyCote TEXT NOT NULL,
	coteSection TEXT NOT NULL,
	coteName TEXT NOT NULL,
	
	provider TEXT NOT NULL,
	status TEXT NOT NULL,
	price REAL NOT NULL
)
`;

function initDatabase() {
	try {
		db.exec(sqlBookTable);
		console.log("✅ Table book créé");
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	db,
	initDatabase,
};

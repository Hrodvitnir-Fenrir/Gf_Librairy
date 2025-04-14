const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.resolve(__dirname, "../data/library.db"));

const sqlAccTable = `
CREATE TABLE IF NOT EXISTS acc (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	image TEXT NOT NULL,
	title TEXT NOT NULL,
	tome INTEGER DEFAULT NULL,
	author TEXT NOT NULL,
	editor TEXT NOT NULL,
	date INTEGER NOT NULL,
	link TEXT NOT NULL,

	section TEXT NOT NULL,
	genre TEXT NOT NULL,
	format TEXT NOT NULL,
	age INTEGER DEFAULT NULL,

	ean TEXT NOT NULL,
	coteSection TEXT NOT NULL,
	coteName TEXT NOT NULL,

	provider TEXT NOT NULL,
	status TEXT NOT NULL,
	price REAL NOT NULL

)
`;

const sqlRomJuniorTable = `
CREATE TABLE IF NOT EXISTS rom_junior (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	image TEXT NOT NULL,
	title TEXT NOT NULL,
	tome INTEGER DEFAULT NULL,
	author TEXT NOT NULL,
	editor TEXT NOT NULL,
	date INTEGER NOT NULL,
	link TEXT NOT NULL,

	section TEXT NOT NULL,
	genre TEXT NOT NULL,
	format TEXT NOT NULL,
	age INTEGER DEFAULT NULL,

	ean TEXT NOT NULL,
	coteSection TEXT NOT NULL,
	coteName TEXT NOT NULL,

	provider TEXT NOT NULL,
	status TEXT NOT NULL,
	price REAL NOT NULL
)
`;

const sqlRomYoungTable = `
CREATE TABLE IF NOT EXISTS rom_young (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	image TEXT NOT NULL,
	title TEXT NOT NULL,
	tome INTEGER DEFAULT NULL,
	author TEXT NOT NULL,
	editor TEXT NOT NULL,
	date INTEGER NOT NULL,
	link TEXT NOT NULL,

	section TEXT NOT NULL,
	genre TEXT NOT NULL,
	format TEXT NOT NULL,
	age INTEGER DEFAULT NULL,

	ean TEXT NOT NULL,
	coteSection TEXT NOT NULL,
	coteName TEXT NOT NULL,

	provider TEXT NOT NULL,
	status TEXT NOT NULL,
	price REAL NOT NULL
)
`;

const sqlDocJuniorTable = `
CREATE TABLE IF NOT EXISTS doc_junior (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	image TEXT NOT NULL,
	title TEXT NOT NULL,
	tome INTEGER DEFAULT NULL,
	author TEXT NOT NULL,
	editor TEXT NOT NULL,
	date INTEGER NOT NULL,
	link TEXT NOT NULL,

	section TEXT NOT NULL,
	thematic TEXT NOT NULL,
	format TEXT NOT NULL,
	age INTEGER DEFAULT NULL,
	
	ean TEXT NOT NULL,
	coteSection TEXT NOT NULL,
	coteName TEXT NOT NULL,
	deweyclass TEXT NOT NULL,
	deweycote TEXT NOT NULL,

	provider TEXT NOT NULL,
	status TEXT NOT NULL,
	price REAL NOT NULL
)
`;

const sqlMangaTable = `
CREATE TABLE IF NOT EXISTS manga (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	image TEXT NOT NULL,
	title TEXT NOT NULL,
	tome INTEGER DEFAULT NULL,
	author TEXT NOT NULL,
	editor TEXT NOT NULL,
	date INTEGER NOT NULL,
	link TEXT NOT NULL,

	section TEXT NOT NULL,
	genre TEXT NOT NULL,
	format TEXT NOT NULL,
	age INTEGER DEFAULT NULL,

	ean TEXT NOT NULL,
	coteSection TEXT NOT NULL,
	coteName TEXT NOT NULL,

	provider TEXT NOT NULL,
	status TEXT NOT NULL,
	price REAL NOT NULL
)
`;

const sqlBDJuniorTable = `
CREATE TABLE IF NOT EXISTS bd_junior (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	image TEXT NOT NULL,
	title TEXT NOT NULL,
	tome INTEGER DEFAULT NULL,
	author TEXT NOT NULL,
	editor TEXT NOT NULL,
	date INTEGER NOT NULL,
	link TEXT NOT NULL,

	genre TEXT NOT NULL,
	format TEXT NOT NULL,
	age INTEGER DEFAULT NULL,

	ean TEXT NOT NULL,
	coteSection TEXT NOT NULL,
	coteName TEXT NOT NULL,

	provider TEXT NOT NULL,
	status TEXT NOT NULL,
	price REAL NOT NULL
)
`;

const sqlRomAdultTable = `
CREATE TABLE IF NOT EXISTS rom_adult (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	image TEXT NOT NULL,
	title TEXT NOT NULL,
	tome INTEGER DEFAULT NULL,
	author TEXT NOT NULL,
	editor TEXT NOT NULL,
	date INTEGER NOT NULL,
	link TEXT NOT NULL,

	section TEXT NOT NULL,
	format TEXT NOT NULL,
	age INTEGER DEFAULT NULL,

	ean TEXT NOT NULL,
	coteSection TEXT NOT NULL,
	coteName TEXT NOT NULL,

	provider TEXT NOT NULL,
	status TEXT NOT NULL,
	price REAL NOT NULL
)
`;

const sqlDocAdultTable = `
CREATE TABLE IF NOT EXISTS doc_adult (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	image TEXT NOT NULL,
	title TEXT NOT NULL,
	tome INTEGER DEFAULT NULL,
	author TEXT NOT NULL,
	editor TEXT NOT NULL,
	date INTEGER NOT NULL,
	link TEXT NOT NULL,

	thematic TEXT NOT NULL,
	format TEXT NOT NULL,
	age INTEGER DEFAULT NULL,
	
	ean TEXT NOT NULL,
	coteSection TEXT NOT NULL,
	coteName TEXT NOT NULL,
	deweyclass TEXT NOT NULL,
	deweycote TEXT NOT NULL,

	provider TEXT NOT NULL,
	status TEXT NOT NULL,
	price REAL NOT NULL
)
`;

const sqlBDAdultTable = `
CREATE TABLE IF NOT EXISTS bd_adult (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	image TEXT NOT NULL,
	title TEXT NOT NULL,
	tome INTEGER DEFAULT NULL,
	author TEXT NOT NULL,
	editor TEXT NOT NULL,
	date INTEGER NOT NULL,
	link TEXT NOT NULL,

	genre TEXT NOT NULL,
	section TEXT NOT NULL,
	format TEXT NOT NULL,
	age INTEGER DEFAULT NULL,

	ean TEXT NOT NULL,
	coteSection TEXT NOT NULL,
	coteName TEXT NOT NULL,

	provider TEXT NOT NULL,
	status TEXT NOT NULL,
	price REAL NOT NULL
)
`;

function initDatabase() {
	try {
		db.exec(sqlAccTable);
		db.exec(sqlRomYoungTable);
		db.exec(sqlRomJuniorTable);
		db.exec(sqlRomAdultTable);
		db.exec(sqlDocJuniorTable);
		db.exec(sqlDocAdultTable);
		db.exec(sqlMangaTable);
		db.exec(sqlBDJuniorTable);
		db.exec(sqlBDAdultTable);
		console.log(
			"✅ Toutes les tables ont été créées (ou existaient déjà).",
		);
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	db,
	initDatabase,
};

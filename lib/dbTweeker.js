const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.resolve(__dirname, "../data/library.db"));

const sqlBookTable = `
CREATE TABLE IF NOT EXISTS book (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	type TEXT NOT NULL,
	ean TEXT NOT NULL,

	title TEXT NOT NULL,
	image TEXT NOT NULL,
	tome TEXT DEFAULT NULL,
	date INTEGER NOT NULL,
	age INTEGER DEFAULT NULL,
	author TEXT NOT NULL,
	editor TEXT NOT NULL,
	link TEXT DEFAULT NULL,
	
	section TEXT DEFAULT NULL,
	genre TEXT DEFAULT NULL,
	thematic TEXT DEFAULT NULL,
	deweyClass TEXT DEFAULT NULL,
	deweyCote TEXT DEFAULT NULL,
	coteSection TEXT NOT NULL,
	coteName TEXT NOT NULL,
	
	provider TEXT NOT NULL,
	status TEXT NOT NULL,
	price REAL NOT NULL,
	format TEXT NOT NULL
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

function insertBook(book) {
	const stmt = db.prepare(`
		INSERT INTO book (
			type,
			image, title, tome, author, editor, date, link,
			section, genre, thematic, format, age,
			ean, deweyClass, deweyCote, coteSection, coteName,
			provider, status, price
		)
		VALUES (
			@type,
			@image, @title, @tome, @author, @editor, @date, @link,
			@section, @genre, @thematic, @format, @age,
			@ean, @deweyClass, @deweyCote, @coteSection, @coteName,
			@provider, @status, @price
		)
	`);
	stmt.run(book);
}

function getBookByEan(ean) {
	const stmt = db.prepare("SELECT * FROM book WHERE ean = @ean");
	const book = stmt.get({ ean });
	return book;
}

module.exports = {
	db,
	initDatabase,
	insertBook,
	getBookByEan,
};

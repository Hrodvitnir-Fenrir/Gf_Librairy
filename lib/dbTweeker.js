const { db } = require("./db.js");

function insertBook(book) {
	const stmt = db.prepare(`
		INSERT INTO book (
			image, title, tome, author, editor, date, link,
			section, genre, thematic, format, age,
			ean, deweyClass, deweyCote, coteSection, coteName,
			provider, status, price
		)
		VALUES (
			@image, @title, @tome, @author, @editor, @date, @link,
			@section, @genre, @thematic, @format, @age,
			@ean, @deweyClass, @deweyCote, @coteSection, @coteName,
			@provider, @status, @price
		)
	`);
	stmt.run(book);
}

module.exports = {
	insertBook,
};

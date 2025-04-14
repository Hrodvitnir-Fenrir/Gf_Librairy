const { db } = require("./db.js");

function insertAcc(book) {
	const stmt = db.prepare(`
		INSERT INTO acc (
			image, title, tome, author, editor, date, link,
			section, genre, format, age,
			ean, coteSection, coteName,
			provider, status, price
		)
		VALUES (
			@image, @title, @tome, @author, @editor, @date, @link,
			@section, @genre, @format, @age,
			@ean, @coteSection, @coteName,
			@provider, @status, @price
		)
	`);
	stmt.run(book);
}

function insertRomJunior(book) {
	const stmt = db.prepare(`
		INSERT INTO rom_junior (
			image, title, tome, author, editor, date, link,
			section, genre, format, age,
			ean, coteSection, coteName,
			provider, status, price
		)
		VALUES (
			@image, @title, @tome, @author, @editor, @date, @link,
			@section, @genre, @format, @age,
			@ean, @coteSection, @coteName,
			@provider, @status, @price
		)
	`);
	stmt.run(book);
}

function insertRomYoung(book) {
	const stmt = db.prepare(`
		INSERT INTO rom_young (
			image, title, tome, author, editor, date, link,
			section, genre, format, age,
			ean, coteSection, coteName,
			provider, status, price
		)
		VALUES (
			@image, @title, @tome, @author, @editor, @date, @link,
			@section, @genre, @format, @age,
			@ean, @coteSection, @coteName,
			@provider, @status, @price
		)
	`);
	stmt.run(book);
}

function insertDocJunior(book) {
	const stmt = db.prepare(`
		INSERT INTO doc_junior (
			image, title, tome, author, editor, date, link,
			section, thematic, format, age,
			ean, coteSection, coteName, deweyclass, deweycote,
			provider, status, price
		)
		VALUES (
			@image, @title, @tome, @author, @editor, @date, @link,
			@section, @thematic, @format, @age,
			@ean, @coteSection, @coteName, @deweyclass, @deweycote,
			@provider, @status, @price
		)
	`);
	stmt.run(book);
}

function insertManga(book) {
	const stmt = db.prepare(`
		INSERT INTO manga (
			image, title, tome, author, editor, date, link,
			section, genre, format, age,
			ean, coteSection, coteName,
			provider, status, price
		)
		VALUES (
			@image, @title, @tome, @author, @editor, @date, @link,
			@section, @genre, @format, @age,
			@ean, @coteSection, @coteName,
			@provider, @status, @price
		)
	`);
	stmt.run(book);
}

function insertDBJunior(book) {
	const stmt = db.prepare(`
		INSERT INTO bd_junior (
			image, title, tome, author, editor, date, link,
			genre, format, age,
			ean, coteSection, coteName,
			provider, status, price
		)
		VALUES (
			@image, @title, @tome, @author, @editor, @date, @link,
			@genre, @format, @age,
			@ean, @coteSection, @coteName,
			@provider, @status, @price
		)
	`);
	stmt.run(book);
}

function insertRomAdult(book) {
	const stmt = db.prepare(`
		INSERT INTO rom_adult (
			image, title, tome, author, editor, date, link,
			section, format, age,
			ean, coteSection, coteName,
			provider, status, price
		)
		VALUES (
			@image, @title, @tome, @author, @editor, @date, @link,
			@section, @format, @age,
			@ean, @coteSection, @coteName,
			@provider, @status, @price
		)
	`);
	stmt.run(book);
}

function insertDocAdult(book) {
	const stmt = db.prepare(`
		INSERT INTO doc_adult (
			image, title, tome, author, editor, date, link,
			thematic, format, age,
			ean, coteSection, coteName, deweyclass, deweycote,
			provider, status, price
		)
		VALUES (
			@image, @title, @tome, @author, @editor, @date, @link,
			@thematic, @format, @age,
			@ean, @coteSection, @coteName, @deweyclass, @deweycote,
			@provider, @status, @price
		)
	`);
	stmt.run(book);
}

function insertBDAdult(book) {
	const stmt = db.prepare(`
		INSERT INTO bd_adult (
			image, title, tome, author, editor, date, link,
			genre, section, format, age,
			ean, coteSection, coteName,
			provider, status, price
		)
		VALUES (
			@image, @title, @tome, @author, @editor, @date, @link,
			@genre, @section, @format, @age,
			@ean, @coteSection, @coteName,
			@provider, @status, @price
		)
	`);
	stmt.run(book);
}

module.exports = {
	insertAcc,
	insertRomJunior,
	insertRomYoung,
	insertDocJunior,
	insertManga,
	insertDBJunior,
	insertRomAdult,
	insertDocAdult,
	insertBDAdult,
};

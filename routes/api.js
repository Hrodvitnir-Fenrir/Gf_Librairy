const express = require("express");
const router = express.Router();
const { insertBook, getBookByEan } = require("../lib/dbTweeker.js");
const { fetchBookInfo } = require("../lib/fetchBook.js");

router.post("/newBook", (req, res) => {
	try {
		insertBook(req.body);
		res.status(200).json({ success: true });
	} catch (err) {
		console.error("Erreur insertAcc :", err);
		res.status(500).json({ success: false, message: "Erreur serveur" });
	}
});

router.post("/getBookByEan", async (req, res) => {
	const { ean } = req.body;
	try {
		const book = await getBookByEan(ean);
		res.status(200).json({ success: true, data: book });
	} catch (err) {
		console.error("Erreur getBookByEan :", err);
		res.status(500).json({ success: false, message: "Erreur serveur" });
	}
});

router.get("/fetchInfo", async (req, res) => {
	const data = await fetchBookInfo(req.query.ean);

	if (data != null) {
		res.status(200).json({ success: true, data });
	} else {
		res.status(404).json({ success: false, message: "Livre non trouvé" });
	}
});

module.exports = router;

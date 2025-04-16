const express = require("express");
const router = express.Router();
const { insertAcc } = require("../lib/dbTweeker");

router.post("/acc", (req, res) => {
	try {
		insertAcc(req.body);
		res.status(200).json({ success: true });
	} catch (err) {
		console.error("Erreur insertAcc :", err);
		res.status(500).json({ success: false, message: "Erreur serveur" });
	}
});

router.get("/fetchInfo", async (req, res) => {
	try {
		const response = await fetch(
			`https://www.googleapis.com/books/v1/volumes?q=isbn:${req.query.ean}`,
		);
		const responseData = await response.json();
		const data = responseData.items?.[0];

		if (!data) {
			return res
				.status(404)
				.json({ success: false, message: "Livre non trouvé" });
		}
		res.status(200).json({ success: true, data });
	} catch (err) {
		console.error("Erreur fetchInfo :", err);
		res.status(500).json({ success: false, message: "Erreur serveur" });
	}
});

module.exports = router;

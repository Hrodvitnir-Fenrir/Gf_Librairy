const express = require("express");
const router = express.Router();
const { insertAcc } = require("../lib/dbTweeker.js");
const { fetchBookInfo } = require("../lib/fetchBook.js");

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
	const data = await fetchBookInfo(req.query.ean);

	if (data != null) {
		res.status(200).json({ success: true, data });
	} else {
		res.status(404).json({ success: false, message: "Livre non trouvé" });
	}
});

module.exports = router;

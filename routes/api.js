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

module.exports = router;

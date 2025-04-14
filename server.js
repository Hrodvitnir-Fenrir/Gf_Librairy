const express = require("express");
const path = require("path");
const { db, initDatabase } = require("./lib/db.js");

const app = express();
const PORT = 4000;

initDatabase();

// Sert les fichiers HTML/CSS/JS depuis le dossier public
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Si tu as une page d'accueil en public/index.html
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

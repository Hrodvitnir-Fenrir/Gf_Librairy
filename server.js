const express = require("express");
const path = require("path");
const { db, initDatabase } = require("./lib/db.js");
const apiRoutes = require("./routes/api");

const types = [
	{
		id: "acc",
		title: "Album Compte Comptine",
		sections: ["Albums", "Imagier", "Conte", "Comptine"],
		genres: ["Tout petit", "Tout public"],
	},
	{
		id: "romJunior",
		title: "Roman Jeunesse",
		sections: ["Roman", "Imagier", "Conte", "Comptine"],
		genres: ["Tout petit", "Tout public"],
	},
];

const app = express();
const PORT = 4000;

initDatabase();

// Sert les fichiers HTML/CSS/JS depuis le dossier public
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use("/api", apiRoutes);

// Si tu as une page d'accueil en public/index.html
app.get("/", (req, res) => {
	// res.sendFile(path.join(__dirname, "public", "index.html"));
	res.render("index", { types });
});

app.listen(PORT, () => {
	console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

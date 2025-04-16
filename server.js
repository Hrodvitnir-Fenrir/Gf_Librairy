const express = require("express");
const path = require("path");
const { db, initDatabase } = require("./lib/db.js");
const apiRoutes = require("./routes/api");

const types = [
	{
		id: "all",
		title: "Tout",
		sections: null,
		coteSections: null,
		genres: null,
		format: null,
		deweyClass: null,
		thematic: null,
	},
	{
		id: "acc",
		title: "Album Compte Comptine",
		sections: ["Albums", "Imagier", "Conte", "Comptine"],
		coteSections: ["A", "I", "C", "Picto"],
		genres: ["Tout petit", "Tout public"],
		format: ["Poche", "Grand format", "Carré", "Italien", "Livre + CD"],
		deweyClass: null,
		thematic: null,
	},
	{
		id: "romJunior",
		title: "Roman Jeunesse",
		sections: ["Roman", "Première lecture", "Théâtre", "Poésie"],
		coteSections: ["JR", "PR", "JT", "JP"],
		genres: [
			"Action Aventure",
			"SF Fantaisie",
			"Historique",
			"Tranche de vie",
			"Policier Thriller",
			"Humour",
		],
		format: ["Poche", "Grand format", "Carré", "Italien", "Livre + CD"],
		deweyClass: null,
		thematic: null,
	},
	{
		id: "romYoung",
		title: "Roman Ado",
		sections: ["Roman", "Théâtre", "Poésie"],
		coteSections: ["R ADO", "T ADO", "P ADO"],
		genres: [
			"Action Aventure",
			"SF Fantaisie",
			"Historique",
			"Tranche de vie",
			"Policier Thriller",
			"Humour",
		],
		format: ["Poche", "Grand format", "Carré", "Italien", "Livre + CD"],
		deweyClass: null,
		thematic: null,
	},
	{
		id: "docJunior",
		title: "Doc Jeunesse",
		sections: ["Doc Jeunesse", "Petit doc"],
		coteSections: [],
		genres: null,
		format: ["Poche", "Grand format", "Carré", "Italien", "Livre + CD"],
		deweyClass: [
			"000",
			"100",
			"200",
			"300",
			"400",
			"500",
			"600",
			"700",
			"800",
			"900",
		],
		thematic: [
			"Vie pratique et Loisirs",
			"Sciences, techniques et nature",
			"Art et Culture",
			"Sciences humaines et sociales",
			"Nature",
			"Langue et communication",
			"Sentiment",
			"Monde",
			"Sciences",
		],
	},
	{
		id: "manga",
		title: "Manga",
		sections: ["Jeunesse", "Adulte", "Ado"],
		coteSections: ["MJ", "MADO", "MA"],
		genres: ["Komodo", "Shonen", "Shojo", "Seinen", "Josei"],
		format: ["Poche", "Grand format", "Carré", "Italien", "Livre + CD"],
		deweyClass: null,
		thematic: null,
	},
	{
		id: "bdJunior",
		title: "BD Jeunesse",
		sections: null,
		coteSections: ["BDJ"],
		genres: [
			"Action Aventure",
			"SF Fantaisie",
			"Histoire",
			"Tranche de vie",
			"Policier Thriller",
			"Humour",
			"Documentaire Société",
		],
		format: ["Poche", "Grand format", "Carré", "Italien", "Livre + CD"],
		deweyClass: null,
		thematic: null,
	},
	{
		id: "romAdult",
		title: "Roman Adulte",
		sections: [
			"VO Anglais",
			"SF fantaisie",
			"Historique",
			"Policier Thriller",
			"Gros caractères",
			"Local Regional",
			"Litterature",
		],
		coteSections: ["VO ANG", "SF", "RH", "RP", "GC", "RL", "R"],
		genres: null,
		format: ["Poche", "Grand format", "Carré", "Italien", "Livre + CD"],
		deweyClass: null,
		thematic: null,
	},
	{
		id: "docAdult",
		title: "Doc Adulte",
		sections: null,
		coteSections: [],
		genres: null,
		format: ["Poche", "Grand format", "Carré", "Italien", "Livre + CD"],
		deweyClass: [
			"000",
			"100",
			"200",
			"300",
			"400",
			"500",
			"600",
			"700",
			"800",
			"900",
		],
		thematic: [
			"Vie pratique et Loisirs",
			"Sciences, techniques et nature",
			"Local Regional",
			"Emploi Formation",
			"Art et Culture",
			"Sciences humaines et sociales",
			"Biographie",
		],
	},
	{
		id: "bdAdult",
		title: "BD Adulte/Ado",
		sections: ["Adulte", "Ado"],
		coteSections: ["BDA", "BDADO"],
		genres: [
			"Action Aventure",
			"SF Fantaisie",
			"Histoire",
			"Tranche de vie",
			"Policier Thriller",
			"Humour",
			"Documentaire Société",
		],
		format: ["Poche", "Grand format", "Carré", "Italien", "Livre + CD"],
		deweyClass: null,
		thematic: null,
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

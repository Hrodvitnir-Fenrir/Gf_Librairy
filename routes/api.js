const express = require("express");
const axios = require("axios");
const xml2js = require("xml2js");
const router = express.Router();
const { insertAcc } = require("../lib/dbTweeker");

function parseDatafields(recordData) {
	return (recordData["mxc:datafield"] || []).map((df) => {
		const { tag, ind1, ind2 } = df.$;
		const subfields = {};
		(df["mxc:subfield"] || []).forEach((sf) => {
			const code = sf.$.code,
				val = sf._;
			if (subfields[code]) {
				subfields[code] = [].concat(subfields[code], val);
			} else {
				subfields[code] = val;
			}
		});
		return { tag, ind1, ind2, subfields };
	});
}

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
		const isbn = req.query.ean;
		const { data: xml } = await axios.get(
			"https://catalogue.bnf.fr/api/SRU",
			{
				params: {
					version: "1.2",
					operation: "searchRetrieve",
					query: `bib.isbn adj "${isbn}"`,
					maximumRecords: 1,
				},
			},
		);

		// 2. Parsing XML → JS
		const parser = new xml2js.Parser();
		const result = await parser.parseStringPromise(xml);

		// 3. Accès au record MARC
		const rec =
			result["srw:searchRetrieveResponse"]["srw:records"][0][
				"srw:record"
			][0];
		const marc = rec["srw:recordData"][0]["mxc:record"][0];

		// 4. Transformation des datafields
		const dfs = parseDatafields(marc);

		// 5. Extraction titre, auteur, prix
		const df200 = dfs.find((x) => x.tag === "200");
		const df010 = dfs.find((x) => x.tag === "010");
		const title = df200?.subfields.a || null;
		const author = df200?.subfields.f || null;
		const price = (() => {
			const d = df010?.subfields.d?.toString();
			const m = d?.match(/(\d+([\.,]\d+)?)/);
			return m ? parseFloat(m[1].replace(",", ".")) : null;
		})();

		// 6. Extraction éditeur et année (214 ind2=0 ou 210)
		const dfImprint =
			dfs.find((x) => x.tag === "214" && x.ind2 === "0") ||
			dfs.find((x) => x.tag === "210");
		const editor = dfImprint?.subfields.c || null;
		const publicationYear = (() => {
			const d = dfImprint?.subfields.d?.toString();
			const m = d?.match(/(\d{4})/);
			return m ? parseInt(m[1], 10) : null;
		})();

		// 7. Construction du lien BnF
		const recordId = marc.$.id;
		const bnfLink = `https://catalogue.bnf.fr/${recordId}`;

		// 8. Récupération de l'image de couverture
		const html = await axios.get(bnfLink).then((r) => r.data);
		const imgMatch = html.match(/#debut#(\d+)::C1#fin#/);

		let coverUrl = null;
		if (imgMatch?.[1]) {
			coverUrl = `https://catalogue.bnf.fr/couverture?appName=NE&idImage=${imgMatch[1]}&couverture=1`;
		}

		const data = {
			title,
			author,
			editor,
			publicationYear,
			price,
			bnfLink,
			coverUrl,
		};

		res.status(200).json({ success: true, data });
	} catch (err) {
		console.error("Erreur fetchInfo :", err);
		res.status(500).json({ success: false, message: "Erreur serveur" });
	}
});

module.exports = router;

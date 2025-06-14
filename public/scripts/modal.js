/* eslint-env browser */
import { getCurrentType } from "./fetchStatus.js";

// Fonction pour récupérer les informations d'un livre via l'EAN
export async function fetchBookInfo(ean, form) {
	if (!ean) return;

	const response = await fetch(`/api/fetchInfo?ean=${ean}`);
	const { data: book } = await response.json();
	console.log(book);

	form.querySelector("input[name='title']").value = book.title;
	form.querySelector("input[name='title']").dispatchEvent(new Event("input"));
	if (book.coverUrl != null) {
		form.querySelector("input[name='image']").value = book.coverUrl;
	}
	form.querySelector("input[name='date']").value = book.publicationYear;
	form.querySelector("input[name='author']").value = book.author;
	form.querySelector("input[name='author']").dispatchEvent(
		new Event("input"),
	);
	form.querySelector("input[name='editor']").value = book.editor;
	form.querySelector("input[name='link']").value = book.bnfLink;
	form.querySelector("input[name='price']").value = book.price;
}

// Fonction pour ouvrir le modal correspondant au type sélectionné
export function openModal(radios) {
	const type = getCurrentType(radios);
	if (!type || type === "all") return;

	const modal = document.getElementById("modal-" + type);
	if (modal) {
		modal.style.display = "flex";

		const form = modal.querySelector("form");
		if (form) form.reset();
		setupAutoFill(form);
	}
}

// Initialisation des boutons "fetch" dans les modaux
export function initializeFetchButtons() {
	// Sélectionner tous les formulaires dans les modaux
	const forms = document.querySelectorAll(".modal form");

	forms.forEach((form) => {
		// Récupérer le champ EAN et le bouton fetch dans chaque formulaire
		const eanInput = form.querySelector('input[name="ean"]');
		const fetchButton = form.querySelector("button.fetch");

		// Désactiver le bouton fetch par défaut
		if (fetchButton && eanInput) {
			fetchButton.setAttribute("disabled", "");

			// Ajouter un écouteur d'événement pour le champ EAN
			eanInput.addEventListener("input", function () {
				// Activer le bouton si le champ EAN contient du texte
				if (this.value.trim() !== "") {
					fetchButton.removeAttribute("disabled");
				} else {
					fetchButton.setAttribute("disabled", "");
				}
				// recherche si le livre est déjà dans la base de donnée
				checkDuplicate(this.value.trim());
			});

			// Ajouter l'écouteur d'événement pour le bouton fetch
			fetchButton.addEventListener("click", function () {
				fetchBookInfo(eanInput.value.trim(), form);
			});
		}
	});
}

// Configuration des écouteurs pour les modaux
export function setupModalListeners(radios) {
	// Ajouter les écouteurs une seule fois pour tous les modaux
	const modals = document.querySelectorAll(".modal");

	modals.forEach((modal) => {
		// Fermer le modal quand on clique sur le X ou Annuler
		const closeButtons = modal.querySelectorAll(".close");
		closeButtons.forEach((button) => {
			button.addEventListener("click", function () {
				modal.style.display = "none";
			});
		});

		// Gestion du formulaire
		const form = modal.querySelector("form");
		if (form) {
			form.addEventListener("submit", function (e) {
				e.preventDefault();
				submitForm(form, radios);
			});
		}
	});
}

async function checkDuplicate(ean) {
	const res = await fetch("/api/getBookByEan", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ean }),
	});
	const response = await res.json();

	if (response.data != undefined) {
		document.querySelector(".duplicate-tooltip").style.display = "block";
	} else {
		document.querySelector(".duplicate-tooltip").style.display = "none";
	}
}

function setupAutoFill(form) {
	const typeId = form.id.replace("accForm-", "");

	const coteNomInput = form.querySelector('input[name="coteName"]');
	const titleInput = form.querySelector('input[name="title"]');
	const tomeInput = form.querySelector('input[name="tome"]');
	const authorInput = form.querySelector('input[name="author"]');

	authorInput.addEventListener("input", () => {
		if (tomeInput.value === "") {
			coteNomInput.value = authorInput.value.split(" ")[1].slice(0, 3);
		} else {
			coteNomInput.value = titleInput.value.slice(0, 3);
		}
	});

	tomeInput.addEventListener("input", () => {
		if (tomeInput.value === "") {
			coteNomInput.value = authorInput.value.split(" ")[1].slice(0, 3);
		} else {
			coteNomInput.value = titleInput.value.slice(0, 3);
		}
	});

	if (
		typeId === "acc" ||
		typeId === "romJunior" ||
		typeId === "romYoung" ||
		typeId === "manga" ||
		typeId === "romAdult" ||
		typeId === "bdAdult"
	) {
		const sectionInput = form.querySelector('input[name="section"]');
		const coteSectionInput = form.querySelector(
			'input[name="coteSection"]',
		);
		const sectionDatalist = document.getElementById(
			`section-options-${typeId}`,
		);
		const coteDatalist = document.getElementById(
			`cote-section-options-${typeId}`,
		);

		const map = {};
		const sections = [...sectionDatalist.options].map((opt) => opt.value);
		const cotes = [...coteDatalist.options].map((opt) => opt.value);

		sections.forEach((section, i) => {
			map[section] = cotes[i] || "";
		});

		sectionInput.addEventListener("input", () => {
			const val = sectionInput.value.trim();
			if (map[val]) {
				coteSectionInput.value = map[val];
			}
		});
	}

	if (typeId === "bdJunior") {
		const coteSectionInput = form.querySelector(
			'input[name="coteSection"]',
		);

		coteSectionInput.value = "BDJ";
	}
}

// Fonction pour soumettre le formulaire
export async function submitForm(form, radios) {
	// Récupérer toutes les données du formulaire
	const formData = new FormData(form);

	const bookData = {
		type: "",
		ean: "",
		title: "",
		image: "",
		tome: "",
		date: "",
		age: "",
		author: "",
		editor: "",
		link: "",
		section: "",
		genre: "",
		thematic: "",
		deweyClass: "",
		deweyCote: "",
		coteSection: "",
		coteName: "",
		provider: "",
		status: "",
		price: "",
		format: "",
	};

	// Parcours des entrées du formulaire
	for (const [key, value] of formData.entries()) {
		// On vérifie si la clé existe dans bookData (pour éviter d’ajouter des clés non prévues)
		if (key in bookData) {
			bookData[key] = value === "" ? null : value;
		}
	}

	// Ajout du type personnalisé (hors FormData)
	bookData.type = getCurrentType(radios);

	await fetch("/api/newBook", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(bookData),
	}).then(() => {
		// Fermer le modal et afficher un message de succès
		alert("Livre ajouté avec succès!");
		const modal = form.closest(".modal");
		if (modal) modal.style.display = "none";
	});
}

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

//////////////////////
// WORK IN PROGRESS //
//////////////////////

// Fonction pour soumettre le formulaire
export async function submitForm(form, radios) {
	// Récupérer toutes les données du formulaire
	const formData = new FormData(form);
	const bookData = {};

	for (const [key, value] of formData.entries()) {
		bookData[key] = value;
	}

	// Ajouter le type du livre
	bookData.type = getCurrentType(radios);

	// Exemple: envoyer les données au serveur
	console.log("Données du livre à envoyer:", bookData);

	const response = await fetch("/api/newBook", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(bookData),
	});

	console.log(response);

	// Ici, vous implémenteriez l'envoi des données au serveur
	/*
	fetch('/api/books', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(bookData),
	})
	.then(response => response.json())
	.then(data => {
		// Fermer le modal et afficher un message de succès
		const modal = form.closest('.modal');
		if (modal) modal.style.display = 'none';
		alert("Livre ajouté avec succès!");
	})
	.catch(error => {
		alert("Erreur lors de l'ajout du livre: " + error.message);
	});
	*/

	// Pour le moment, simuler un succès
	alert("Fonction à implémenter: ajout du livre " + bookData.title);
	// const modal = form.closest(".modal");
	// if (modal) modal.style.display = "none";
}

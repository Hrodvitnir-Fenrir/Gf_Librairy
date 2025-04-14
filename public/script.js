/* eslint-env browser */

const radios = document.getElementsByName("category");

function updateSelectVisibility() {
	for (const radio of radios) {
		const typeId = radio.id;
		const isChecked = radio.checked;

		// Liste des sélecteurs à gérer
		const selectors = [
			"selectSection-" + typeId,
			"selectGenre-" + typeId,
			"selectDeweyClass-" + typeId,
			"selectThematic-" + typeId,
		];

		// Afficher ou cacher les sélecteurs selon l'état du radio
		selectors.forEach((selectorId) => {
			const selector = document.getElementById(selectorId);
			if (selector) {
				selector.style.display = isChecked ? "block" : "none";
			}
		});

		// Gestion du bouton d'ajout
		if (isChecked) {
			if (typeId === "all") {
				document.getElementById("addBook").setAttribute("disabled", "");
			} else {
				document.getElementById("addBook").removeAttribute("disabled");
			}
		}
	}
}

// Initialisation
updateSelectVisibility();

// Ajout des écouteurs d'événements
for (const radio of radios) {
	radio.addEventListener("change", updateSelectVisibility);
}

// Fonctions utilitaires pour récupérer les valeurs sélectionnées
function getCurrentType() {
	for (const radio of radios) {
		if (radio.checked) {
			return radio.id;
		}
	}
	return null;
}

// function getSelectedValue(prefix) {
// 	const type = getCurrentType();
// 	if (type) {
// 		const select = document.getElementById(prefix + "-" + type);
// 		if (select && select.style.display !== "none") {
// 			return select.value;
// 		}
// 	}
// 	return null;
// }

// function getCurrentSection() {
// 	return getSelectedValue("selectSection");
// }

// function getCurrentGenre() {
// 	return getSelectedValue("selectGenre");
// }

// function getCurrentDeweyClass() {
// 	return getSelectedValue("selectDeweyClass");
// }

// function getCurrentThematic() {
// 	return getSelectedValue("selectThematic");
// }

function openModal() {
	// todo get type selected
	let type = getCurrentType();

	const modal = document.getElementById("modal-" + type);
	modal.style.display = "flex";

	modal.querySelectorAll(".close").forEach((el) => {
		el.addEventListener("click", () => (modal.style.display = "none"));
	});
}

function filter() {
	// get search
	// get provider filter
	// get status filter

	// get section filter ==>
	let section = document.getElementById("selectSection-" + getCurrentType());

	if (section != null) {
		// you have a section

		section.value();
	} else {
		// you don't
	}

	// repalce a ==> lien avec filter
}

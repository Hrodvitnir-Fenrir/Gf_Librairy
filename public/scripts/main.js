/* eslint-env browser */
import {
	initializeFetchButtons,
	setupModalListeners,
	fetchBookInfo,
} from "./modal.js";
import {
	getCurrentSection,
	getCurrentGenre,
	getCurrentDeweyClass,
	getCurrentThematic,
} from "./fetchStatus.js";
import { setupTableFilter } from "./filter.js";

document.addEventListener("DOMContentLoaded", function () {
	/*
	Sélectionnes les bouttons
	*/
	const radios = document.getElementsByName("category");

	// Initialisation
	initializeUI();

	// Fonction principale d'initialisation
	function initializeUI() {
		updateSelectVisibility();
		setupEventListeners();
		initializeFetchButtons();
		setupModalListeners(radios);
		setupTableFilter(radios);
	}

	// Configuration des écouteurs d'événements
	function setupEventListeners() {
		// Écouteurs pour les radios de catégorie
		for (const radio of radios) {
			radio.addEventListener("change", updateSelectVisibility);
		}

		// Écouteur pour la case à cocher "Sélectionner tout"
		const selectAllCheckbox = document.getElementById("selectAll");
		if (selectAllCheckbox) {
			selectAllCheckbox.addEventListener("change", function () {
				// À implémenter: logique pour sélectionner tous les livres visibles
				console.log("Sélectionner tout: " + this.checked);
			});
		}

		// Écouteur pour le nouveau bouton "Exporter"
		const exportButton = document.getElementById("exportBooks");
		if (exportButton) {
			exportButton.addEventListener("click", function () {
				// Logique pour exporter les livres sélectionnés
				console.log("Exporter les livres sélectionnés");
			});
		}

		// Écouteur pour le bouton "Appliquer"
		const applyButton = document.getElementById("applyNewStatus");
		if (applyButton) {
			applyButton.addEventListener("click", function () {
				// À implémenter: logique pour appliquer le nouveau statut
				const statusSelect =
					document.getElementById("selectProdiverEdit");
				const selectedStatus = statusSelect.value;

				// if (selectedStatus === "disabled") {
				// 	alert("Veuillez choisir un statut à appliquer");
				// 	return;
				// }

				console.log("Appliquer le statut: " + selectedStatus);
				// Implémentation à venir: appliquer le statut aux livres sélectionnés
			});
		}

		// Écouteur pour le champ de recherche
		const searchInput = document.getElementById("search");
		if (searchInput) {
			searchInput.addEventListener("input", function () {
				filter();
			});
		}

		// Écouteurs pour les sélecteurs de filtres
		const filterSelects = document.querySelectorAll("#filter select");
		filterSelects.forEach((select) => {
			select.addEventListener("change", filter);
		});
	}

	// Affichage selcteur selon la catégorie choisie
	function updateSelectVisibility() {
		for (const radio of radios) {
			const typeId = radio.id;
			const isChecked = radio.checked;

			const selectors = [
				"selectSection-" + typeId,
				"selectGenre-" + typeId,
				"selectDeweyClass-" + typeId,
				"selectThematic-" + typeId,
			];

			selectors.forEach((selectorId) => {
				const selector = document.getElementById(selectorId);
				if (selector) {
					selector.style.display = isChecked ? "block" : "none";
				}
			});

			if (isChecked) {
				const addBookButton = document.getElementById("addBook");
				if (typeId === "all") {
					addBookButton.setAttribute("disabled", "");
				} else {
					addBookButton.removeAttribute("disabled");
				}
			}
		}
	}

	// Fonction pour filtrer les résultats
	function filter() {
		const searchTerm = document.getElementById("search");
		const providerFilter = document.getElementById("selectProvider").value;
		const statusFilter = document.getElementById("selectStatus").value;

		const section = getCurrentSection(radios);
		const genre = getCurrentGenre(radios);
		const deweyClass = getCurrentDeweyClass(radios);
		const thematic = getCurrentThematic(radios);

		console.log("Filtrage avec:", {
			searchTerm,
			providerFilter,
			statusFilter,
			section,
			genre,
			deweyClass,
			thematic,
		});

		filterBooks(
			searchTerm,
			providerFilter,
			statusFilter,
			section,
			genre,
			deweyClass,
			thematic,
		);
	}

	// Fonction pour filtrer les livres (à implémenter selon votre structure de données)
	function filterBooks(
		search,
		provider,
		status,
		section,
		genre,
		deweyClass,
		thematic,
	) {
		// À implémenter selon votre structure HTML
		// Par exemple:
		const books = document.querySelectorAll(".book-item");

		books.forEach((book) => {
			// Logique de filtrage à implémenter
			let shouldShow = true;

			// Exemple de filtrage par recherche
			if (search && !book.textContent.toLowerCase().includes(search)) {
				shouldShow = false;
			}

			// Appliquer les autres filtres de façon similaire

			// Afficher ou cacher le livre
			book.style.display = shouldShow ? "" : "none";
		});
	}

	// Exposer les fonctions nécessaires globalement
	// Expose au HTML via le window
	window.openModal = () =>
		import("./modal.js").then((mod) => mod.openModal(radios));
	window.submitForm = (form) =>
		import("./modal.js").then((mod) => mod.submitForm(form, radios));
	window.fetchBookInfo = (ean, form) => fetchBookInfo(ean, form);
});

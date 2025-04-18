/* eslint-env browser */

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
		setupModalListeners();
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

				// // Vérifier si des livres sont sélectionnés
				// const allChecked = document.getElementById("selectAll").checked;
				// if (allChecked) {
				// 	// Simuler une exportation de tous les livres
				// 	alert(
				// 		"Fonctionnalité d'exportation en cours de développement",
				// 	);
				// 	// Ici vous pourriez déclencher un téléchargement CSV ou autre format
				// } else {
				// 	alert("Veuillez sélectionner des livres à exporter");
				// }
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

	// Initialisation des boutons "fetch" dans les modaux
	function initializeFetchButtons() {
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
	function setupModalListeners() {
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
					submitForm(form);
				});
			}
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

	// Fonction pour récupérer le type actuellement sélectionné
	function getCurrentType() {
		for (const radio of radios) {
			if (radio.checked) {
				return radio.id;
			}
		}
		return null;
	}

	// Fonction pour ouvrir le modal correspondant au type sélectionné
	function openModal() {
		let type = getCurrentType();
		if (!type) return;

		const modal = document.getElementById("modal-" + type);
		if (modal) {
			modal.style.display = "flex";
			// Réinitialiser le formulaire
			const form = modal.querySelector("form");
			if (form) form.reset();
		}
	}

	// Fonction pour récupérer une valeur sélectionnée
	function getSelectedValue(prefix) {
		const type = getCurrentType();
		if (type) {
			const select = document.getElementById(prefix + "-" + type);
			if (select && select.style.display !== "none") {
				return select.value;
			}
		}
		return null;
	}

	// Fonctions pour récupérer les valeurs de filtrage
	function getCurrentSection() {
		return getSelectedValue("selectSection");
	}

	function getCurrentGenre() {
		return getSelectedValue("selectGenre");
	}

	function getCurrentDeweyClass() {
		return getSelectedValue("selectDeweyClass");
	}

	function getCurrentThematic() {
		return getSelectedValue("selectThematic");
	}

	// Fonction pour filtrer les résultats
	function filter() {
		// Récupérer les valeurs de filtrage
		const searchTerm = document.getElementById("search"); // .value.toLowerCase(); ???
		const providerFilter = document.getElementById("selectProvider").value;
		const statusFilter = document.getElementById("selectStatus").value;

		// Récupérer les filtres spécifiques au type
		const section = getCurrentSection();
		const genre = getCurrentGenre();
		const deweyClass = getCurrentDeweyClass();
		const thematic = getCurrentThematic();

		// À implémenter: logique de filtrage avec ces valeurs
		console.log("Filtrage avec:", {
			searchTerm,
			providerFilter,
			statusFilter,
			section,
			genre,
			deweyClass,
			thematic,
		});

		// Appliquer les filtres aux livres (à implémenter)
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

	// Fonction pour récupérer les informations d'un livre via l'EAN
	async function fetchBookInfo(ean, form) {
		if (!ean) return;

		const response = await fetch(`/api/fetchInfo?ean=${ean}`);
		const { data: book } = await response.json();
		console.log(book);

		form.querySelector("input[name='title']").value = book.title;
		if (book.coverUrl != null) {
			form.querySelector("input[name='image']").value = book.coverUrl;
		}
		form.querySelector("input[name='date']").value = book.publicationYear;
		form.querySelector("input[name='author']").value = book.author;
		form.querySelector("input[name='editor']").value = book.editor;
		form.querySelector("input[name='link']").value = book.bnfLink;
		form.querySelector("input[name='price']").value = book.price;
	}

	// Fonction pour soumettre le formulaire
	function submitForm(form) {
		// Récupérer toutes les données du formulaire
		const formData = new FormData(form);
		const bookData = {};

		for (const [key, value] of formData.entries()) {
			bookData[key] = value;
		}

		// Ajouter le type du livre
		bookData.type = getCurrentType();

		// Exemple: envoyer les données au serveur
		console.log("Données du livre à envoyer:", bookData);

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
		const modal = form.closest(".modal");
		if (modal) modal.style.display = "none";
	}

	// Exposer les fonctions nécessaires globalement
	window.openModal = openModal;
});

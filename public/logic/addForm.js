/* eslint-env browser */

document.addEventListener("DOMContentLoaded", () => {
	const addButton = document.getElementById("addBook");

	addButton.addEventListener("click", () => {
		const accSelected = document.getElementById("acc").checked;

		if (!accSelected) {
			console.log("ACC non sélectionné, formulaire non affiché.");
			return;
		}

		// Si modale déjà existante, ne pas la réajouter
		if (document.getElementById("accModal")) return;

		createAccModal();
	});
});

function createAccModal() {
	// Styles très simples injectés
	const style = document.createElement("style");
	style.textContent = `
		.modal {
			position: fixed;
			top: 0; left: 0;
			width: 100vw; height: 100vh;
			background: rgba(0,0,0,0.6);
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 9999;
		}
		.modal-content {
			background: #2d2d3f;
			padding: 20px;
			border-radius: 8px;
			width: 500px;
			color: #e0e0e0;
		}
		.modal-content input, .modal-content button {
			display: block;
			margin-top: 10px;
			width: 100%;
			padding: 8px;
			border-radius: 4px;
			border: none;
		}
		.modal-content button {
			background: #4ade80;
			color: #1e1e2e;
			cursor: pointer;
			margin-top: 20px;
		}
		.modal-content .close {
			float: right;
			cursor: pointer;
			font-weight: bold;
			color: #aaa;
		}
	`;
	document.head.appendChild(style);

	// Création de la modale
	const modal = document.createElement("div");
	modal.className = "modal";
	modal.id = "accModal";

	modal.innerHTML = `
		<div class="modal-content">
			<span class="close">&times;</span>
			<h2>Ajouter un livre (Album Compte Comptine)</h2>
			<form id="accForm">
				<input name="title" placeholder="Titre" required>
				<input name="author" placeholder="Auteur" required>
				<input name="editor" placeholder="Éditeur">
				<input name="ean" placeholder="Code EAN" required>
				<input name="price" placeholder="Prix (€)" type="number" step="0.01">
				<button type="submit">Ajouter</button>
			</form>
		</div>
	`;

	document.body.appendChild(modal);

	// Fermeture de la modale
	modal.querySelector(".close").addEventListener("click", () => {
		modal.remove();
	});

	// Préparation du submit (sans fetch pour l’instant)
	const form = document.getElementById("accForm");
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(form));
		console.log("📦 Données à envoyer :", data);
		modal.remove(); // Ferme la modale après soumission
	});
}

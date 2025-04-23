/* eslint-env browser */
import { getCurrentType } from "./fetchStatus.js";

export function setupTableFilter(radios) {
	function updateVisibleTable() {
		const currentType = getCurrentType(radios);

		// Masquer toutes les tables
		document.querySelectorAll(".book-table").forEach((table) => {
			table.classList.add("hidden");
		});

		// Afficher seulement la table sélectionnée
		const selectedTable = document.getElementById(
			`book-table-${currentType}`,
		);
		if (selectedTable) {
			selectedTable.classList.remove("hidden");
		}
	}

	// Appel initial
	updateVisibleTable();

	// Changement de catégorie
	radios.forEach((radio) => {
		radio.addEventListener("change", updateVisibleTable);
	});
}

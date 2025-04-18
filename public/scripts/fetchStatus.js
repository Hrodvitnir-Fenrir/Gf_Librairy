/* eslint-env browser */
// Fonction pour récupérer le type actuellement sélectionné
export function getCurrentType(radios) {
	for (const radio of radios) {
		if (radio.checked) {
			return radio.id;
		}
	}
	return null;
}

// Fonction pour récupérer une valeur sélectionnée
export function getSelectedValue(prefix, radios) {
	const type = getCurrentType(radios);
	if (type) {
		const select = document.getElementById(prefix + "-" + type);
		if (select && select.style.display !== "none") {
			return select.value;
		}
	}
	return null;
}

// Fonctions pour récupérer les valeurs de filtrage
export function getCurrentSection(radios) {
	return getSelectedValue("selectSection", radios);
}

export function getCurrentGenre(radios) {
	return getSelectedValue("selectGenre", radios);
}

export function getCurrentDeweyClass(radios) {
	return getSelectedValue("selectDeweyClass", radios);
}

export function getCurrentThematic(radios) {
	return getSelectedValue("selectThematic", radios);
}

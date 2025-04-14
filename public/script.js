/* eslint-env browser */

const radios = document.getElementsByName("category");

function sectionUpdated() {
	for (const radio of radios) {
		if (radio.checked) {
			let section = document.getElementById("selectSection-" + radio.id);

			if (section != null) {
				section.style.display = "block";
			}

			if (radio.id == "all") {
				document.getElementById("addBook").setAttribute("disabled", "");
			} else {
				document.getElementById("addBook").removeAttribute("disabled");
			}
		} else {
			let section = document.getElementById("selectSection-" + radio.id);

			if (section != null) {
				section.style.display = "none";
			}
		}
	}
}

// init radio update
sectionUpdated();

for (const radio of radios) {
	radio.addEventListener("change", function () {
		sectionUpdated();
	});
}

function getCurrentType() {
	let type = null;

	for (const radio of radios) {
		if (radio.checked) {
			type = radio.id;
			break;
		}
	}

	return type;
}

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

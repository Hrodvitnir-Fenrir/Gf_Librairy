/* eslint-env browser */

function openModal() {
	// todo get type selected
	const radios = document.getElementsByName("category");
	let type = null;

	for (const radio of radios) {
		if (radio.checked) {
			type = radio.id;
			break;
		}
	}

	const modal = document.getElementById("modal-" + type);
	modal.style.display = "flex";

	modal.querySelectorAll(".close").forEach((el) => {
		el.addEventListener("click", () => (modal.style.display = "none"));
	});
}

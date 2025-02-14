/* Copyright (©) 2024-2025 Callum Fisher - fishercallum@proton.me
2024.11.07 - 2025.01.14 */

let toggleHamburgerMenu;

window.addEventListener('load', () => {
	toggleHamburgerMenu = () => {
		document.getElementById('menuItems').classList.toggle('active');
	}
});
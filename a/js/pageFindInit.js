/* Copyright (©) 2025 Callum Fisher - fishercallum@proton.me
2025.01.14 */

window.addEventListener('load', () => {
	new PagefindUI({
		element: '#pageFindSearch',
		showSubResults: false,
		showImages: true,
		translations: {
			placeholder: Math.random() < 0.20 ? 'You can search with this thing' : 'Type here to search'
		}
	});
});
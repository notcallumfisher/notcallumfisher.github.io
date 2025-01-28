const loadOldCSS = () => {
	let existingCSS = document.querySelectorAll('link[rel="stylesheet"]');
	existingCSS.forEach(link => link.remove());
	let newCSS = document.createElement('link');
	newCSS.rel = 'stylesheet';
	newCSS.href = '../a/css/old-standard.css';
	document.head.appendChild(newCSS);
}
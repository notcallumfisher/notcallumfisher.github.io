/* Copyright (©) 2024 Callum Fisher - cf.fisher.bham@gmail.com
currentYear.js - For updating years to the current year.
2024.08.12 - 2024.08.21 */

window.addEventListener("load", () => {
    let year = new Date().getFullYear();
    let currentYear = document.getElementById("currentYear");
    if (Number(currentYear.innerHTML) > year) return;
    currentYear.innerHTML = year;
});
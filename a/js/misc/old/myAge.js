/* Copyright (©) 2024 Callum Fisher - cf.fisher.bham@gmail.com
myAge.js - For updating ages to my current age.
2024.08.11 - 2024.08.21 */

window.addEventListener("load", () => {
    setTimeout(() => {
        let output = Math.floor((Date.now() - new Date("2006-04-06")) / 31557600000);
        output < 18 || output >= 40 ? output += " - hm, that doesn't seem right - " : false;
        document.getElementById("myAge").innerHTML = output;
    }, 2000);
});
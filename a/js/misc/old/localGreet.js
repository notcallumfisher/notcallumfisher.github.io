/* Copyright (©) 2024 Callum Fisher - fishercallum@proton.me
localGreet.js - Provides greetings according to local timezone.
2024.08.21 - 2024.08.23 */

window.addEventListener("load", () => {
    let days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    /* let months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]; */
    let date = new Date();
    let hour = date.getHours();
    document.getElementById("localGreet").innerHTML = `${date.getDay() == 5 ? "Happy " + days[date.getDay()] + "!" : `Good ${hour >= 12 ? hour >= 17 && hour < 20 ? "evening" : "afternoon" : "morning"}!`}`;
});
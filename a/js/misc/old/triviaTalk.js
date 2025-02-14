/* Copyright (©) 2024 Callum Fisher - fishercallum@proton.me
triviaTalk.js - For providing trivia and holiday messages.
2024.08.09 - 2024.08.18 */

const triviaTalk = {};

triviaTalk.events = [
    { 'start': '12 01', 'end': '12 30', 'msg': 'Happy Mariah Carey Month!'},
    { 'start': '12 23', 'end': '12 30', 'msg': '<img src="media/santahat.png"> Merry Christmas!' },
    { 'start': '10 31', 'end': '11 1', 'msg': 'Happy Halloween!' },
    { 'start': '11 5', 'end': '11 6', 'msg': 'Happy bonfire night!' },
    // { 'start': '11 11', 'end': '11 11', 'msg': 'Today is Remembrance Day' },
    { 'start': '1 1', 'end': '1 10', 'msg': 'Happy New Year!' },
    { 'start': '12 31', 'end': '12 31', 'msg': 'I hope you brought fireworks!' },
    { 'start': '1 1', 'end': '1 31', 'msg': 'Try listening to "January" by Pilot!' }
];

triviaTalk.music = { // was considering a format that stores albums, release years, etc. maybe in a later version. might have to store it somewhere else.
    "Electric Light Orchestra (ELO)": [
        "Mr. Blue Sky",
        "The Bouncer",
        "Sorrow About to Fall",
        "Wishing"
    ],
    "Gerry Rafferty": [
        "Already Gone"
    ],
    "Prefab Sprout": [
        "Bonny",
        "Cars and Girls"
    ],
    "The Guess Who": [
        "These Eyes"
    ],
    "Ace": [
        "Why"
    ],
    "Steely Dan": [
        "Only a Fool Would Say That",
        "Reelin' in The Years"
    ],
    "America": [
        "Inspector Mills"
    ],
    "The Eagles": [
        "Desperado"
    ],
    "Thomas Dolby": [
        "Airwaves"
    ],
    "TLC": [
        "Waterfalls"
    ],
    "The Beatles": [
        "Birthday"
    ]
}

triviaTalk.messages = [
    "Tonight on... MOTTO OF THE MINUTE...!",
    "ID, please.",
    "Congratulations! You are the 1 millionth user...! Just kidding.",
    "Have you found out any secrets lately?",
    "Fun fact: Today marks the 10th anniversary of the Nuking of Saturn.",
    "Ever heard of scambaiting? It's when somebody wastes a scammer's time so that they aren't actively scamming somebody else. Some of the videos on YouTube are hilarious.",
    "Draw something.",
    "Write something.",
    "Happy birthday! ...It is your birthday, right? Either way, here's a good birthday party song: Birthday by The Beatles.",
    "If I know one thing about anything, it's that something's gonna be the next big thing.",
    "It's fun building fountains. No, seriously, buy your own solar water pump and try it with some flower pots. It's great.",
    "Ever actually solved a rubik's cube? No, me neith- You have? Me too!",
    "Scamazon's gonna be the next big thing.",
    "The End (is never the) The End (is never the) The End (is never the) The End (is never the) The End (is never the) The End",
    "Do you think they were telling the truth about that cake?",
    "Bingo! No, I haven't played that in years.",
    "Hello, I'm writing to you regarding some trivial matter. I eagerly anticipate your response. Sincerely, me.",
    "Funny word: plop",
    "Wear sunscreen.",
    "This is a public service annoucement: Do NOT go chasing waterfalls. Please stick the rivers and the lakes that you're used to.",
    "Remember Disaster Hotel? No? Alllright."
];

triviaTalk.nightlyWords = [
    "foxes",
    "ghosts",
    "candles"
];

triviaTalk.getRandomFromArray = array => {
	return Array.isArray(array) || (array = Array.from(arguments)), array[Math.floor(Math.random() * array.length)];
}

triviaTalk.fetchEvents = (month, day) => {
    let results = [];
    let now = new Date();
    let year = now.getFullYear();
    now = now.getTime();
    let inputDate = new Date(`${year} ${month} ${day}`).getTime();
    triviaTalk.events.forEach(event => {
        let eventStart = new Date(`${year} ${event.start}`).getTime();
        let eventEnd = new Date(`${year} ${event.end}`).getTime();
        if (inputDate < eventEnd && inputDate >= eventStart) results.push(event.msg);
    });
    if (results.length == 0 && Math.random() < 0.20) { // 20% chance of music trivia:
        let selectedArtist = triviaTalk.getRandomFromArray(Object.keys(triviaTalk.music));
        return `Featured song: ${triviaTalk.getRandomFromArray(triviaTalk.music[selectedArtist])} by ${selectedArtist}`;
    }
    // Return a single event: (or message if there are no events)
    return triviaTalk.getRandomFromArray(results) || triviaTalk.getRandomFromArray(triviaTalk.messages);
}

triviaTalk.update = (month, date) => {
    let trivia = triviaTalk.fetchEvents(month, date);
    let nextTime = trivia.length * 120;
    document.getElementById("triviaTalk").innerHTML = trivia;
    setTimeout(() => {
        triviaTalk.update(month, date);
    }, nextTime);
}

window.addEventListener("load", () => {
    let now = new Date();
    let month = now.getMonth();
    let date = now.getDate();
    document.getElementById("triviaTalk").innerHTML = triviaTalk.fetchEvents(month, date);
    /* triviaTalk.interval = setInterval(() => {
        document.getElementById("triviaTalk").innerHTML = triviaTalk.fetchEvents(month, date);
    }, 10000); */
});
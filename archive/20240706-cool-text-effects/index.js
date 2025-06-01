/* Copyright (©) 2024 callum fisher - fishercallum@proton.me
2024.07.06 */

window.onload = () => {
    const revealLines = [
        "the quick brown fox jumped over the lazy dog",
        "Oh yeah?",
        "...well, that's what i heard",
        "Shall we get back on topic?",
        "...topic?",
        "what topic?",
        "Those effects we were demoing, silly.",
        "effects? what effects?",
        "Don't think too hard.",
        "THIS",
        "IS",
        "A",
        "VERY",
        "SLEAK", 
        "AND",
        "ADAPTIVE",
        "DYNAMIC",
        "EFFECT",
        "Wouldn't you agree?",
        "well, not really",
        "No?",
        "Really?",
        "yeah",
        "Oh.",
        "Well...",
        "Why not?",
        "idk",
        "What is that supposed to mean?",
        "\"idk\" means \"i don't know\"",
        "Don't be silly. Everybody knows what \"idk\" means.",
        "I'm asking why-",
        "Oh nevermind.",
        "well, i don't know",
        "Okay. What effect would you prefer?",
        "how about something with more bounce?",
        "Okay, let me take a look...",
        "...........................",
        "Actually, why don't we just take theirs up there?",
        "what?",
        "See that other box?",
        "^^^^",
        "Let's try that one."
    ];
    const nextRevealLine = () => {
        // revealLines.push(revealLines[0]);
        let nextTime = revealText(revealLines.shift(), "box2");
        if (revealLines.length == 0) {
            let waitTime = slide.updateInterval * slide.content.length;
            // clearInterval(slide.interval);
            document.getElementById("welcome").innerHTML = "";
            setTimeout(() => {
                slide.set("Okay, how about this effect? This seems like a good one.", 20);
                slide.reversing = false;
                slide.current = -1;
                slide.element = "box2",
                slide.updateInterval = 100;
                slide.start();
                let waitTime = slide.updateInterval * slide.content.length;
                setTimeout(() => {
                    slide.start();
                }, waitTime);
            }, waitTime);
            return;
        }
        setTimeout(() => {
            nextRevealLine();
        }, nextTime);
    }
    nextRevealLine();
}

const slide = {};
slide.updateInterval = 10;
slide.sliding = false;
slide.content = ["abcdefghijklmnopqrstuvwxyz"];
slide.reversing = false;
slide.current = -1;
slide.element = "welcome";
slide.start = () => {
	if (!slide.sliding) {
        slide.sliding = true;
		let interval = setInterval(() => {
			if (slide.reversing) {
                slide.current --;
            } else {
                slide.current ++;
            }
			document.getElementById(slide.element).innerHTML = slide.content[slide.current];
            if (slide.reversing && slide.current == 0) {
                clearInterval(interval);
				slide.sliding = false;
                slide.reversing = false;
            } else if (slide.current >= slide.content.length - 1) {
				clearInterval(interval);
				slide.sliding = false;
                slide.reversing = true;
			}
		}, slide.updateInterval)
	}
}

slide.create = (input, slideSize) => {
    return new Promise((resolve, reject) => {
        let i1 = -2; // -2
        let i2 = slideSize ?? Math.floor(input.length / 10); // 22
        let arr = [];
        let int = setInterval(() => { // to-do: change to for loop
            i1 ++; // += 1
            i2 ++; // += 1
            arr.push(input.substring(i1, i2));
            if (i2 >= input.length) {
                clearInterval(int)
                resolve(arr);
            }
        }, 0);
    });
}

slide.set = (input, slideSize) => {
    slide.create(input, slideSize ?? undefined).then((output) => {
        slide.content = output;
        slide.current = 0;
        slide.start();
    });
}

let revealTextInt

const revealText = (text, element) => {
    element = document.getElementById(element);
    element.innerHTML = '...';
    let i = -1;
    // if (revealTextInt) clearInterval(revealTextInt);
    let revealTextInt = setInterval(() => {
        i ++;
        element.innerHTML += text.charAt(i);
        if (i == text.length) {
            element.innerHTML = text;
            clearInterval(revealTextInt);
        }
    }, 20);
    return (120 * text.length); // (20 * text.length)
}

slide.set(`----------- ♬♪♫♩♬♪♫♩♬♪♫♩ --- ༼ つ ◕_◕ ༽つ --- (⊙︿⊙✿) --- ( ͡° ͜ʖ ͡°) --- ヾ(⌐■_■)ノ --- ┗(＾0＾)┓ --- ┻━┻ ︵﻿¯\(ツ)/¯︵ ┻━┻`, 22)
slide.updateInterval = 50;

slide.interval = setInterval(() => {
    slide.start();
}, 10000);
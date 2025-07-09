/* "Sliding Name for Multiplayer Piano"
2022.05.12 - 2024.12.06

callum fisher - fishercallum@proton.me

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org/> */

let updateInterval = 5000; // how many milliseconds before the slide advances
let sliding = false;
let slide = ["Hello"];

setInterval(() => {
	if (!sliding) {
        sliding = true;
	    let i = -1;
		let interval = setInterval(() => {
			i ++;
			MPP.client.sendArray([{ m: 'userset', set: { name: `${slide[i]}`  } }]);
			if (i >= slide.length - 1) {
				clearInterval(interval);
				sliding = false;
			}
		}, updateInterval);
	}
}, 10000);

const createSlide = txt => {
    return new Promise((resolve, reject) => {
        let i1 = -2;
        let i2 = 22;
        let arr = [];
        let int = setInterval(() => {
            i1 ++;
            i2 ++;
            arr.push(txt.substring(i1, i2));
            if (i2 >= txt.length) {
                clearInterval(int);
                resolve(arr);
            }
        }, 0);
    });
}

const setSlide = txt => {
    createSlide(txt).then(output => {
        slide = output;
    });
}

// Example:

setSlide(`This is a super duper sliding name. Wow! What do you think, huh? Incredible, right?
Okay, see you later.`);
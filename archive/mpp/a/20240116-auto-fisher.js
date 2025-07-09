/* "Auto Fisher (hah) for Multiplayer Piano's 'Fishing' bot" - v1.0.0
2024.01.16 - 2025.01.07

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

let autoFisher = {
	version: '1.0.0',
	lastMessage: '',
	chatQueue: [],
	functions: {
		advanceChatQueue: () => {
			let msg = autoFisher.chatQueue.splice(0, 1)[0];
			MPP.client.sendArray([{
				m: 'a',
				message: msg
			}]);
		},
		qMsg: (msg, bypass, dmID) => {
			if (typeof msg !== 'string') msg = JSON.stringify(msg);
			if (dmID) {
				MPP.client.sendArray([{
					m: 'dm',
					_id: dmID,
					message: msg
				}]);
				return;
			}
			if (autoFisher.lastMessage !== msg || bypass) {
				msg.match(/.{0,511}/g).forEach((x, i) => {
					if (x == '') return;
					if (i !== 0) x = '...' + x;
					autoFisher.chatQueue.push(x.trim());
				});
				autoFisher.lastMessage = msg;
			}
		},
		handleMessage: msg => {
			// console.log(msg.p._id + ' ' + autoFisher.fishingBotID);
			if (msg.p._id !== autoFisher.fishingBotID) return;
			// console.log(msg.a)
			if (msg.a.startsWith(`͏Our good friend ${autoFisher.myName} caught`) || msg.a.includes(`@${autoFisher.myID} caught`)) {
				autoFisher.isWaitingForFish = false;
			}
			if (msg.a.startsWith(`͏Our friend ${autoFisher.myName} is getting a bite`) || msg.a.startsWith(`͏Our friend @${autoFisher.myID} is getting a bite`)) {
				autoFisher.functions.startFishing();
			}
			if (msg.a.startsWith(`͏Contents of ${autoFisher.myName}'s fish sack:`)) {
				let sack = msg.a.split(`Contents of ${autoFisher.myName}'s fish sack:`)[1].trim();
				// console.log(sack);
				if (sack.includes('kekklefruit')) {
					if (Date.now().valueOf() - autoFisher.lastEatKekkleFruit > 240000) {
						autoFisher.lastEatKekkleFruit = Date.now().valueOf();
						autoFisher.functions.qMsg('/eat kekklefruit');
					}
				}
			}
			// For Hri7566's Fishing:
			if (msg.a.startsWith(`͏Contents of ${autoFisher.myName}'s inventory`)) {
				let sack = msg.a.split(`͏Contents of ${autoFisher.myName}'s inventory:`)[1].trim();
				// console.log(sack);
				if (sack.includes('Kekklefruit')) {
					if (Date.now().valueOf() - autoFisher.lastEatKekkleFruit > 240000) {
						autoFisher.lastEatKekkleFruit = Date.now().valueOf();
						autoFisher.functions.qMsg('/eat kekklefruit');
					}
				}
			}
			if (msg.a.startsWith(`͏Friend ${autoFisher.myName}:`)) {
				let treeCount = Number(msg.a.split(`Friend ${autoFisher.myName}:`)[1].trim());
				if (!isNaN(treeCount)) {
					if (treeCount > 0) {
						for (var i = 0; i < Math.ceil(treeCount / 2); i++) {
							autoFisher.functions.qMsg('/pick', true);
						}
						autoFisher.functions.qMsg('/eat kekklefruit');
					}
				}
			}
		},
		startFishing: successMessage => {
			autoFisher.isWaitingForFish = true;
			if (successMessage && Math.random() < 0.20) autoFisher.functions.qMsg(autoFisher.functions.rando(autoFisher.successMessages));
			if (!successMessage) autoFisher.functions.qMsg(autoFisher.functions.rando(autoFisher.failureMessages));
			setTimeout(() => {
				autoFisher.functions.qMsg('/fish', true);
			}, autoFisher.functions.randomNum(0, 10000));
		},
		rando: array => {
			return Array.isArray(array) || (array = Array.from(arguments)), array[Math.floor(Math.random() * array.length)];
		},
		randomNum: (min, max) => {
			return min + (Math.random() * (max - min));
		}
	},
	successMessages: [
		'Very good',
		'Uh huh, very good',
		'veeeery good',
		'Very, very good',
		'Yes - Very good.',
		'uh huh',
		'fish.',
		'Good',
		'Mhmmmmmm'
	],
	failureMessages: [
		'This is not very good',
		'Not good...',
		'Very bad...',
		'Bad...'
	],
	myName: MPP.client.getOwnParticipant().name,
	myID: MPP.client.getOwnParticipant()._id,
	fishingBotID: '8107156a27514cebcb65195d',
	doFishing: true,
	isWaitingForFish: false,
	checkTreeEveryXFish: 20,
	checkTreeCount: 0,
	donateFishEveryXFish: 20,
	donateFishCount: 0,
	checkSackEveryXFish: 10,
	checkSackCount: 0,
	lastEatKekkleFruit: 0,
	mainInterval: setInterval(() => {
		if (autoFisher.chatQueue.length > 0) autoFisher.functions.advanceChatQueue();
		// Check tree:
		if (autoFisher.checkTreeCount >= autoFisher.checkTreeEveryXFish) {
			autoFisher.checkTreeCount = 0;
			autoFisher.functions.qMsg('/tree', true);
		}
		// Danate fish:
		if (autoFisher.donateFishCount >= autoFisher.donateFishEveryXFish) {
			autoFisher.donateFishCount = 0;
			let ppl = MPP.client.ppl;
			let person = autoFisher.functions.rando(Object.keys(ppl).filter(user => (ppl[user].tag ? ppl[user].tag.text !== 'BOT' : true) && ppl[user]._id !== autoFisher.myID));
			autoFisher.functions.qMsg(`/give ${ppl[person].name.split(' ')[0]}`, true);
		}
		// Check sack:
		if (autoFisher.checkSackCount >= autoFisher.checkSackEveryXFish) {
			autoFisher.checkSackCount = 0;
			autoFisher.functions.qMsg('/sack');
			autoFisher.functions.qMsg('/inventory');
		}
		if (!autoFisher.doFishing || autoFisher.isWaitingForFish) return;
		// Caught a fish:
		autoFisher.functions.startFishing(true);
		autoFisher.checkTreeCount ++;
		autoFisher.donateFishCount ++;
		autoFisher.checkSackCount ++;
	}, 2000)
}

MPP.client.on('a', autoFisher.functions.handleMessage);

// ppl = Object.keys(ppl).filter(user => ppl[user].tag ? ppl[user].tag.text !== 'BOT' : true).length;
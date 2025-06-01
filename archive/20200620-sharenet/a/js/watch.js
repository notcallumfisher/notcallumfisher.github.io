/*
>> Sharenet
> 22nd of July 2020
> client: watch.js
*/

function getUrlVars () {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value
	})
	return vars
}

function play(file) {
	var player = document.getElementById("player")
	var video = document.getElementById("video")
    player.pause()
    video.setAttribute('src', `/videos/${file}`)
	player.load()
    player.play()
}

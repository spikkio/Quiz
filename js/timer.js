function startCountdown(offset) {
	$('#timer').countdown({until: +10, format: "S", compact: true});
}

function pauseCountdown() {
	$('#timer').countdown('pause');
}

function resumeCountdown() {
	$('#timer').countdown('resume');
}

function destroyCountdown() {
	$('#timer').countdown('destroy');
}

function getTime() {
	$('#timer').countdown('getTimes')
}



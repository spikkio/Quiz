var myInterval = null;
var startTime = null;
var maxTime = 10000;
var remainingTime = maxTime;
var timerFrequency = 100; //in microseconds
var answer = true;

function init() {
	
	initializeMainMenu();
	
	$('.dial').knob({'min':0,'max':maxTime/100, 'linecap': 'round', 'step': 0.1, 'thickness': 0.3, 'readOnly': true, 'skin':'tron', 'width':80});
	$('.dial').attr('value', maxTime/100);
	
	
	$(document).on("click", "#commandA", function() {
		//startCountdown(10);
		if (myInterval) {
			clearInterval(myInterval);
			console.log('Interval cleared');
		}
		startTime = new Date;
		availableTime = maxTime;
		myInterval = setInterval(function() {
			tickTimer();
		}, timerFrequency);
	});
	
	$(document).on("click", "#commandB", function() {
		clearInterval(myInterval);
		console.log("Timer stopped at " + remainingTime);
		//pauseCountdown();
	});
	
	$(document).on("click", "#commandC", function() {
		//resumeCountdown();
		if (myInterval) {
			clearInterval(myInterval);
		}
		startTime = new Date;
		availableTime = remainingTime;
		myInterval = setInterval(function() {
			tickTimer();
		}, timerFrequency);
	});
	
	$(document).on("click", "#commandD", function() {
		//destroyCountdown();
		validateAnswer();
		/*
		$('#centralButton').one('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', funtion(){
			$("#centralButton").removeClass("shake");
		});
		*/
		
	});

	console.log('init done');
}

function tickTimer() {
	elapsedTime = new Date - startTime;
	remainingTime = availableTime - elapsedTime; 
	$('.dial').val((parseFloat(remainingTime/100)).toFixed(0)).trigger('change');
	console.log((remainingTime/100).toFixed(1));

}

function validateAnswer() {
	var oldBackground = $("#centralButton").css("background");
	if (answer) {
		$("#centralButton").css({
			"background-image": "radial-gradient(160% 100% at 50% 0% ,hsla(0,0%,100%,.3) 50%,hsla(0,0%,100%,0) 52%), url('img/sad.png')",
			"background-size": "100%"
			});
		$("#centralButton").removeClass("animated pulse");
		$("#centralButton").addClass("animated shake");
	} else {
		$("#centralButton").css({
			"background-image": "radial-gradient(160% 100% at 50% 0% ,hsla(0,0%,100%,.3) 50%,hsla(0,0%,100%,0) 52%), url('img/happy.png')",
			"background-size": "100%"
			});
		$("#centralButton").removeClass("animated shake");
		$("#centralButton").addClass("animated pulse");
	}	
	answer = !answer;
	$('#centralButton').one('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
			$("#centralButton").css("background", oldBackground);
		});
	/*
	setTimeout(function(){
		$("#centralButton").css("background", oldBackground);
	}, 1000);
	*/
}

function initializeMainMenu() {

	$(document).on("click", "#playButton", function() {
		$("#mainMenu").addClass("animated slideOutLeft");
		$('#mainMenu').one('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
			$("#mainMenu").css("display", "none");
		});
		
		$("#board").css("display", "block");
		$("#board").addClass("animated slideInRight");
	});
		
}
function questionListener() {
	var questionList = null;
	this.consume = function(questions) {
		/* var text = "Number of question retrieved: " + questions.length + "\n";
		for ( var i = 0; i < questions.length; i++ ) {
			text += 
			"Text: " + questions[i].text  + "\n" + 
			"Category: " + questions[i].category.categoryName  + "\n" + 
			"Possible answer 1: " + questions[i].answers[0].text  + "\n" +
			"Possible answer 2: " + questions[i].answers[1].text  + "\n" +
			"Possible answer 3: " + questions[i].answers[2].text  + "\n" +
			"Right Answer Text: " + questions[i].rightAnswer.text  + "\n" +
			"-------------------------------------------------------------\n";
		}*/
		
		document.getElementById('questionText').innerHTML = questions[0].text;
		document.getElementById('buttonAText').innerHTML = questions[0].answers[0].text;
		document.getElementById('buttonBText').innerHTML = questions[0].answers[1].text;
		document.getElementById('buttonCText').innerHTML = questions[0].answers[2].text;
		document.getElementById('buttonDText').innerHTML = questions[0].answers[3].text;
		
		$("#board").css("display", "block");
		$("#board").addClass("animated slideInRight");
		
		this.questionList = questions;
	}
	
	this.error = function(error) {
		alert("Retrieve questions ko");
	}
}

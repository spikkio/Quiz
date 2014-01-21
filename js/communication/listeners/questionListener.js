function questionListener() {
	this.consume = function(questions) {
		var text = "Number of question retrieved: " + questions.length + "\n";
		for ( var i = 0; i < questions.length; i++ ) {
			text += 
			"Text: " + questions[i].text  + "\n" + 
			"Category: " + questions[i].category.categoryName  + "\n" + 
			"Possible answer 1: " + questions[i].answers[0].text  + "\n" +
			"Possible answer 2: " + questions[i].answers[1].text  + "\n" +
			"Possible answer 3: " + questions[i].answers[2].text  + "\n" +
			"Right Answer Text: " + questions[i].rightAnswer.text  + "\n" +
			"-------------------------------------------------------------\n";
		}
		
		 

		console.log("text: " + text);
	
		alert(text 
		);
	}
	
	this.error = function(error) {
		alert("Retrieve questions ko");
	}
}

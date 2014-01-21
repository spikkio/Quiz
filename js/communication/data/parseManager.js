var questionParseName = "Question", userScoreParseName="UserScore";

function parseManager() {

	this.signup = function(signupListener, email, password) {
		console.log("start signup");
		var user = new Parse.User();
		user.set("username", email);
		user.set("password", password);
		user.set("email", email);
		 
		user.signUp(null, {
		  success: function(user) {
		    signupListener.consume(user);
		  },
		  error: function(user, error) {
		    signupListener.error(user, error);
		  }
		});
	}
	
	this.forgottenPassword = function(forgottenPasswordListener, email) {
		Parse.User.requestPasswordReset(email, {
	  		success: function() {
	    		forgottenPasswordListener.consume();
	  		},
	  		error: function(error) {
	   			forgottenPasswordListener.error(error);
	  		}
		});
	}
	
	
	this.login = function (loginListener, email, password) {
	   Parse.User.logIn(email, password, {
	     success: function(user) {
	         loginListener.consume(user);
	     },
	     error: function(user, error) {
	        loginListener.error(user, error);
	      }
	   });
	}
	
	this.saveRightAnswerForTest = function(answer) {
		answer.text = "Alberto";
		answer.getParseObject(answer).save(null, {
		  success: function(answer) {
		    // Execute any logic that should take place after the object is saved.
		    alert('New object created with objectId: ' + answer.id);
		  },
		  error: function(gameScore, error) {
		    // Execute any logic that should take place if the save fails.
		    // error is a Parse.Error with an error code and description.
		    alert('Failed to create new object, with error code: ' + error.description);
		  }
		});
	}
	
	this.saveCategoryForTest = function(category) {
		category.categoryName = "Nomi";
		category.getParseObject(category).save(null, {
		  success: function(category) {
		    // Execute any logic that should take place after the object is saved.
		    alert('New object created with objectId: ' + category.id);
		  },
		  error: function(gameScore, error) {
		    // Execute any logic that should take place if the save fails.
		    // error is a Parse.Error with an error code and description.
		    alert('Failed to create new object, with error code: ' + error.description);
		  }
		});
	}
	
	this.saveQuestionForTest = function(question, category, answer1, answer2, answer3, answerOk) {
		question.text = "Come ti chiami?";
		question.difficulty = 3;
		
		category.parseId = "RjkdcS4Inv";
		question.category = category;
		
		// Aggiungere lista di answer
		answer1.parseId = "Qw2GL10e3Q";
		answer2.parseId = "Ro0pnXgLpq";
		answer3.parseId = "EXm5gLrEc4";
		
		var answers = new Array();
		answers[0] = answer1;
		answers[1] = answer2;
		answers[2] = answer3;
		question.answers = answers;
		
		answerOk.parseId = "EXm5gLrEc4";
		
		question.rightAnswer = answerOk;
		
		question.getParseObject().save(null, {
		  success: function(question) {
		    // Execute any logic that should take place after the object is saved.
		    alert('New object created with objectId: ' + question.id);
		  },
		  error: function(question, error) {
		    // Execute any logic that should take place if the save fails.
		    // error is a Parse.Error with an error code and description.
		    alert('Failed to create new object, with error code: ' + error.description);
		  }
		});
	}
	
	this.getQuestions = function(questionListConsumer, question, answer, category) {
		var Question = Parse.Object.extend(questionParseName);
		var query = new Parse.Query(Question);
		var notifiedCompleted = 0;
		
		
		query.find({
	  		success: function(results) {
	  			var questions = new Array();
	  			
	  			var i = 0;
	  			(function loop() {
    				if (i < results.length) {	
       						question.getQuestion(results[i], i, answer, category, answer, function(obj, index) {
       							notifiedCompleted++;
								questions[index] = obj;
								console.log("notifiedCompleted: " + notifiedCompleted);
								if ( notifiedCompleted == results.length ) {
									questionListConsumer.consume(questions);
								}
        					});
        					i++;
            				loop();
            		}
    			}());
	    		
	  		},
	  		error: function(error) {
	    		questionListConsumer.error(error);
	  		}
		});
	}
	
	this.sendAnswer = function(userAnswer, sendAnswerListener) {
		userAnswer.getParseObject().save(null, {
		  success: function(sentAnswer) {
		    alert('New object created with objectId: ' + sentAnswer.id);
		  },
		  error: function(sentAnswer, error) {
		    alert('Failed to create new object, with error code: ' + error.description);
		  }
		});
	}
	
	this.getScores = function(userScoreListListener) {
		Parse.Cloud.run('getListOfUserScore', {}, {
		  success: function(result) {
		    console.log(result);
		    userScoreListListener.consume(result);
		  },
		  error: function(error) {
		  	userScoreListListener.error(error);
		  }
		});
	}
}


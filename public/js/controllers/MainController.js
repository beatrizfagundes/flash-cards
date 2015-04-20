app.controller('MainController', function ($scope, FlashCardsFactory, ScoreFactory) {
	$scope.categories = [
    	'MongoDB',
    	'Express',
    	'Angular',
    	'Node'
	];

	FlashCardsFactory.getFlashCards().then(function(response) {
		$scope.flashCards = response;
	});

	$scope.answerQuestion = function (answer, flashCard) {
		if (!flashCard.answered) {
			flashCard.answered = true;
			flashCard.answeredCorrectly = answer.correct;

			if (answer.correct) 
				ScoreFactory.correct++;
			else 
				ScoreFactory.incorrect++;
		}
	}

	$scope.getCategoryCards = function(category) {
		FlashCardsFactory.getFlashCards(category).then(function(response) {
			$scope.flashCards = response;
		});
		$scope.category_pressed = category;
	}

	$scope.resetCategory = function() {
		FlashCardsFactory.getFlashCards().then(function(response) {
			$scope.flashCards = response;
		});
		$scope.category_pressed = null;
	}
});

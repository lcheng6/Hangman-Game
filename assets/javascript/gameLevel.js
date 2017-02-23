var gameLevel = function(answerString, cardImg, musicTrack, numGuesses) {

	var private = {
		answerString: answerString.toUpperCase(),
		cardImg: cardImg,
		musicTrack: musicTrack,
		numGuesses: numGuesses
	}

	return {
		//a function that returns the array just like a hangman would. 
		//for example, "_ _ A _ _ _" if the user correctly guessed an A. 
		guessResult: function (guesses) {
			//guesses is an string of characters that user has put in to guess 
			//toward answerString
			answerCharArray = answerString.toUpperCase().split('');
			guessesCharArray = guesses.toUpperCase().split('');
			resultCharArray = []
			isMatched = true;
			for (i = 0; i< answerCharArray.length; i++) {
				answerChar = answerCharArray[i];
				if (guessesCharArray.indexOf(answerChar) == -1) {
					//guessCharArray doesn't have a answer Char
					resultCharArray.push('_');
					isMatched = false;
				}else {
					resultCharArray.push(answerChar);
				}
			}

			//numDifferences is basically number of guesses that have been used.  
			numDifferences = _.union(answerCharArray, guessesCharArray).length - 
				_.intersection(answerCharArray, guessesCharArray).length;

			result = {
				resultCharArray: resultCharArray,
				isMatched: isMatched,
				numDifferences: numDifferences
			}
			return result;
		},

		getMusicTrack: function() {
			return private["musicTrack"];
		},
		getCardImg: function() {
			return private["cardImg"];
		},
		getNumGuesses: function() {
			return private ["numGuesses"];
		}

	}

};
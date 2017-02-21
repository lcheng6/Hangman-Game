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
			answerCharArray = answerString.split('');
			gussesCharArray = guesses.toUpperCase().split('');
			resultCharArray = []
			isMatched = true;
			for (i = 0; i< answerString i++) {
				answerChar = answerCharArray[i];
				if (_.findInex(guessesCharArray, answerChar) != -1) {
					//GuessChar is within the answerCharArray
					resultCharArray.push(answerChar);
				}else {
					resultCharArray.push('_');
					isMatched = false;
				}
			}

			numDifferences = _.union([answerCharArray, gussesCharArray]).length() - 
				_.intersection([answerCharArray, gussesCharArray]).length();

			result = {
				resultArray: resultCharArray,
				isMatched: isMatched,
				numDifferences: numDifferences
			}
			return result;
		}

		getMusicTrack() {
			return private["musicTrack"];
		}
		getCardImg() {
			return private["cardImg"];
		}
		getNumGuesses() {
			return private ["numGuesses"];
		}

	}

};
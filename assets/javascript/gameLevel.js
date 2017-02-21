var gameLevel = function(answerString, cardImg, musicTrack) {

	var private = {
		answerString: answerString.toLowerCase(),
		cardImg: cardImg,
		musicTrack: musicTrack
	}

	return {
		//a function that returns the array just like a hangman would. 
		//for example, "_ _ A _ _ _" if the user correctly guessed an A. 
		guessResult: function (guesses) {
			//guesses is an string of characters that user has put in to guess 
			//toward answerString
			answerCharArray = answerString.split('');
			gussesCharArray = guesses.toLowerCase().split('');
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

			result = {
				resultArray: resultCharArray
				isMatched: isMatched
			}
			return resultCharArray;
		}

		getMusicTrack() {
			return private["musicTrack"];
		}
		getCardImg() {
			return private["cardImg"];
		}


	}

};
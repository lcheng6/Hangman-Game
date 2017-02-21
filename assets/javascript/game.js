var game = function() {
	var private = {
		gameLevels = [
			new gameLevel("blondie", null, null, 4),
			new gameLevel("bonjovi", null, null, 4),
			new gameLevel("metallica", null, null, 4),
			new gameLevel("CultureClub", null, null, 4),
			new gameLevel("Foreigner", null, null, 4),
			new gameLevel("Queeen", null, null, 4),
			new gameLevel("Journey", null, null, 4),
			new gameLevel("ThePolice", null, null, 4)	
		];
		guessString = "";
		currentGameLevel = null;
	}

	return {
		takeGuessFromUser: function (inputChar) {
			//return true if the inputChar is new, and inputChar is entered into guessString.
			//return false if the inputChar already exists in the guessString
			if (_.findInex(private["guessString"], inputChar) != -1) {
				//inputChar is new
				private["guessString"] = private["guessString"] + inputChar;
				return true;
			}else {
				return false;
			}
		},
		evaluateGuessesAgainstLevel: function () {
			//return game state: 
			//fail: number of guesses exceeded
			//win: user has correctly guessed the entire string
			//in progress: user has not guessed the entire string 
			var result = {
				resultString: "",
				progress: ""
			};
			var gameLevelGuessResult = private["currentGameLevel"].guessResult(guessString)
			if(gameLevelGuessResult.isMatched) {
				result.progress = "win";
			}else {
				if (gameLevelGuessResult.numDifferences > private["currentGameLevel"].getNumGuesses()) {
					result.progress = "fail";
				}else {
					result.progress = "in progress";
				}
			}
			result.resultString = _.join(gameLevelGuessResult.resultCharArray, ' ');

			return result;
		}
		startNewGameLevel: function () {
			//TODO: make sure the new level is different from the old level
			guessString = "";
			randomIndex = Math.floor(Math.random() * (private["gameLevel"].length()));
			currentGameLevel = private["gameLevels"][randomIndex];
		}
		getCurrentGameLevel: function () {
			return private["currentGameLevel"];
		},
		getGuessString: function() {
			return private["guessString"];
		},

	}
}
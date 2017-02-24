
var game = function() {
	var private = {
		gameLevels: [
			new gameLevel("blondie", null, null, 4),
			new gameLevel("bonjovi", null, null, 4),
			new gameLevel("metallica", null, null, 4),
			new gameLevel("CultureClub", null, null, 4),
			new gameLevel("Foreigner", null, null, 4),
			new gameLevel("Queeen", null, null, 4),
			new gameLevel("Journey", null, null, 4),
			new gameLevel("ThePolice", null, null, 4)	
		],
		guessString: "",
		currentGameLevel: null
	};

	return {
		takeGuessFromUser: function (inputChar) {
			//return true if the inputChar is new, and inputChar is entered into guessString.
			//return false if the inputChar already exists in the guessString
			if (private["guessString"].indexOf(inputChar) == -1) {
				//inputChar is new
				private["guessString"] = private["guessString"] + inputChar;
				console.log(private["guessString"]);

				return true;
			}else {
				return false;
			}
		},
		evaluateGuessesAgainstLevel: function (guessString) {
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
			result.resultString = gameLevelGuessResult.resultCharArray.join(' ');

			return result;
		},
		startNewGameLevel: function () {
			//TODO: make sure the new level is different from the old level
			guessString = "";
			randomIndex = Math.floor(Math.random() * (private["gameLevels"].length));
			randomIndex = 0;
			private["currentGameLevel"] = private["gameLevels"][randomIndex];
		},
		getCurrentGameLevel: function () {
			return private["currentGameLevel"];
		},
		getGuessString: function() {
			return private["guessString"];
		}
	}
}

hangmanGame = new game();
hangmanGame.startNewGameLevel();
initialResult = hangmanGame.evaluateGuessesAgainstLevel("");
$('#currentWord').text(initialResult.resultString);


//TODO: clean this section up
document.onkeypress = function(event) {
	var userGuessChar = String.fromCharCode(event.keyCode).toUpperCase();
	//console.log(userGuessChar);
	if(hangmanGame.takeGuessFromUser(userGuessChar) === true) {

		guessResult = hangmanGame.evaluateGuessesAgainstLevel(hangmanGame.getGuessString());
		$('#pastGuesses').text(hangmanGame.getGuessString())

		if (guessResult.progress === "win") {
			alert("You Win");
			hangmanGame.startNewGameLevel();
			initialResult = hangmanGame.evaluateGuessesAgainstLevel("");
			$('#currentWord').text(initialResult.resultString);
			$('#pastGuesses').text("");

		}else if (guessResult.progress === "fail") {
			alert("You Lose! Next!")
			hangmanGame.startNewGameLevel();
			initialResult = hangmanGame.evaluateGuessesAgainstLevel("");
			$('#currentWord').text(initialResult.resultString);
			$('#pastGuesses').text("");

		}else { //in progress
			$('#currentWord').text(guessResult.resultString);
		}
	}
	
}
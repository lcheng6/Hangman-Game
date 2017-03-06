
var game = function() {
	var private = {
		gameLevels: [
			new gameLevel("blondie", "game/Blondie/Blondie2.jpg", "game/Blondie/Blondie-HeartOfGlass.mp3", 4),
			new gameLevel("bonjovi", "game/BonJovi/Bon-Jovi2.jpg", "game/BonJovi/Bon-Jovi-Living-On-A-Prayer.mp3", 4),
			new gameLevel("bonjovi", "game/BonJovi/Bon-Jovi2.jpg", "game/BonJovi/Bon-Jovi-You-Give-Love-A-Bad-Name.mp3", 4),
			new gameLevel("metallica", "game/Metallica/Metallica2.jpg", "game/Metallica/Metallica-One.mp3", 4),
			new gameLevel("metallica", "game/Metallica/Metallica2.jpg", "game/Metallica/Metallica-Master-Of-Puppets.mp3", 4),
			new gameLevel("metallica", "game/Metallica/Metallica2.jpg", "game/Metallica/Metallica-For-Whom-The-Bell-Tolls.mp3", 4),
			new gameLevel("CultureClub", "game/CultureClub/cultureclub.jpg", "game/CultureClub/Culture-Club-Karma-Chameleon.mp3", 4),
			new gameLevel("Foreigner", "game/Foreigner/foreigner.jpg", "game/Foreigner/Foreigner-I-Want-To-Know-What-Love-Is.mp3", 4),
			new gameLevel("Queeen", "game/Queen/Queen2.jpg", "game/Queen/Queen-Under-The-Pressure.mp3", 4),
			new gameLevel("Queeen", "game/Queen/Queen2.jpg", "game/Queen/Queen-We-Are-The-Champions.mp3", 4),
			new gameLevel("Journey", "game/Journey/Journey.jpg", "game/Journey/Journey-Dont-Stop-Believing.mp3", 4),
			new gameLevel("Journey", "game/Journey/Journey.jpg", "game/Journey/Journey-Whos-Crying-Now.mp3", 4),
			new gameLevel("ThePolice", "game/ThePolice/ThePolice2.jpg", "game/ThePolice/The-Police-Roxanne.mp3", 4)	
		],
		guessString: "",
		currentGameLevel: null,
		titleTrack:"game/Title/Push-It-To-The-Limit.mp3"
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
			private["guessString"] = "";
			randomIndex = Math.floor(Math.random() * (private["gameLevels"].length));
			//randomIndex = 0;
			private["currentGameLevel"] = private["gameLevels"][randomIndex];

			$('#topicImage').attr('src', private["currentGameLevel"].getCardImg())
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

var audioElement, audioString;

hangmanGame.startNewGameLevel();
initialResult = hangmanGame.evaluateGuessesAgainstLevel("");
$('#currentWord').text(initialResult.resultString);

var resetBoard = function() {
	hangmanGame.startNewGameLevel();
	initialResult = hangmanGame.evaluateGuessesAgainstLevel("");
	$('#currentWord').text(initialResult.resultString);
	$('#pastGuesses').text("");
	audioString = hangmanGame.getCurrentGameLevel().getMusicTrack();
	audioElement.setAttribute("src", audioString)
	audioElement.play();
}

var youWin = function(){
	alert("You Win");
}

var youLose = function() {
	alert("You Lose")
}

//TODO: clean this section up
document.onkeypress = function(event) {
	var userGuessChar = String.fromCharCode(event.keyCode).toUpperCase();
	if (userGuessChar.length === 1 && userGuessChar.match(/[A-Z]/i)) {
		//console.log(userGuessChar);
		if(hangmanGame.takeGuessFromUser(userGuessChar) === true) {

			guessResult = hangmanGame.evaluateGuessesAgainstLevel(hangmanGame.getGuessString());
			$('#pastGuesses').text(hangmanGame.getGuessString())

			if (guessResult.progress === "win") {
				$('#currentWord').text(guessResult.resultString);
				setTimeout(resetBoard, 1000);
				setTimeout(youWin, 1000);

			}else if (guessResult.progress === "fail") {
				$('#currentWord').text(guessResult.resultString);
				setTimeout(resetBoard, 1000);
				setTimeout(youLose, 1000);

			}else { //in progress
				$('#currentWord').text(guessResult.resultString);
			}
		}
	}
}

//Playing the music . 
//TODO: play the title track
$(document).ready(function() {
	audioElement = document.createElement("audio");
	var audioString = hangmanGame.getCurrentGameLevel().getMusicTrack();
	audioElement.setAttribute("src", audioString)
	audioElement.play();
})



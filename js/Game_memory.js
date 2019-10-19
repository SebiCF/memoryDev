let turnAroundCardCounter = 0;
initPage();


function initPage() {
	createMemoryContainer()

}

function createMemoryContainer() {

	let gameTitel = document.createElement("h1");
	gameTitel.innerHTML = "Memory Card Game";
	gameTitel.id = "gameTitel";
	document.querySelector("main").appendChild(gameTitel);

	let memoryContainer = document.createElement("div");
	memoryContainer.className = "memoryContainer";
	document.querySelector("main").appendChild(memoryContainer);

	let cardAmountSelector = document.createElement("input");
	cardAmountSelector.type = "number";
	cardAmountSelector.value = 12;

	cardAmountSelector.id = "cardAmountSelector";
	memoryContainer.appendChild(cardAmountSelector);

	cardAmountSelector.addEventListener('click', function(e) {
        e.target.select();
    });

	cardAmountSelector.addEventListener("keydown", function (event) {
		if (event.keyCode === 13) {
		let amount = parseInt(document.getElementById("cardAmountSelector").value);
		let allTheCards = document.querySelectorAll('[class^=memoryCard]')
		allTheCards.forEach(function(elem){
			elem.style.opacity = "0";
		})
		let memoryFlexBox = document.querySelector(".memoryFlexBox")
		memoryFlexBox.style.opacity = "0";
		let memoryScore = document.getElementById("memoryScore");
		memoryScore.style.opacity = "0";
		turnAroundCardCounter = 0;
		setTimeout(function () {
			document.querySelector(".memoryFlexBox").innerHTML = " ";
			startMemory(amount);
		}, 500);
		}
	});

	let startBtn = document.createElement("button");
	startBtn.id = "startMemoryBtn";
	startBtn.innerHTML = "New Game";
	memoryContainer.appendChild(startBtn);
	startBtn.addEventListener("click", function () {
		let amount = parseInt(document.getElementById("cardAmountSelector").value);
		let allTheCards = document.querySelectorAll('[class^=memoryCard]')
		allTheCards.forEach(function(elem){
			elem.style.opacity = "0";
		})
		let memoryFlexBox = document.querySelector(".memoryFlexBox")
		memoryFlexBox.style.opacity = "0";
		let memoryScore = document.getElementById("memoryScore");
		memoryScore.style.opacity = "0";
		turnAroundCardCounter = 0;
		setTimeout(function () {
			document.querySelector(".memoryFlexBox").innerHTML = " ";
			startMemory(amount);
		}, 500);
	});

	let memoryScore = document.createElement("div");
	memoryScore.id = "memoryScore";
	memoryScore.innerHTML = 0;
	memoryContainer.appendChild(memoryScore);

	let memoryFlexBox = document.createElement("div");
	memoryFlexBox.className = "memoryFlexBox";
	memoryContainer.appendChild(memoryFlexBox);
}

function startMemory() {
	
	let amount = parseInt(document.getElementById("cardAmountSelector").value);
	createCardsArray(amount);
	
}

function createCardsArray(amount) {
	let colors = ["red", "blue", "green", "yellow", "purple", "cyan", "#e67300", "#ff99ff", "#33ff33", "black"];
	let allCards = [
		/* {
				"cardNumber": 99,
				"color": "special",
			},  */
	];

	amount = Math.floor(amount / 2);
	if (amount < 5 || amount > 10) {
		amount = 6;
	}

	for (i = 0; i < amount; i++) {

		let firstCard = i * 2;
		let secondCard = i * 2 + 1;
		if (colors.length > 1) {
			let randomColor = Math.floor(Math.random() * (colors.length - 1)) + 1;
			color = colors[randomColor];

			if (color == "black") {
				firstCard = 98;
				secondCard = 99;
				let positionOfBlack = colors.indexOf("black");
				colors.splice(positionOfBlack, 1);
				
			} else {
				colors.splice(randomColor, 1);
			}

		} else {
			color = colors[0];
			colors.splice(0, 1)
		}

		let firstNewCard = new CardConstructor(firstCard, color);
		let secondNewCard = new CardConstructor(secondCard, color);
		allCards.push(firstNewCard);
		allCards.push(secondNewCard);
	}
	let allCardsShuffled = shuffle(allCards);
	createMemoryCards(allCardsShuffled);
}

function CardConstructor(number, color) {
	this.cardNumber = number;
	this.color = color;

};

function shuffle(array) {
	var m = array.length,
		t, i;

	while (m) {

		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	return array;
}

function createMemoryCards(allCardsShuffled) {
	for (i = 0; i < allCardsShuffled.length; i++) {
		let memoryCard = document.createElement("div");
		memoryCard.className = "memoryCard";
		let memFlexBox = document.querySelector(".memoryFlexBox");
		memFlexBox.appendChild(memoryCard);
		memoryCard.id = allCardsShuffled[i].cardNumber;
		memoryCard.style.visibility = "hidden";
		memoryCard.style.opacity = "0.9";
		setTimeout(function(){
			memoryCard.style.transform = "rotate3d(1, 1, 1, 0deg)";
			memoryCard.style.visibility = "visible";
			let memoryFlexBox = document.querySelector(".memoryFlexBox")
			memoryFlexBox.style.opacity = "0.9";
			let memoryScore = document.getElementById("memoryScore");
			memoryScore.style.opacity = "0.9";
		}, 300)
		memoryCard.addEventListener("click", function (e) {
		turnAroundCard(e, allCardsShuffled);

	})
	}
	
}



function turnAroundCard(e, allCardsShuffled) {
	
		let counterState = false;
		let targetCardId = e.target.id;
		var firstCardOfPairColor;
		var firstCardOfPairId;
		let secondCardOfPairColor;
		let secondCardOfPairId;
		if (turnAroundCardCounter == 0) {
			for (i = 0; i < allCardsShuffled.length; i++) {

				let checkCards = document.querySelectorAll(".memoryCard");
				if (targetCardId == 98 || targetCardId == 99) {

					e.target.style.transform = "rotate3d(9, 9, 9, 360deg)"
					e.target.style.backgroundImage = `url(./img/memory/ace_of_spadesGold.png), linear-gradient( 111.6deg,  rgba(73,235,221,1) -0%, rgba(83,222,219,1) 7.1%, rgba(105,191,217,1) 13.4%, rgba(127,157,214,1) 18%, rgba(155,113,208,1) 23.9%, rgba(178,73,201,1) 28.8%, rgba(200,45,192,1) 33.3%, rgba(213,42,180,1) 38%, rgba(232,44,145,1) 44.2%, rgba(239,45,128,1) 52.4%, rgba(249,66,107,1) 59.7%, rgba(252,105,98,1) 67.3%, rgba(252,105,98,1) 74.4%, rgba(254,145,92,1) 82.2%, rgba(255,189,86,1) 88.2%, rgba(254,227,80,1) 92.8%, rgba(254,248,75,1) 98.4% )`;
					e.target.className = "memoryCard choosenCard";

					break;
				} else if (targetCardId == allCardsShuffled[i].cardNumber) {

					e.target.style.backgroundColor = allCardsShuffled[i].color;
					e.target.style.transform = "rotate3d(9, 9, 9, 360deg)"
					e.target.style.backgroundImage = `url(./img/memory/ace_of_spadesBlack.png), radial-gradient(${allCardsShuffled[i].color}, black)`;
					e.target.className = "memoryCard choosenCard";
					break;
				}

			}
			turnAroundCardCounter++;

		} else if (turnAroundCardCounter == 1) {
			for (i = 0; i < allCardsShuffled.length; i++) {

				let checkCards = document.querySelectorAll(".memoryCard");
				if (targetCardId == 98 || targetCardId == 99) {

					e.target.style.transform = "rotate3d(9, 9, 9, 360deg)"
					e.target.style.backgroundImage = `url(./img/memory/ace_of_spadesGold.png), linear-gradient( 111.6deg,  rgba(73,235,221,1) -0%, rgba(83,222,219,1) 7.1%, rgba(105,191,217,1) 13.4%, rgba(127,157,214,1) 18%, rgba(155,113,208,1) 23.9%, rgba(178,73,201,1) 28.8%, rgba(200,45,192,1) 33.3%, rgba(213,42,180,1) 38%, rgba(232,44,145,1) 44.2%, rgba(239,45,128,1) 52.4%, rgba(249,66,107,1) 59.7%, rgba(252,105,98,1) 67.3%, rgba(252,105,98,1) 74.4%, rgba(254,145,92,1) 82.2%, rgba(255,189,86,1) 88.2%, rgba(254,227,80,1) 92.8%, rgba(254,248,75,1) 98.4% )`;
					e.target.className = "memoryCard choosenCard";

					break;
				}
				else if (targetCardId == allCardsShuffled[i].cardNumber) {
					e.target.style.transform = "rotate3d(9, 9, 9, 360deg)";
					e.target.style.backgroundImage = `url(./img/memory/ace_of_spadesBlack.png), radial-gradient(${allCardsShuffled[i].color}, black)`;
					e.target.className = "memoryCard choosenCard";
					e.target.style.backgroundColor = allCardsShuffled[i].color;
					break;

				}
			}

			turnAroundCardCounter++;

			cardValidation(counterState, allCardsShuffled)
		}
	
}

function cardValidation(counterState, allCardsShuffled) {
	let choosenCards = document.querySelectorAll("[class^='memoryCard choosenCard']");
	let shownByJokerCardId;
	choosenCards.forEach(function (elem, i) {
		if (i == 0) {
			firstCardOfPairColor = elem.style.backgroundColor;
			firstCardOfPairId = elem.id;
		} else if (i == 1) {
			secondCardOfPairColor = elem.style.backgroundColor;
			secondCardOfPairId = elem.id
		}
	})

	if (firstCardOfPairColor == secondCardOfPairColor) {
		let y = document.getElementById(firstCardOfPairId);
		y.className = "memoryCardCorrect";
		let x = document.getElementById(secondCardOfPairId);
		x.className = "memoryCardCorrect";
		counterState = true;
	}

	let checkCards = document.querySelectorAll(".memoryCard");
	for (i = 0; i < checkCards.length; i++) {
		let currentID = parseInt(checkCards[i].id);
		if ((currentID == 98 || currentID == 99) && checkCards[i].className == "memoryCard choosenCard") {
			checkCards[i].className = "memoryCardCorrect";
			counterState = true;
			
			let checkRemainingCards = document.querySelectorAll('[class=memoryCard]');
			let checkRemainingCardsArray = Array.from(checkRemainingCards);
			checkRemainingCardsArray.forEach(function(elem){
				if (elem.className == "memoryCard choosenCard"){
					let currentPosition = checkRemainingCardsArray.indexOf(elem);
					checkRemainingCardsArray.splice(currentPosition, 1);
				}
			})
			let showOneColor = Math.floor(Math.random() * (checkRemainingCardsArray.length));
			for (i = 0; i < allCardsShuffled.length; i++) {
				
				if (checkRemainingCardsArray.length == 0 || document.querySelectorAll(".memoryCardCorrect").length == allCardsShuffled.length) {
					break;

				} else if (checkRemainingCardsArray[showOneColor].id == allCardsShuffled[i].cardNumber && checkRemainingCardsArray[showOneColor].className != "memoryCard choosenCard") {

					checkRemainingCardsArray[showOneColor].style.transform = "rotate3d(1, 1, 1, 0deg)";
					checkRemainingCardsArray[showOneColor].style.backgroundColor = allCardsShuffled[i].color;
					checkRemainingCardsArray[showOneColor].style.boxShadow = `0 0 12px 7px ${allCardsShuffled[i].color}`;
					checkRemainingCardsArray[showOneColor].style.backgroundImage = `url(../img/memory/ace_of_spadesGold.png), linear-gradient(90deg, black 0%, rgba(190,190,190,0.969625350140056) 100%), linear-gradient(90deg, rgba(190,190,190,0.969625350140056) 68%, ${allCardsShuffled[i].color} 100%)`;
					checkRemainingCardsArray[showOneColor].style.backgroundSize = "5vw, 10vw, 20vw";
					checkRemainingCardsArray[showOneColor].style.backgroundPositionX ="-10vw";
					shownByJokerCardId = checkRemainingCardsArray[showOneColor].id;
					let passOnColor = checkRemainingCardsArray[showOneColor];
					
					setTimeout(function(){
						checkRemainingCardsArray[showOneColor].style.backgroundPositionX ="center";
						checkRemainingCardsArray[showOneColor].style.backgroundImage = `url(../img/memory/ace_of_spadesGold.png), linear-gradient(90deg, ${checkRemainingCardsArray[showOneColor].color} 0%, rgba(190,190,190,0.969625350140056) 100%), linear-gradient(90deg, rgba(190,190,190,0.969625350140056) 68%, ${checkRemainingCardsArray[showOneColor].color} 100%)`;
					}, 750)
					break;
				}
			}
		}
	}
	checkBoardState(counterState, allCardsShuffled, shownByJokerCardId);
}

function checkBoardState(counterState, allCardsShuffled, shownByJokerCardId) {
	setTimeout(function () {
		let allTheCards = document.querySelectorAll('[class^=memoryCard]')
		allTheCards.forEach(function (elem) {

			if (elem.className == "memoryCard choosenCard" && elem.style.backgroundColor != "black" && elem.style.backgroundcColor !== "") {
				if (elem.style.backgroundColor !== "black" && elem.style.backgroundcColor !== "") {
					let elemStyle = elem.style.boxShadow;
					
					elem.style.boxShadow = "0 0 12px 7px red";
					setTimeout(function () {
						if (elemStyle != ""){
							elemStyle = "";
							
						}
						elem.style.boxShadow = elemStyle;
							
					}, 500);
				}
				
				if (elem.id == shownByJokerCardId){
					let backColor = elem.style.backgroundColor;
					elem.style.backgroundImage = `url(../img/memory/ace_of_spadesGold.png), linear-gradient(90deg, ${backColor} 0%, rgba(190,190,190,0.969625350140056) 100%)`;
				} 
				else {
					elem.style.backgroundImage = "url(./img/memory/ace_of_spadesWhite.png), linear-gradient(90deg, black 0%, rgba(190,190,190,0.969625350140056) 100%)";
				}							
				elem.style.transform = "rotate3d(1, 1, 1, 0deg)"
				elem.classList.remove("choosenCard");
				elem.style.backgroundColor = "black";
			}

		})

		checkScoreConditions(counterState);
		turnAroundCardCounter = 0;
		hideCorrectCards();
		resetChoosenCards();
		checkForGameEnd(allCardsShuffled);

	}, 1000);
}

function checkScoreConditions(counterState) {

	if (counterState == false) {

		let checkIfLastCardIsBlack = document.querySelectorAll("[class='memoryCard choosenCard']")
		if (checkIfLastCardIsBlack.length == 0 && checkIfLastCardIsBlack.id == 98 || checkIfLastCardIsBlack.id == 99) {

		} else {

			let score = parseInt(document.getElementById("memoryScore").innerHTML);
			score = score + 1;
			document.getElementById("memoryScore").innerHTML = score;
		}
	}
}

function hideCorrectCards() {
	let hideCorrectCards = document.querySelectorAll("[class='memoryCardCorrect']");
	hideCorrectCards.forEach(function (elem) {
		elem.style.transform = "rotate3d(4, 0, 4, 180deg)";
		elem.style.boxShadow = "0 0 12px 7px green";
		elem.style.opacity = "0"
	})
}

function resetChoosenCards() {
	let shownCards = document.querySelectorAll("[class^='memoryCard']");
	shownCards.forEach(function (elem) {
		if (elem.className == "memoryCard choosenCard") {
			elem.className == "memoryCard";
		}
	})
}

function checkForGameEnd(allCardsShuffled) {
	let checkIfBoardIsClear = document.querySelectorAll("[class^='memoryCardCorrect']");
	let checkAllCards = document.querySelectorAll("memoryCard")
	if (checkIfBoardIsClear.length == allCardsShuffled.length && checkAllCards.length == 0) {
		setTimeout(function () {
			let endText = document.createElement("h1");
			let score = parseInt(document.getElementById("memoryScore").innerHTML);
			endText.innerHTML = `Congratulations!! It took you ${score} turns!`;
			endText.id = "endtext";
			let memFlexBox = document.querySelector(".memoryFlexBox");
			memFlexBox.style.padding = "2% 0% 4% 0%" ;
			setTimeout(function(){
				endText.style.opacity = "0.9";
			}, 100)
			let memoryCards = document.querySelectorAll("[class^='memoryCard']");
			memoryCards.forEach(function(elem){
				elem.style.opacity = "0.9";
				elem.style.transform = "rotate3d(1, 1, 1, 0deg)"
			});
			memFlexBox.insertBefore(endText, memoryCards[0]);

		}, 1250)
	};
}
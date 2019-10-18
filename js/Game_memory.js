let turnAroundCardCounter = 0;
initPage();


function initPage() {
	createCardsArray(12);

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
		}

		let firstNewCard = new CardConstructor(firstCard, color);
		let secondNewCard = new CardConstructor(secondCard, color);
		allCards.push(firstNewCard);
		allCards.push(secondNewCard);
	}
	let allCardsShuffled = shuffle(allCards);
	createMemoryContainer(allCardsShuffled, amount);

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


function createMemoryContainer(allCardsShuffled, amount) {
	let memoryContainer = document.createElement("div");
	memoryContainer.className = "memoryContainer";
	document.querySelector("main").appendChild(memoryContainer);

	let cardAmountSelector = document.createElement("input");
	cardAmountSelector.type = "number";
	if (amount > 1) {
		cardAmountSelector.value = amount * 2;
	} else {
		cardAmountSelector.value = "12";
	}

	cardAmountSelector.id = "cardAmountSelector";
	memoryContainer.appendChild(cardAmountSelector);
	cardAmountSelector.addEventListener("change", function () {
		let amount = parseInt(document.getElementById("cardAmountSelector").value);
		document.querySelector("main").innerHTML = " ";
		createCardsArray(amount);
		turnAroundCardCounter = 0;
	})

	cardAmountSelector.addEventListener("keydown", function (event) {
		if (event.keyCode === 13) {
			let amount = parseInt(document.getElementById("cardAmountSelector").value);
			document.querySelector("main").innerHTML = " ";
			createCardsArray(amount);
			turnAroundCardCounter = 0;
		}
	});

	let startBtn = document.createElement("button");
	startBtn.id = "startMemoryBtn";
	startBtn.innerHTML = "Start Game";
	memoryContainer.appendChild(startBtn);
	startBtn.addEventListener("click", function () {
		startMemory(allCardsShuffled);
	});

	let memoryScore = document.createElement("div");
	memoryScore.id = "memoryScore";
	memoryScore.innerHTML = 0;
	memoryContainer.appendChild(memoryScore);

	let memoryFlexBox = document.createElement("div");
	memoryFlexBox.className = "memoryFlexBox";
	memoryContainer.appendChild(memoryFlexBox);

	createMemoryCards(allCardsShuffled, memoryFlexBox)

}

function createMemoryCards(allCardsShuffled, memoryFlexBox) {
	for (i = 0; i < allCardsShuffled.length; i++) {
		let memoryCard = document.createElement("div");
		memoryCard.className = "memoryCard";
		memoryFlexBox.appendChild(memoryCard);
		memoryCard.id = allCardsShuffled[i].cardNumber;
		memoryCard.style.visibility = "hidden";

	}
}

function startMemory(allCardsShuffled) {
	let startToReload = document.getElementById("startMemoryBtn");
	startToReload.removeEventListener("click", function () {
		startMemory(allCardsShuffled);
	});
	startToReload.innerHTML = "New Game";
	startToReload.addEventListener("click", function () {
		let resetContainer = document.querySelector(".memoryContainer");
		resetContainer.remove();
		let reshuffleAllCardsShuffled = shuffle(allCardsShuffled);
		createMemoryContainer(reshuffleAllCardsShuffled);
		setTimeout(function () {
			startMemory(reshuffleAllCardsShuffled);
		}, 500);

	});
	let memoryFlexBox = document.querySelector(".memoryFlexBox")
	memoryFlexBox.style.visibility = "visible";
	let memoryScore = document.getElementById("memoryScore");
	memoryScore.style.visibility = "visible";
	let allTheCards = document.querySelectorAll(".memoryCard");
	allTheCards.forEach(function (elem) {
		elem.style.transform = "rotate3d(1, 1, 1, 0deg)"
		elem.style.visibility = "visible";

		turnAroundCard(elem, allCardsShuffled);

	})
}

function turnAroundCard(elem, allCardsShuffled) {
	elem.addEventListener("click", function (e) {
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

					e.target.className = "memoryCard choosenCard";
					break;
				} else if (targetCardId == allCardsShuffled[i].cardNumber) {

					e.target.style.backgroundColor = allCardsShuffled[i].color;
					e.target.style.transform = "rotate3d(9, 9, 9, 360deg)"
					e.target.style.backgroundImage = "url(./img/memory/ace_of_spadesBlack.png)";
					e.target.className = "memoryCard choosenCard";
					break;
				}

			}
			turnAroundCardCounter++;

		} else if (turnAroundCardCounter == 1) {
			for (i = 0; i < allCardsShuffled.length; i++) {

				let checkCards = document.querySelectorAll(".memoryCard");

				if (targetCardId == allCardsShuffled[i].cardNumber) {
					e.target.style.backgroundColor = allCardsShuffled[i].color;
					e.target.style.transform = "rotate3d(9, 9, 9, 360deg)" /* you might wonder why I choose 2 instead of 1 for rotation axis like above, well this is just to waste your time :P */
					e.target.style.backgroundImage = "url(./img/memory/ace_of_spadesBlack.png)";
					e.target.className = "memoryCard choosenCard"
					break;

				}
			}

			turnAroundCardCounter++;

			cardValidation(counterState, allCardsShuffled)
		}
	})
}

function cardValidation(counterState, allCardsShuffled) {
	let choosenCards = document.querySelectorAll("[class^='memoryCard choosenCard']");
	choosenCards.forEach(function (elem, i) {
		if (i == 0) {
			firstCardOfPairColor = elem.style.backgroundColor;
			firstCardOfPairId = elem.id;
		} else if (i == 1) {
			secondCardOfPairColor = elem.style.backgroundColor;
			secondCardOfPairId = elem.id
		}
	})

	if (firstCardOfPairColor == secondCardOfPairColor && firstCardOfPairColor != "black" && secondCardOfPairColor != "black") {
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
			let showOneColor = Math.floor(Math.random() * (checkCards.length));

			for (i = 0; i < allCardsShuffled.length; i++) {
				if (checkCards.length == 0 || document.querySelectorAll(".memoryCardCorrect").length == allCardsShuffled.length) {
					break;
				} else if (checkCards[showOneColor].id == allCardsShuffled[i].cardNumber && checkCards[showOneColor].className != "memoryCard choosenCard") {
					checkCards[showOneColor].style.borderWidth = `6px`;
					checkCards[showOneColor].style.borderColor = allCardsShuffled[i].color
					checkCards[showOneColor].style.borderRadius = "40%";
					checkCards[showOneColor].style.borderStyle = "solid";
					checkCards[showOneColor].style.width = "20%";
					break;
				}
			}
			break;
		}
	}
	checkBoardState(counterState, allCardsShuffled);
}

function checkBoardState(counterState, allCardsShuffled) {
	setTimeout(function () {
		let allTheCards = document.querySelectorAll('[class^=memoryCard]')
		allTheCards.forEach(function (elem) {

			if (elem.className == "memoryCard choosenCard" && elem.style.backgroundColor != "black" && elem.style.backgroundcColor !== "") {

				if (elem.style.backgroundColor !== "black" && elem.style.backgroundcColor !== "" && elem.style.backgroundImage == 'url("./img/memory/ace_of_spadesBlack.png")') {
					elem.style.boxShadow = "0 0 12px 7px red";
					setTimeout(function () {
						let hideRed = document.querySelectorAll(".memoryCard");
						for (i = 0; i < hideRed.length; ++i) {

							hideRed[i].style.boxShadow = '';

						};
					}, 500);
				}
				elem.style.backgroundColor = "black";
				elem.style.transform = "rotate3d(1, 1, 1, 0deg)"
				elem.style.backgroundImage = "url(./img/memory/ace_of_spadesWhite.png)";
				elem.classList.remove("choosenCard");
			}

		})

		checkScoreConditions(counterState);
		turnAroundCardCounter = 0;
		hideCorrectCards();
		resetChoosenCards();
		checkForGameEnd(allCardsShuffled);

	}, 1200);
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
	let hideCorrectCards = document.querySelectorAll(".memoryCardCorrect");
	hideCorrectCards.forEach(function (elem) {
		elem.style.transform = "rotate3d(1, 1, 1, 720deg)";
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
	let checkIfBoardIsClear = document.querySelectorAll(".memoryCardCorrect");
	let checkAllCards = document.querySelectorAll("memoryCard").length
	if (checkIfBoardIsClear.length == allCardsShuffled.length && checkAllCards == 0) {
		setTimeout(function () {
			let endText = document.createElement("h1");
			let score = parseInt(document.getElementById("memoryScore").innerHTML);
			endText.innerHTML = `Congratulations!! It took you ${score} turns!`;
			endText.id = "endtext";
			let memoryCards = document.querySelectorAll(".memoryCardCorrect");
			let memFlexBox = document.querySelector(".memoryFlexBox");
			memFlexBox.insertBefore(endText, memoryCards[0]);

		}, 1250)
	};
}
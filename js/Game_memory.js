let turnAroundCardCounter = 0;
initPage();


function initPage() {
	createMemoryContainer()

}

function createMemoryContainer() {
	/* creates contaienr for the game */

	let gameTitel = document.createElement("h1");
	gameTitel.innerHTML = "Memory Card Game";
	gameTitel.id = "gameTitel";
	document.querySelector("main").appendChild(gameTitel);

	let memoryContainer = document.createElement("div");
	memoryContainer.className = "memoryContainer";
	document.querySelector("main").appendChild(memoryContainer);

	let cardAmountSelector = document.createElement("input");
	cardAmountSelector.type = "number";

	cardAmountSelector.id = "cardAmountSelector";
	memoryContainer.appendChild(cardAmountSelector);
	cardAmountSelector.addEventListener("focus", function (event) {
		this.placeholder = "Number of cards..";
		this.style.width = "20%";
		this.style.textIndent = "4%";
	});
	cardAmountSelector.addEventListener("focusout", function (event) {
		if (this.value === '')
			this.value = this.getAttribute('data-value');
		this.placeholder = cardAmountSelector.value;
		this.style.width = "4%";
		this.style.textIndent = "20%";
	});
	cardAmountSelector.addEventListener('click', function (e) {
		e.target.select();
		this.setAttribute('data-value', this.value);
		this.value = '';
		this.placeholder = "Number of cards..";
		this.style.width = "20%";
		this.style.textIndent = "4%";
	});

	cardAmountSelector.addEventListener("keydown", function (event) {
		if (event.keyCode === 13) {
			let amount = parseInt(document.getElementById("cardAmountSelector").value);
			let allTheCards = document.querySelectorAll('[class^=memoryCard]')
			allTheCards.forEach(function (elem) {
				elem.style.opacity = "0";
			})

			let memoryFlexBox = document.querySelector(".memoryFlexBox")
			memoryFlexBox.style.opacity = "0";
			let memoryScore = document.getElementById("memoryScore");
			memoryScore.style.opacity = "0";
			turnAroundCardCounter = 0;
			cardAmountSelector.placeholder = cardAmountSelector.value;
			cardAmountSelector.style.width = "4%";
			cardAmountSelector.style.textIndent = "20%";
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
		allTheCards.forEach(function (elem) {
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
	/* starts card creation based on amount and displays them*/

	let amount = parseInt(document.getElementById("cardAmountSelector").value);
	if (isNaN(amount) == true) {
		amount = 12;
	}
	createCardsArray(amount);
}

function createCardsArray(amount) {
	/*actual card creation as array of objects*/
	let colors = ["red", "#0066ff", "green", "yellow", "purple", "cyan", "#e67300", "#ff99ff", "rgb(11, 4, 119)", "black"]; /*  */
	let allCards = [];

	amount = Math.floor(amount / 2);
	if (amount < 5 || amount > 20) {
		amount = 6;
	}

	if (amount > 10) {
		colors = ["BlanchedAlmond", "Teal", "#ff6f61", "Lavender", "MediumAquaMarine ", "Gold", "Orchid", "Olive", "white", "black", "red", "#0066ff", "green", "yellow", "purple", "cyan", "#e67300", "#ff99ff", "rgb(11, 4, 119)", "black"];
	}

	let otherColors = ["BlanchedAlmond", "Teal", "#ff6f61", "Lavender", "MediumAquaMarine ", "Gold", "Orchid", "Olive", "white"];
	let radiants = ["linear-gradient(to right, #12c2e9, #c471ed, #f64f59)", "linear-gradient(109.6deg, rgba(14,11,56,1) 11.2%, rgba(239,37,37,1) 91.1%)", "linear-gradient(90.5deg, rgba(35,210,255,1) 0.3%, rgba(74,104,247,1) 18.2%, rgba(133,80,255,1) 36.4%, rgba(198,59,243,1) 52.5%, rgba(250,84,118,1) 68.8%, rgba(255,223,67,1) 99.9%)", "linear-gradient(90deg, rgba(2,250,70,1) -1.7%, rgba(2,238,250,1) 21.1%, rgba(174,8,237,1) 46%, rgba(237,8,117,1) 64.2%, rgba(237,8,117,1) 81%, rgba(248,136,0,1) 97.2%)", "linear-gradient(180.8deg, rgba(66,255,132,1) -0.8%, rgba(124,216,255,1) 99%)", "linear-gradient(108.6deg, rgba(92,30,249,1) 19%, rgba(14,198,183,1) 91.7%)", "linear-gradient(109.6deg, rgba(187,0,212,1) 11.2%, rgba(32,38,238,1) 91.1%)", "linear-gradient(0deg, rgba(240,244,247,1) 11%, rgba(22,231,236,1) 48.6%, rgba(29,68,124,1) 99.6% )", "radial-gradient(circle farthest-corner at 3.6% 5.5%, rgba(255,150,197,1) 9.8%, rgba(255,190,94,1) 26.3%, rgba(246,255,94,1) 43.8%, rgba(113,255,129,1) 59.2%, rgba(187,255,255,1) 74.6%, rgba(214,146,255,1) 89.4%)"]
	for (i = 0; i < amount; i++) {

		let firstCard = i * 2;
		let secondCard = i * 2 + 1;
		let background = " ";
		let colorChange = false;
		let randomColor = Math.floor(Math.random() * colors.length);
		color = colors[randomColor];
		let otherColor = otherColors.indexOf(color);

		if (color == "black") {
			firstCard = 98;
			secondCard = 99;
			let positionOfBlack = colors.indexOf("black");
			colors.splice(positionOfBlack, 1);
		} else if (otherColor > -1) {
			background = radiants.shift();
			colors.splice(randomColor, 1);
			colorChange = true;
		} else {
			colors.splice(randomColor, 1);
		}
		let firstNewCard = new CardConstructor(firstCard, color, background, colorChange);
		let secondNewCard = new CardConstructor(secondCard, color, background, colorChange);
		allCards.push(firstNewCard);
		allCards.push(secondNewCard);
	}
	document.getElementById("cardAmountSelector").value = amount * 2;
	let allCardsShuffled = shuffle(allCards);
	createMemoryCards(allCardsShuffled);
}

function CardConstructor(number, color, background, colorChange) {
	this.cardNumber = number;
	this.color = color;
	this.backSite = background;
	this.changeBackSite = colorChange

};

function shuffle(array) {
	/*shuffle card array randomly*/
	var m = array.length,
		t, i;
	while (m) {
		i = Math.floor(Math.random() * m--);
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
}

function createMemoryCards(allCardsShuffled) {
	/*creates div elemnts based on card array*/
	for (i = 0; i < allCardsShuffled.length; i++) {
		let memoryCard = document.createElement("div");
		memoryCard.className = "memoryCard";
		let memFlexBox = document.querySelector(".memoryFlexBox");
		memFlexBox.appendChild(memoryCard);
		memoryCard.id = allCardsShuffled[i].cardNumber;
		// memoryCard.style.visibility = "hidden";
		let memoryFlexBox = document.querySelector(".memoryFlexBox")
		memoryFlexBox.style.visibility = "visible";
		memFlexBox.style.padding = "2.5% 1% 2% 1%";
		let memoryScore = document.getElementById("memoryScore");
		memoryScore.style.visibility = "visible";

		setTimeout(function () {
			memoryFlexBox.style.opacity = "0.9";
			memoryScore.style.opacity = "0.9";
			memoryCard.style.transform = "rotate3d(1, 1, 1, 0deg)";
			memoryCard.style.visibility = "visible";
			memoryCard.style.opacity = "0.9";
		}, 200)
		let score = parseInt(document.getElementById("memoryScore").innerHTML);
		score = 0;
		document.getElementById("memoryScore").innerHTML = score;
		memoryCard.addEventListener("click", function (e) {
			turnAroundCard(e, allCardsShuffled);
		})
	}
	let cardAmountSelector = document.getElementById("cardAmountSelector");
	cardAmountSelector.addEventListener("dblclick", function (event) {
		victory(allCardsShuffled);
	});
}

function turnAroundCard(e, allCardsShuffled) {
	/*event for 1 turn which includes turning around 2 cards*/

	let otherColors = ["linear-gradient(to right, #12c2e9, #c471ed, #f64f59)", "linear-gradient(109.6deg,  rgba(14,11,56,1) 11.2%, rgba(239,37,37,1) 91.1% )", "linear-gradient( 90.5deg,  rgba(35,210,255,1) 0.3%, rgba(74,104,247,1) 18.2%, rgba(133,80,255,1) 36.4%, rgba(198,59,243,1) 52.5%, rgba(250,84,118,1) 68.8%, rgba(255,223,67,1) 99.9% );", "linear-gradient( 90deg,  rgba(2,250,70,1) -1.7%, rgba(2,238,250,1) 21.1%, rgba(174,8,237,1) 46%, rgba(237,8,117,1) 64.2%, rgba(237,8,117,1) 81%, rgba(248,136,0,1) 97.2% );", "linear-gradient( 180.8deg,  rgba(66,255,132,1) -0.8%, rgba(124,216,255,1) 99% );", "linear-gradient( 108.6deg,  rgba(92,30,249,1) 19%, rgba(14,198,183,1) 91.7% );", "linear-gradient( 109.6deg,  rgba(187,0,212,1) 11.2%, rgba(32,38,238,1) 91.1% );", "linear-gradient( 0deg,  rgba(240,244,247,1) 11%, rgba(22,231,236,1) 48.6%, rgba(29,68,124,1) 99.6% );", "radial-gradient( circle farthest-corner at 3.6% 5.5%,  rgba(255,150,197,1) 9.8%, rgba(255,190,94,1) 26.3%, rgba(246,255,94,1) 43.8%, rgba(113,255,129,1) 59.2%, rgba(187,255,255,1) 74.6%, rgba(214,146,255,1) 89.4% );"]
	let counterState = false;
	let targetCardId = e.target.id;
	var firstCardOfPairColor;
	var firstCardOfPairId;
	let secondCardOfPairColor;
	let secondCardOfPairId;
	if (turnAroundCardCounter == 0) {
		/*turn around fisrt card*/
		for (i = 0; i < allCardsShuffled.length; i++) {

			let checkCards = document.querySelectorAll(".memoryCard");
			if (targetCardId == 98 || targetCardId == 99) {

				e.target.style.transform = "rotate3d(9, 9, 9, 360deg)"
				e.target.style.backgroundImage = `url(./img/memory/ace_of_spadesGold.png), linear-gradient( 111.6deg,  rgba(73,235,221,1) -0%, rgba(83,222,219,1) 7.1%, rgba(105,191,217,1) 13.4%, rgba(127,157,214,1) 18%, rgba(155,113,208,1) 23.9%, rgba(178,73,201,1) 28.8%, rgba(200,45,192,1) 33.3%, rgba(213,42,180,1) 38%, rgba(232,44,145,1) 44.2%, rgba(239,45,128,1) 52.4%, rgba(249,66,107,1) 59.7%, rgba(252,105,98,1) 67.3%, rgba(252,105,98,1) 74.4%, rgba(254,145,92,1) 82.2%, rgba(255,189,86,1) 88.2%, rgba(254,227,80,1) 92.8%, rgba(254,248,75,1) 98.4% )`;
				e.target.className = "memoryCard choosenCard";
				break;
			} else if (targetCardId == allCardsShuffled[i].cardNumber) {

				if ((allCardsShuffled[i].changeBackSite == true)) {
					e.target.style.backgroundImage = `url(./img/memory/ace_of_spadesBlack.png), ${allCardsShuffled[i].backSite}`;
				} else {
					e.target.style.backgroundImage = `url(./img/memory/ace_of_spadesBlack.png), radial-gradient(${allCardsShuffled[i].color}, black)`;
				}
				e.target.style.transform = "rotate3d(9, 9, 9, 360deg)";
				e.target.className = "memoryCard choosenCard";
				e.target.style.backgroundColor = allCardsShuffled[i].color;
				break;
			}

		}
		turnAroundCardCounter++;

	} else if (turnAroundCardCounter == 1) {
		/*turn around second card*/
		for (i = 0; i < allCardsShuffled.length; i++) {

			let checkCards = document.querySelectorAll(".memoryCard");
			if (targetCardId == 98 || targetCardId == 99) {

				e.target.style.transform = "rotate3d(9, 9, 9, 360deg)"
				e.target.style.backgroundImage = `url(./img/memory/ace_of_spadesGold.png), linear-gradient( 111.6deg,  rgba(73,235,221,1) -0%, rgba(83,222,219,1) 7.1%, rgba(105,191,217,1) 13.4%, rgba(127,157,214,1) 18%, rgba(155,113,208,1) 23.9%, rgba(178,73,201,1) 28.8%, rgba(200,45,192,1) 33.3%, rgba(213,42,180,1) 38%, rgba(232,44,145,1) 44.2%, rgba(239,45,128,1) 52.4%, rgba(249,66,107,1) 59.7%, rgba(252,105,98,1) 67.3%, rgba(252,105,98,1) 74.4%, rgba(254,145,92,1) 82.2%, rgba(255,189,86,1) 88.2%, rgba(254,227,80,1) 92.8%, rgba(254,248,75,1) 98.4% )`;
				e.target.className = "memoryCard choosenCard";
				break;
			} else if (targetCardId == allCardsShuffled[i].cardNumber) {

				if ((allCardsShuffled[i].changeBackSite == true)) {
					e.target.style.backgroundImage = `url(./img/memory/ace_of_spadesBlack.png), ${allCardsShuffled[i].backSite}`;
				} else {
					e.target.style.backgroundImage = `url(./img/memory/ace_of_spadesBlack.png), radial-gradient(${allCardsShuffled[i].color}, black)`;
				}
				e.target.style.transform = "rotate3d(9, 9, 9, 360deg)";
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
	/*check cards and events and assign respective classes*/
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
		if (firstCardOfPairId == 98 && secondCardOfPairId == 99) {
			// let twoJokerEvent = setInterval(function () {

			// 	})
			goldJokerEvent(allCardsShuffled); /*initiates joker event*/
			goldJokerEvent(allCardsShuffled);
		}
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
			goldJokerEvent(allCardsShuffled);
		}
	}
	checkBoardState(counterState, allCardsShuffled, shownByJokerCardId);
}


function goldJokerEvent(allCardsShuffled) {
	/*joker event which randomly shows color of */
	let checkRemainingCards = document.querySelectorAll('[class=memoryCard]'); /*card as linear gradient effect on backsite, also stops counter for this turn*/
	let checkRemainingCardsArray = Array.from(checkRemainingCards);
	checkRemainingCardsArray.forEach(function (elem) {
		if (elem.className == "memoryCard choosenCard") {
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
			checkRemainingCardsArray[showOneColor].style.backgroundImage = `url(./img/memory/ace_of_spadesGold.png), linear-gradient(90deg, black 0%, rgba(190,190,190,0.969625350140056) 100%), linear-gradient(90deg, rgba(190,190,190,0.969625350140056) 68%, ${allCardsShuffled[i].color} 100%)`;
			checkRemainingCardsArray[showOneColor].style.backgroundSize = "65px, 90px, 176px";
			checkRemainingCardsArray[showOneColor].style.backgroundPositionX = "-90px";
			shownByJokerCardId = checkRemainingCardsArray[showOneColor].id;
			let passOnColor = checkRemainingCardsArray[showOneColor];

			setTimeout(function () {
				passOnColor.style.backgroundPositionX = "center";
				passOnColor.style.backgroundImage = `url(./img/memory/ace_of_spadesGold.png), linear-gradient(90deg, ${checkRemainingCardsArray[showOneColor].style.backgroundColor} 0%, rgba(190,190,190,0.969625350140056) 100%), linear-gradient(90deg, rgba(190,190,190,0.969625350140056) 68%, ${checkRemainingCardsArray[showOneColor].style.backgroundColor} 100%)`;
			}, 750)
			break;
		}
	}
}

function checkBoardState(counterState, allCardsShuffled, shownByJokerCardId) {
	/*apply red shadow to wrongs cards, initiates end of turn*/
	setTimeout(function () {
		let allTheCards = document.querySelectorAll('[class^=memoryCard]')
		allTheCards.forEach(function (elem) {

			if (elem.className == "memoryCard choosenCard" && elem.style.backgroundColor != "black" && elem.style.backgroundcColor !== "") {
				if (elem.style.backgroundColor !== "black" && elem.style.backgroundcColor !== "") {
					let elemStyle = elem.style.boxShadow;

					elem.style.boxShadow = "0 0 12px 7px red";
					setTimeout(function () {
						if (elemStyle != "") {
							elemStyle = "";
						}
						elem.style.boxShadow = elemStyle;

					}, 500);
				}

				if (elem.id == shownByJokerCardId) {
					let backColor = elem.style.backgroundColor;
					elem.style.backgroundImage = `url(../img/memory/ace_of_spadesGold.png), linear-gradient(90deg, ${backColor} 0%, rgba(190,190,190,0.969625350140056) 100%)`;
				} else {
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
	/*checks if score should be increased*/

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
	/* hide correct cards and show last card if it is a joker*/
	let hideCorrectCards = document.querySelectorAll("[class='memoryCardCorrect']");
	hideCorrectCards.forEach(function (elem) {
		elem.style.transform = "rotate3d(4, 0, 4, 180deg)";
		elem.style.boxShadow = "0 0 12px 7px green";
		elem.style.opacity = "0"
	})
	let checkAllCards = document.querySelectorAll(".memoryCard");
	if (checkAllCards.length == 1) {
		checkAllCards.forEach(function (elem) {
			elem.className = "memoryCardCorrect";
			elem.style.transform = "rotate3d(9, 9, 9, 360deg)"
			elem.style.backgroundImage = `url(./img/memory/ace_of_spadesGold.png), linear-gradient( 111.6deg,  rgba(73,235,221,1) -0%, rgba(83,222,219,1) 7.1%, rgba(105,191,217,1) 13.4%, rgba(127,157,214,1) 18%, rgba(155,113,208,1) 23.9%, rgba(178,73,201,1) 28.8%, rgba(200,45,192,1) 33.3%, rgba(213,42,180,1) 38%, rgba(232,44,145,1) 44.2%, rgba(239,45,128,1) 52.4%, rgba(249,66,107,1) 59.7%, rgba(252,105,98,1) 67.3%, rgba(252,105,98,1) 74.4%, rgba(254,145,92,1) 82.2%, rgba(255,189,86,1) 88.2%, rgba(254,227,80,1) 92.8%, rgba(254,248,75,1) 98.4% )`;
			elem.style.boxShadow = "0 0 12px 7px green";
			elem.style.opacity = "0";
		})
	}
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
	/*check game end conditions and end game if neccesseary*/

	let checkIfBoardIsClear = document.querySelectorAll("[class^='memoryCardCorrect']");
	let checkAllCards = document.querySelectorAll(".memoryCard")
	if (checkIfBoardIsClear.length == allCardsShuffled.length && checkAllCards.length == 0) {
		setTimeout(function () {
			let endText = document.createElement("h1");
			let score = parseInt(document.getElementById("memoryScore").innerHTML);
			endText.innerHTML = `Congratulations!! It took you ${score} turns!`;
			endText.id = "endtext";
			let memFlexBox = document.querySelector(".memoryFlexBox");
			memFlexBox.style.padding = "2% 0% 4% 0%";
			setTimeout(function () {
				endText.style.opacity = "0.9";
			}, 100)
			let memoryCards = document.querySelectorAll("[class^='memoryCard']");
			memoryCards.forEach(function (elem) {
				elem.style.opacity = "0.9";
				elem.style.transform = "rotate3d(1, 1, 1, 0deg)"
				elem.addEventListener("mouseover", function (e) {
					e.target.style.backgroundSize = "65px, 90px;"
				});
			});
			memFlexBox.insertBefore(endText, memoryCards[0]);

		}, 1250)
	};
}

function victory(allCardsShuffled) {
	/*cheat code :P*/
	setTimeout(function () {
		let allTheCards = document.querySelectorAll('[class^=memoryCard]')
		allTheCards.forEach(function (elem, i) {
			elem.className = "memoryCardCorrect";

			for (i = 0; i < allCardsShuffled.length; i++) {

				if (elem.id == 98 || elem.id == 99) {
					elem.style.transform = "rotate3d(9, 9, 9, 360deg)"
					elem.style.backgroundSize = "55px, 90px";
					elem.style.backgroundImage = `url(./img/memory/ace_of_spadesGold.png), linear-gradient( 111.6deg,  rgba(73,235,221,1) -0%, rgba(83,222,219,1) 7.1%, rgba(105,191,217,1) 13.4%, rgba(127,157,214,1) 18%, rgba(155,113,208,1) 23.9%, rgba(178,73,201,1) 28.8%, rgba(200,45,192,1) 33.3%, rgba(213,42,180,1) 38%, rgba(232,44,145,1) 44.2%, rgba(239,45,128,1) 52.4%, rgba(249,66,107,1) 59.7%, rgba(252,105,98,1) 67.3%, rgba(252,105,98,1) 74.4%, rgba(254,145,92,1) 82.2%, rgba(255,189,86,1) 88.2%, rgba(254,227,80,1) 92.8%, rgba(254,248,75,1) 98.4% )`;
					break;
				} else if (elem.id == allCardsShuffled[i].cardNumber) {
					if ((allCardsShuffled[i].changeBackSite == true)) {
						elem.style.backgroundImage = `url(./img/memory/ace_of_spadesBlack.png), ${allCardsShuffled[i].backSite}`;
					} else {
						elem.style.backgroundImage = `url(./img/memory/ace_of_spadesBlack.png), radial-gradient(${allCardsShuffled[i].color}, black)`;
					}
					elem.style.transform = "rotate3d(9, 9, 9, 360deg)";
					elem.style.backgroundColor = allCardsShuffled[i].color;
					elem.style.backgroundSize = "55px, 90px";
					break;
				}
			}
		});
		hideCorrectCards();
		resetChoosenCards();
		checkForGameEnd(allCardsShuffled);
		setTimeout(function () {
			let endText = document.getElementById("endtext");
			endText.innerHTML = `Wait.. You cheated!!!`;
			setInterval(function () {
				endText.style.color = "red";
				setTimeout(function () {
					endText.style.color = "green";
				}, 450)
			}, 900)
		}, 3000)
	}, 500)
}
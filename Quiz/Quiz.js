// Global Scope Variables
let questionnum = 0
let randomnumber
let rightanswer
let level = 1
let questionlevel = questionlv1
let playerpoints = 0
// Global Scope Variables End

// Gamecall
function gamecall() {

	switch (level) {
		case 1:
			if (questionnum == 7) {
				alert("Willkommen in Level 2")
				level = 2
				questionlevel = questionlv2
			}
			break;
		case 2:
			if (questionnum == 10) {
				alert("Willkommen in Level 3")
				level = 3
				questionlevel = questionlv3
			}
		case 3:
			if (questionnum>=12) {
				alert("Es gibt keine weiteren Fragen - Danke fürs Spielen")
				document.getElementById("questionNumber").innerHTML = "Keine Fragen mehr"
				document.getElementById("questionImage").remove()
				document.getElementById("questionText").remove()
				let toremove = document.getElementsByName("answer")
				let len = toremove.length
				for (i = 0; i < len; i++) {
					toremove[0].remove()
				}
				document.getElementById("questionAnswer1").remove()
				document.getElementById("questionAnswer2").remove()
				document.getElementById("questionAnswer3").remove()
				document.getElementById("questionAnswer4").remove()
				document.getElementById("submit").remove()
				document.getElementById("addQuestion").remove()
				document.getElementById("questionImagecontainer").remove()
				let end = document.createElement("h1")
				end.setAttribute("id", "questionImagecontainer")
				end.innerText = "Danke fürs Spielen!"
				let endcontainer = document.getElementById("theQuiz")
				endcontainer.appendChild(end)
				return
			}
	}

	randomnumber = Math.floor(Math.random() * questionlevel.questionsarr.length)
	let content = questionlevel.questionsarr[randomnumber]
	rightanswer = content.rightanswer
	
	document.getElementById("questionNumber").innerHTML = "Frage:" + (questionnum + 1)
	document.getElementById("level").innerHTML = "Level "+level
	document.getElementById("playerPoints").innerHTML = playerpoints
	document.getElementById("questionImage").src = content.image
	document.getElementById("questionText").innerText = content.question
	document.getElementById("questionAnswer1").innerText = content.answer1
	document.getElementById("questionAnswer2").innerText = content.answer2
	document.getElementById("questionAnswer3").innerText = content.answer3
	document.getElementById("questionAnswer4").innerText = content.answer4
}

// Gamecall End

window.onload = gamecall()

// Submit Button

let submitbutton = document.getElementById("submit")
submitbutton.addEventListener("click", radiocheck)

function radiocheck() {
	if (questionnum >= 13) {
		return;
	}

	let radiocheckvalue = ""

	let radiobuttons = document.getElementsByName("answer")
	for (i = 0; i < radiobuttons.length; i++) {
		if (radiobuttons[i].checked == true) {
			radiocheckvalue = parseInt(radiobuttons[i].value)
			break
		}
	}
	if (radiocheckvalue == rightanswer) {
		alert("richtig")
		questionlevel.questionsarr.splice(randomnumber, 1)
		questionnum++
		playerpoints++
		gamecall()


	} else {
		alert("falsch die richtige Antwort wäre:" + rightanswer)
		questionlevel.questionsarr.splice(randomnumber, 1)
		questionnum++
		gamecall()
	}
}

// Submit Button End


// Add own Question start
let addownquestionbutton = document.getElementById("addQuestion")
addownquestionbutton.addEventListener("click", addownquestion)

function addownquestion() {

	let questionobjadd = prompt("Bitte Frage eingeben")
	let questionobjanswer1 = prompt("Bitte Antwort1 eingeben")
	let questionobjanswer2 = prompt("Bitte Antwort2 eingeben")
	let questionobjanswer3 = prompt("Bitte Antwort3 eingeben")
	let questionobjanswer4 = prompt("Bitte Antwort4 eingeben")
	let questionobjrightanswer = prompt("Bitte Nummer der richtigen Antwort eingeben")

	questionobjrightanswer = parseInt(questionobjrightanswer)

	questionobj = {
		question: questionobjadd,
		rightanswer: questionobjrightanswer,
		answer1: questionobjanswer1,
		answer2: questionobjanswer2,
		answer3: questionobjanswer3,
		answer4: questionobjanswer4,
	}
	questionlv1.questionsarr.push(questionobj)
}
// Add own Question end
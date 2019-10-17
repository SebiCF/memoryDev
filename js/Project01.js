/*jshint esversion: 6 */
let images = ['img/black-hole-banner.jpg', 'img/milky-way-banner.jpg', 'img/planet-banner.jpg'];
let team = [{
	"firstName": "Steven",
	"lastName": "Markhardt",
	"memberImg": "./img/Steven.jpg",
	"memberPos": "Teamlead / Developer"
}, {
	"firstName": "Sebastian",
	"lastName": "Malcher",
	"memberImg": "./img/Sebi.jpg",
	"memberPos": "Developer / Designer"
}, {
	"firstName": "Markus",
	"lastName": "Kasper",
	"memberImg": "./img/Markus.jpg",
	"memberPos": "Developer / Designer"
}, {
	"firstName": "Consuelo",
	"lastName": "Mahrer",
	"memberImg": "./img/default_member.jpg",
	"memberPos": "Developer in Spirit"
}, ];
let memberdiv = document.getElementById("teamSection");
let joindiv = document.getElementById("joinBtn");
let forcemq = document.getElementById("mediaswitch");
let clickcheck = "";
let i = 1;
let p = 0;
let interval;
startSlideShow();

/* Begin - Slideshow Code */

function startSlideShow() {
	interval = setInterval(nextPhoto, 4000);

}

function nextPhoto() {
	i++;
	if (i > (images.length - 1)) {
		i = 0;
	}
	if (i == 0) {
		document.querySelector(".image-holder").style.left = "0px";
	}
	if (i == 1) {
		document.querySelector(".image-holder").style.left = "-100vw";
	}
	if (i == 2) {
		document.querySelector(".image-holder").style.left = "-200vw";
	}
	stopSlideShow();

}

function previousPhoto() {
	if (i == 0) {

		i = images.length - 1;
	} else {

		i--;
	}
	if (i == 0) {
		document.querySelector(".image-holder").style.left = "0px";
	}
	if (i == 1) {
		document.querySelector(".image-holder").style.left = "-100vw";
	}
	if (i == 2) {
		document.querySelector(".image-holder").style.left = "-200vw";
	}
	document.getElementById('s_image').src = images[i];
	stopSlideShow();
}

function stopSlideShow() {
	clearInterval(interval);
	interval = setInterval(nextPhoto, 4000);
}

/* End - Slideshow Code */

/* Begin - Generate General Team Boxes */

for (; p < team.length; p++) {
	members = document.createElement('div');
	members.setAttribute('class', 'teamMember');
	members.id = `${p}`;
	members.innerHTML = `<a href="${team[p].firstName}.html"><h3>${team[p].firstName} ${team[p].lastName}</h3></a><img src="${team[p].memberImg}" id="${p}"><p>${team[p].memberPos}</p>`;
	memberdiv.appendChild(members);
}

/* End - Generate General Team Boxes */

/* Begin - Event Listener for adding to Landing Page Team  */

joindiv.addEventListener('click', function (e) {
	let click = e.target.id;
	if (click == "joinBtn" && clickcheck == "joinBtn") {
		click = "";
		clickcheck = "";
		joining.innerHTML = "";
	}
	if (click == "joinBtn") {
		click = "";
		clickcheck = "joinBtn";
		joining = document.createElement('div');
		joining.id = 'joininput';
		joining.innerHTML = `<label for="fname">First Name:</label><input type="text" id="fname" name="fname"><br><label for="fname">Last Name:</label><input type="text" id="lname" name="lname"><br><label for="pos">Choose your Position:</label><select id="pos"><option value="Honorary Developer">Honorary Developer<option value="Honorary Designer">Honorary Designer<option value="Honorary Influencer">Honorary Influencer</select><br><input type="submit" id="submit" value="Submit">`;
		joindiv.appendChild(joining);
	}
	if (click == "submit") {
		p = 0;
		let firstn = document.getElementById("fname").value;
		let lastn = document.getElementById("lname").value;
		let memimg = "./img/default_member.jpg";
		let teampos = document.getElementById("pos").value;
		let newmem = {
			"firstName": `${firstn}`,
			"lastName": `${lastn}`,
			"memberImg": `${memimg}`,
			"memberPos": `${teampos}`
		};
		team.push(newmem);
		memberdiv.innerHTML = `<input type="button" id="remove" value="Remove Team Member">`;
		for (; p < team.length; p++) {
			members = document.createElement('div');
			members.setAttribute('class', 'teamMember');
			members.id = `${p}`;
			members.innerHTML = `<h3>${team[p].firstName} ${team[p].lastName}</h3><img src="${team[p].memberImg}" id="${p}"><p>${team[p].memberPos}</p>`;
			memberdiv.appendChild(members);
		}
	}
});

/* End - Event Listener for adding to Landing Page Team  */

/* Begin - Event Listener for removing from Landing Page Team  */


memberdiv.addEventListener('click', function (e) {
	let click = e.target.id;
	click1 = parseFloat(e.target.id);
	if (click == "remove") {
		click = "";
		alert("Choose the member to be removed from the team.");
		memberdiv.addEventListener('click', function (e) {
			if (click1 == 0 || team.length == 1) {
				alert("Member can't be removed.");
			}
			else if (isNaN(click1) == false) {
				delete team[click1];
				let tempteam = team.filter(function (el) {
					return el != null;
				});
				team = tempteam;
				tempteam = 0;
				p = 0;
				memberdiv.innerHTML = `<input type="button" id="remove" value="Remove Team Member">`;
				for (; p < team.length; p++) {
					members = document.createElement('div');
					members.setAttribute('class', 'teamMember');
					members.id = `${p}`;
					members.innerHTML = `<h3>${team[p].firstName} ${team[p].lastName}</h3><img src="${team[p].memberImg}" id="${p}"><p>${team[p].memberPos}</p>`;
					memberdiv.appendChild(members);
				}
				console.log(team);
			}
		});
	}
});

/* End - Event Listener for removing from Landing Page Team  */


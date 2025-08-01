//ЕСЛИ НАДО ОЧИСТИТЬ СОХРАНЕНИЕ
//localStorage.clear();
//объявление переменных для кода
let score = localStorage.getItem("score")
	? Number(localStorage.getItem("score"))
	: 0;

let countClick = 1;
let energy = localStorage.getItem("energy")
	? Number(localStorage.getItem("energy"))
	: 500;
let fullEnergy = localStorage.getItem("fullEnergy")
	? Number(localStorage.getItem("fullEnergy"))
	: 500;
let percentEnergy;

let priceLvlEnergy = localStorage.getItem("priceLvlEnergy")
	? Number(localStorage.getItem("priceLvlEnergy"))
	: 300;
let lvlEnergy = localStorage.getItem("lvlEnergy")
	? Number(localStorage.getItem("lvlEnergy"))
	: 0;
let countEnergy = localStorage.getItem("countEnergy")
	? Number(localStorage.getItem("countEnergy"))
	: 100;
let scoreInHour = localStorage.getItem("scoreInHour")
	? Number(localStorage.getItem("scoreInHour"))
	: 0;

let countRestart = 0;
let today = new Date().toDateString();
let saveDateGame = localStorage.getItem("countRestartDate");
if (today !== saveDateGame) {
	countRestart = 0;
	localStorage.setItem("countRestart", countRestart);
	localStorage.setItem("countRestartDate", today);
} else {
	countRestart = Number(localStorage.getItem("countRestart"));
}

//ПЕРЕМЕННЫЕ ДЛЯ ОТОБРАЖЕНИЯ НА СТРАНИЦЕ HTML
let scoreHTMl = document.getElementById("score");
let energyHTML = document.getElementById("energyText");
let energyFillHTML = document.getElementById("energyFill");

let priceLvlEnergyHTML = document.getElementById("priceLvlEnergy");
let lvlEnergyHTML = document.querySelectorAll(".lvlFullEnergy");
let countEnergyHTML = document.getElementById("countEnergy");

let countRestartHTML = document.querySelectorAll(".lvlRestart");

let scoreInHourHTML = document.getElementById("scoreInHour");

//СТРУКТУРА ДАННЫХ ДЛЯ КАРТОЧЕК ПАССИВНОГО ДОХОДА

let cardsData = {
	1: {
		img: "molecule.png",
		title: "Какой-то буст",
		level: 0,
		bonus: 100,
		price: 100,
		coef: 3.78,
	},
	2: {
		img: "molecule.png",
		title: "Какой-то буст",
		level: 0,
		bonus: 100,
		price: 100,
		coef: 3.78,
	},
	3: {
		img: "molecule.png",
		title: "Какой-то буст",
		level: 0,
		bonus: 100,
		price: 100,
		coef: 3.78,
	},
	4: {
		img: "molecule.png",
		title: "Какой-то буст",
		level: 0,
		bonus: 100,
		price: 100,
		coef: 3.78,
	},
	5: {
		img: "molecule.png",
		title: "Какой-то буст",
		level: 0,
		bonus: 100,
		price: 100,
		coef: 3.8,
	},
};

let cardPassive = document.querySelectorAll(".cardPassive");
//ПРИ ЗАГРУЗКЕ ВОССТАНАВЛИВАЕМ УРОВНИ ПАССИВНОГО ДОХОДА
Object.keys(cardsData).forEach(id => {
	let savedCard = JSON.parse(localStorage.getItem(`card${id}`));
	if (savedCard) {
		cardsData[id] = savedCard;
	}
});

cardPassive.forEach(card => {
	let id = card.getAttribute("data-id");
	let data = cardsData[id];
	if (data) {
		card.innerHTML = `
		<div class="imageCard" 
				style="background-image: url('${data.img}'); background-size: cover;" >
			<p>ур. <span id="lvl${id}">${data.level}</span></p>
		</div>
		<p class="textCard">${data.title}</p>;`;
	}
});

let dialog = document.getElementById("screenPassive");
cardPassive.forEach(card => {
	let tochStartX = 0;
	let tochEndX = 0;
	card.addEventListener("touchstart", event => {
		tochStartX = event.changedTouches[0].screenX;
	});
	card.addEventListener("touchend", event => {
		tochEndX = event.changedTouches[0].screenX;
		if (Math.abs(tochStartX - tochEndX) < 10) {
			let id = card.getAttribute("data-id");
			let data = cardsData[id];
			if (data) {
				dialog.innerHTML = `
				<form method="dialog">
					<button class="closeButton">❌</button>
					<img class="imgDialog" src="${data.img}" />
					<h2>${data.title}</h2>
					<div class="textContainer">
						<p>ур.<span class="lvlPassive">${data.level}</span></p>
						<img src="coffe.png" />
						<p>+<span class="bonusPassive">${data.bonus}</span> в час</p>
					</div>
					<button class="pay payPassiveCard">
						<p>Купить за <span class="pricePassive">${data.price}</span></p>
					</button>
				</form>`;
				if (score < data.price) {
					dialog.querySelector(".payPassiveCard").style.background = "grey";
				}
				dialog.showModal();
				dialog
					.querySelector(".payPassiveCard")
					.addEventListener("touchstart", event => {
						payPassiveCard(id, data);
					});
			}
		}
	});
});
function payPassiveCard(id, data) {
	if (score >= data.price) {
		score -= data.price;
		data.level++;
		scoreInHour += data.bonus;
		data.price = Math.round(data.price * data.coef);
		data.bonus = Math.round((data.bonus * data.coef) / 1.5);

		localStorage.setItem(`card${id}`, JSON.stringify(data));
		document.getElementById(`lvl${id}`).innerText = data.level;
		saveData();
		dataScreen();
	}
}

let obj = document.getElementById("objectPanel");
if (obj) {
	obj.addEventListener("touchstart", clicker);
}
let obj2 = document.getElementById("clickFullEnergy");
let obj2Pay = document.getElementById("payLvlEnergy");
if (obj2) {
	obj2.addEventListener("touchstart", function () {
		if (score < priceLvlEnergy) {
			document.getElementById("payLvlEnergy").style.background = "grey";
		}
		document.getElementById("screenLvlEnergy").showModal();
	});
	obj2Pay.addEventListener("touchstart", payLvlEnergy);
}
let obj3 = document.getElementById("clickRestart");
let obj3Pay = document.getElementById("payLvlRestart");
if (obj3) {
	obj3.addEventListener("touchstart", function () {
		document.getElementById("screenRestart").showModal();
	});
	obj3Pay.addEventListener("touchstart", payRestart);
}

//ФУНКЦИЯ ВОССТАНОВЛЕНИЯ ЭНЕРГИИ

function payRestart() {
	if (countRestart < 6) {
		energy = fullEnergy;
		countRestart++;
		saveData();
		dataScreen2();
	}
}

//ФУНКЦИЯ ПОКУПКИ УРОВНЯ ЗАПАСА ЭНЕРГИИ

function payLvlEnergy() {
	if (score >= priceLvlEnergy) {
		score -= priceLvlEnergy;
		lvlEnergy++;
		fullEnergy += countEnergy;
		priceLvlEnergy = Math.round(priceLvlEnergy * 3.25);
		countEnergy += 50;
		saveData();
		dataScreen2();
	}
}
//ФУНКЦИЯ НА СОХРАНЕНИЕ ДАННЫХ В ЛОКАЛЬНОМ ХРАНИЛИЩЕ
function saveData() {
	localStorage.setItem("score", score);
	localStorage.setItem("scoreInHour", scoreInHour);
	localStorage.setItem("energy", energy);
	localStorage.setItem("fullEnergy", fullEnergy);

	localStorage.setItem("lvlEnergy", lvlEnergy);
	localStorage.setItem("priceLvlEnergy", priceLvlEnergy);
	localStorage.setItem("countEnergy", countEnergy);

	localStorage.setItem("countRestart", countRestart);
	localStorage.setItem("countRestartDate", today);
}

//ФУНКЦИЯ НА ЗАГРУЗКУ ДАННЫХ HTML СТРАНИЦЕ играть
function dataScreen() {
	scoreHTMl.innerText = Math.round(score);
	energyHTML.innerText = energy;
	fillEnergy();
	scoreInHourHTML.innerText = scoreInHour;
}
//ФУНКЦИЯ НА ЗАГРУЗКУ ДАННЫХ HTML СТРАНИЦЕ доход
function dataScreen2() {
	dataScreen();
	lvlEnergyHTML.forEach(element => {
		element.innerText = lvlEnergy;
	});
	priceLvlEnergyHTML.innerText = priceLvlEnergy;
	countEnergyHTML.innerText = countEnergy;

	countRestartHTML.forEach(element => {
		element.innerText = countRestart;
	});
}

//ПРОВЕРКА СТРАНИЦЫ ЗАПУСКА
let path = window.location.pathname;
if (path.includes("index.html")) dataScreen();
else if (path.includes("earnings.html")) dataScreen2();
function clicker(event) {
	if (energy >= countClick) {
		score += countClick;
		energy -= countClick;
		scoreHTMl.innerText = Math.round(score);
		energyHTML.innerText = energy;
		fillEnergy();
		let img = event.currentTarget.querySelector("#objectImg");
		img.style.transform = "scale(0.9)";
		setTimeout(() => {
			img.style.transform = "";
		}, 200);
		const plus = document.createElement("div");
		plus.className = "plus";
		plus.innerText = "+" + countClick;
		const panel = event.currentTarget;
		const rect = panel.getBoundingClientRect();
		plus.style.left = `${event.clientX - rect.left}px`;
		plus.style.top = `${event.clientY - rect.top}px`;
		panel.appendChild(plus);
		setTimeout(() => {
			plus.remove();
		}, 2200);

		saveData();
	}
}

function fillEnergy() {
	percentEnergy = (energy * 100) / fullEnergy;
	energyFillHTML.style.width = percentEnergy + "%";
}

//ФУНКЦИЯ ВОССТАНОВЛЕНИЯ ЭНЕРГИИ
function regenerateEnergy() {
	if (energy < fullEnergy) {
		energy++;
		energyHTML.innerText = energy;
		fillEnergy();
	}
	score += score / 3600;
	scoreHTMl.innerText = Math.round(score);
	saveData();
}
setInterval(regenerateEnergy, 1000);

//Вызывается при покидании страницы
window.addEventListener("beforeunload", () => {
	localStorage.setItem("LastVisit", Date.now());
});

//Вызывается при загрузке страницы
window.addEventListener("load", () => {
	let LastVisit = localStorage.getItem("lastVisit");
	let nowVisit = Date.now();
	if (nowVisit - LastVisit > 30 * 1000 && LastVisit) {
		let hoursAway = (nowVisit - parseInt(LastVisit)) / (1000 * 60 * 60);
		if (hoursAway > 3) hoursAway = 3;

		//Начисление орешков
		let offLineScore = Math.round(hoursAway * scoreInHour);
		score += offLineScore;
		scoreHTMl.innerText = Math.round(score);

		//Начисление энергии
		let offLineEnergy = Math.round(hoursAway * 3600);
		energy = Math.min(energy + offLineEnergy, fullEnergy);
		energyHTML.innerText = energy;

		alert(`За ваше отсутствие заработано${offlineScore} орешков`);
	}
});

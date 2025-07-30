//ЕСЛИ НАДО ОЧИСТИТЬ СОХРАНЕНИЕ
//localStorage.clear();
//объявление переменных для кода
let score = localStorage.getItem("score")
	? Number(localStorage.getItem("score"))
	: 0;

let countClick = 20;
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
	scoreHTMl.innerText = score;
	energyHTML.innerText = energy;
	fillEnergy();
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
		scoreHTMl.innerText = score;
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
		saveData();
	}
}
setInterval(regenerateEnergy, 1000);

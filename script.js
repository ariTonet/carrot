//объявление переменных для кода
let score = 0;
let countClick = 1;
let energy = 500;
let fullEnergy = 500;

//ПЕРЕМЕННЫЕ ДЛЯ ОТОБРАЖЕНИЯ НА СТРАНИЦЕ HTML
let scoreHTMl = document.getElementById("score");
let energyHTML = document.getElementById("energyText");
let energyFillHTML = document.getElementById("energyFill");

let obj = document.getElementById("objectPanel");
obj.addEventListener("touchstart", clicker);

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
}
setInterval(regenerateEnergy, 1000);

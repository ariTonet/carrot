//объявление переменных для кода
let score = 0;
let countClick = 1;
let energy = 500;

//ПЕРЕМЕННЫЕ ДЛЯ ОТОБРАЖЕНИЯ НА СТРАНИЦЕ HTML
let scoreHTMl = document.getElementById("score");
let energyHTML = document.getElementById("energyText");

let obj = document.getElementById("objectPanel");
obj.addEventListener("touchstart", clicker);

function clicker(event) {
	if (energy >= countClick) {
		score += countClick;
		energy -= countClick;
		scoreHTMl.innerText = score;
		energyHTML.innerText = energy;

		let img = event.currentTarget.querySelector("#objectImg");
		img.style.transform = "scale(0.9)";
		setTimeout(() => {
			img.style.transform = "";
		}, 200);
		const plus = document.createElement("div");
		plus.className = "plus";
		plus.innerText = "+" + countClick;
		const panel = event.currentTarget;
		const rect = panel.getBoudingClientRect();
		rect.style.left = `${event.clientX - rect.left}px`;
		rect.style.top = `${event.clientY - rect.top}px`;
		panel.appendChild(plus);
	}
}

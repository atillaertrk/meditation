const bowl = document.querySelector(".bowl");
const bamboo = document.querySelector(".bamboo");
const wind = document.querySelector(".wind");
const snow = document.querySelector(".snow");
const fire = document.querySelector(".fire");
const rain = document.querySelector(".rain");
const timeArea = document.querySelector("#timeArea");
const timeButton = document.querySelector(".timebutton");
const playingSection = document.querySelector(".playingSection");
const soundsGrid = document.querySelector(".soundsGrid");
const bowlRange = document.querySelector(".bowlRange");
const bambooRange = document.querySelector(".bambooRange");
const windRange = document.querySelector(".windRange");
const snowRange = document.querySelector(".snowRange");
const fireRange = document.querySelector(".fireRange");
const rainRange = document.querySelector(".rainRange");

var bowlSound = new Audio("/sound/bowl.mp3");
bowlSound.id = "bowlSound";
var bambooSound = new Audio("/sound/bamboo.mp3");
bambooSound.id = "bambooSound";
var windSound = new Audio("/sound/wind.mp3");
windSound.id = "windSound";
var snowSound = new Audio("/sound/snow.mp3");
snowSound.id = "snowSound";
var fireSound = new Audio("/sound/fire.mp3");
fireSound.id = "fireSound";
var rainSound = new Audio("/sound/rain.mp3");
rainSound.id = "rainSound";

var sections = [
  { bowl, bowlSound, bowlRange },
  { bamboo, bambooSound, bambooRange },
  { wind, windSound, windRange },
  { snow, snowSound, snowRange },
  { fire, fireSound, fireRange },
  { rain, rainSound, rainRange },
];

async function playSound(sound) {
  await fetch(sound.src);
  await sound.play();
  sound.loop = true;
  var playImg = `<div class="playingElement" id="${sound.id}">
  <img src="/img/${sound.id}.svg" />
</div>`;
  playingSection.insertAdjacentHTML("beforeend", playImg);
}
function stopSound(sound) {
  sound.pause();

  document
    .querySelector(`#${sound.id}`)
    .parentElement.removeChild(document.querySelector(`#${sound.id}`));
}
for (let i in sections) {
  Object.values(sections[i])[0].addEventListener("click", () => {
    Object.values(sections[i])[1].volume =
      parseInt(Object.values(sections[i])[2].value) / 100;
    if (Object.values(sections[i])[0].classList.contains("playing")) {
      stopSound(Object.values(sections[i])[1]);
      Object.values(sections[i])[0].nextElementSibling.disabled = true;
      Object.values(sections[i])[0].classList.remove("playing");
      Object.values(sections[i])[0].classList.add("pause");
    } else if (Object.values(sections[i])[0].classList.contains("pause")) {
      Object.values(sections[i])[0].nextElementSibling.disabled = false;
      playSound(Object.values(sections[i])[1]);
      Object.values(sections[i])[0].classList.remove("pause");
      Object.values(sections[i])[0].classList.add("playing");
    }
  });
}
let timeButtonCount = 0;
let sec = 59;
let inputValue = parseInt(document.querySelector("#timeSelect").value) - 1;
timeButton.addEventListener("click", function () {
  timeButtonCount++;
  timeArea.innerHTML = `<span id="min">${inputValue}</span> : <span id="sec">${sec}</span>`;
  if (timeButtonCount % 2 == 1) {
    timeButton.innerText = "Restart";
    inputValue = parseInt(document.querySelector("#timeSelect").value) - 1;
    timing = setInterval(function () {
      sec--;
      if (sec < 10) {
        sec = (sec < 10 ? "0" : "") + sec;
      }

      if (sec >= 0) {
        timeArea.innerHTML = `<span id="min">${inputValue}</span> : <span id="sec">${sec}</span>`;
      }
      if (inputValue != 0 && sec == 0) {
        inputValue--;
        sec = 59;

        timeArea.innerHTML = `<span id="min">${inputValue}</span> : <span id="sec">${sec}</span>`;
      }
      if (inputValue == 0 && sec == 0) {
        clearInterval(timing);
        timeArea.innerHTML = `Time Over`;
        inputValue = parseInt(document.querySelector("#timeSelect").value) - 1;
        sec = 59;
        for (let i in sections) {
          if (Object.values(sections[i])[1].paused == false) {
            stopSound(Object.values(sections[i])[1]);
            for (let x = 0; x < soundsGrid.children.length; x++) {
              if (
                soundsGrid.children[x].children[0].classList.contains(
                  "playing"
                ) == true
              ) {
                soundsGrid.children[x].children[0].classList.remove("playing");
                soundsGrid.children[x].children[0].classList.add("pause");
              }
            }
          }
        }
      }
    }, 1000);
  } else if (timeButtonCount % 2 == 0) {
    clearInterval(timing);
    timeButton.innerText = "Start";
    inputValue = parseInt(document.querySelector("#timeSelect").value) - 1;
    sec = 59;
  }
});
for (let i in sections) {
  Object.values(sections[i])[2].addEventListener("input", () => {
    Object.values(sections[i])[1].volume =
      parseInt(Object.values(sections[i])[2].value) / 100;
  });
}

snowRange.addEventListener("input", () => {
  snowSound.volume = parseInt(snowRange.value) / 100;
});

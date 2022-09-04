const bowl = document.querySelector(".bowl");
const bamboo = document.querySelector(".bamboo");
const wind = document.querySelector(".wind");
const playingSection = document.querySelector(".playingSection");

var bowlSound = new Audio("/sound/bowl.mp3");
bowlSound.id = "bowlSound";
var bambooSound = new Audio("/sound/bamboo.mp3");
bambooSound.id = "bambooSound";
var windSound = new Audio("/sound/wind.mp3");
windSound.id = "windSound";

async function playSound(sound) {
  await fetch(sound.src);
  await sound.play();
  var playImg = `<div class="playingElement" id="${sound.id}">
  <img src="/img/${sound.id}.svg" />
</div>`;
  playingSection.insertAdjacentHTML("beforeend", playImg);
  //   delElement();
}
function stopSound(sound) {
  sound.pause();

  document
    .querySelector(`#${sound.id}`)
    .parentElement.removeChild(document.querySelector(`#${sound.id}`));
}
bowl.addEventListener("click", () => {
  if (bowl.classList.contains("playing")) {
    stopSound(bowlSound);
    bowl.classList.remove("playing");
    bowl.classList.add("pause");
  } else if (bowl.classList.contains("pause")) {
    playSound(bowlSound);
    bowl.classList.remove("pause");
    bowl.classList.add("playing");
  }
});
bamboo.addEventListener("click", () => {
  if (bamboo.classList.contains("playing")) {
    stopSound(bambooSound);
    bamboo.classList.remove("playing");
    bamboo.classList.add("pause");
  } else if (bamboo.classList.contains("pause")) {
    playSound(bambooSound);
    bamboo.classList.remove("pause");
    bamboo.classList.add("playing");
  }
});

wind.addEventListener("click", () => {
  if (wind.classList.contains("playing")) {
    stopSound(windSound);
    wind.classList.remove("playing");
    wind.classList.add("pause");
  } else if (wind.classList.contains("pause")) {
    playSound(windSound);
    wind.classList.remove("pause");
    wind.classList.add("playing");
  }
});

// function delElement() {
//   playingSection.forEach((element) => {
//     element.addEventListener("click", (element) => {
//       element.parentElement.removeChild(element);
//     });
//   });
// }

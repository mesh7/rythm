import Timer from "./timer.js";

const tempoDisplay = document.querySelector(".bpm-display-tempo");
const tempoText = document.querySelector(".tempo-text");
const tempoDecrease = document.querySelector(".tempo-decrease");
const tempoSlider = document.querySelector(".slider");
const tempoIncrease = document.querySelector(".tempo-increase");
const metronomeButton = document.querySelector(".metronome-button");
const bpmDecrease = document.querySelector(".bpm-decrease");
const bpmIncrease = document.querySelector(".bpm-increase");
const bpmValue = document.querySelector(".bpm-value");
const metronomeArm = document.querySelector(".metronome-arm");

const clickOne = new Audio("./audio/beat1.mp3");
const clickTwo = new Audio("./audio/beat2.mp3");

let bpm = 140;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;
let tempoTextString = "Medium";

tempoDecrease.addEventListener("click", () => {
  if (bpm <= 20) {
    return;
  }
  bpm--;
  validateTempo();
  updateMetronome();
});

tempoIncrease.addEventListener("click", () => {
  if (bpm >= 280) {
    return;
  }
  bpm++;
  validateTempo();
  updateMetronome();
});

tempoSlider.addEventListener("input", () => {
  bpm = tempoSlider.value;
  validateTempo();
  updateMetronome();
});

bpmDecrease.addEventListener("click", () => {
  if (beatsPerMeasure <= 2) {
    return;
  }
  beatsPerMeasure--;
  bpmValue.textContent = beatsPerMeasure;
  count = 0;
});

bpmIncrease.addEventListener("click", () => {
  if (beatsPerMeasure >= 12) {
    return;
  }
  beatsPerMeasure++;
  bpmValue.textContent = beatsPerMeasure;
  count = 0;
});

function setText() {
  if (bpm <= 40) {
    tempoTextString = "Super Slow";
  } else if (bpm >= 40 && bpm < 80) {
    tempoTextString = "Slow";
  } else if (bpm >= 80 && bpm < 120) {
    tempoTextString = "Getting there";
  } else if (bpm >= 120 && bpm < 180) {
    tempoTextString = "Nice and Steady";
  } else if (bpm >= 180 && bpm < 220) {
    tempoTextString = "Rock n' Roll";
  } else if (bpm >= 220 && bpm < 240) {
    tempoTextString = "Funky!";
  } else {
    tempoTextString = "Ludwig van Beethoven";
  }

  tempoText.textContent = tempoTextString;
}

function validateTempo() {
  if (bpm <= 20) {
    return;
  }
  if (bpm >= 280) {
    return;
  }
}

metronomeButton.addEventListener("click", () => {
  count = 0;
  if (!isRunning) {
    metronome.start();
    isRunning = true;
    metronomeButton.textContent = "STOP";
    metronomeArm.classList.add("active");
  } else {
    metronome.stop();
    isRunning = false;
    metronomeButton.textContent = "START";
    metronomeArm.classList.remove("active");
  }
});

function playClick() {
  if (count === beatsPerMeasure) {
    count = 0;
  }
  if (count === 0) {
    clickOne.play();
    clickOne.currentTime = 0;
  } else {
    clickTwo.play();
    clickTwo.currentTime = 0;
  }
  count++;
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });

// Metronomer animation logic

function updateMetronome() {
  tempoDisplay.textContent = bpm;
  tempoSlider.value = bpm;
  metronome.timeInterval = 60000 / bpm;
  setText();

  // Calculate seconds per beat
  const secondsPerBeat = 60 / bpm;

  // Update the CSS variable
  metronomeArm.style.setProperty("--duration", `${secondsPerBeat}s`);
}

tempoSlider.addEventListener("input", updateMetronome);

// Initialize
updateMetronome();

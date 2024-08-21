// Analog Clock
let hr = document.querySelector("#hr");
let mn = document.querySelector("#mn");
let sc = document.querySelector("#sc");
let sound = new Audio(); // Audio object for sound playback
let selectSound = document.getElementById("selectsound");
let volumeSlider = document.querySelector(".glow");

// Function to handle sound selection
selectSound.addEventListener("change", (e) => {
  let selectedSound = e.target.value;

  // Set the src based on the selected sound
  switch (selectedSound) {
    case "sound1":
      sound.src = "assets/mixkit-bell-tick-tock-timer-1046.mp3";
      break;
    case "sound2":
      sound.src = "assets/mixkit-tick-tock-clock-timer-1045.mp3";
      break;
    case "sound3":
      sound.src = "assets/mixkit-tick-tock-clock-close-up-1059.mp3";
      break;
    case "sound4":
      sound.src = "assets/Slow-clock-ticking-sound-effect.mp3";
      break;
    default:
      sound.src = "";
  }

  if (sound.src) {
    sound.loop = true;
    sound.play();
  }
});

// Function to handle volume control
volumeSlider.addEventListener("input", (e) => {
  let volume = e.target.value / 100;
  sound.volume = volume;
});

// Rotate clock hands 180°
hr.style.transform = 'rotate(180deg)';
mn.style.transform = 'rotate(180deg)';
sc.style.transform = 'rotate(180deg)';

// Create minute markers
function createMarkers() {
  const clock = document.querySelector('.clock');
  const clockRadius = clock.offsetWidth / 2 + 2; // Dynamically calculate the radius

  // Clear any existing markers
  document.querySelectorAll('.marker').forEach(marker => marker.remove());

  for (let i = 0; i < 60; i++) {
    const marker = document.createElement('div');
    marker.classList.add('marker');

    // Rotate each marker around the center and then rotate it 90° to align correctly
    marker.style.transform = `rotate(${i * 6}deg) translate(${clockRadius + 10}px) rotate(90deg)`;

    // Style every 5th marker differently
    if (i % 5 === 0) {
      marker.style.height = `${clockRadius * 0.08}px`; // Taller marker
      marker.style.width = `${clockRadius * 0.015}px`; // Slightly wider marker
    } else {
      marker.style.height = `${clockRadius * 0.03}px`; // Shorter marker
      marker.style.width = `${clockRadius * 0.008}px`; // Narrower marker
    }

    clock.appendChild(marker);
  }
}

// Call the function initially and on window resize
createMarkers();
window.addEventListener('resize', createMarkers);

setInterval(() => {
  let day = new Date();
  let hh = day.getHours() * 30;
  let mm = day.getMinutes() * 6;
  let ss = day.getSeconds() * 6;

  hr.style.transform = `rotateZ(${hh + mm / 12 + 180}deg)`; // Adjust by 180° for initial rotation
  mn.style.transform = `rotateZ(${mm + 180}deg)`; // Adjust by 180° for initial rotation
  sc.style.transform = `rotateZ(${ss + 180}deg)`; // Adjust by 180° for initial rotation

  // Digital clock
  let h = day.getHours();
  let m = day.getMinutes();
  let s = day.getSeconds();

  let am = h >= 12 ? "PM" : "AM";

  // Convert 24hr clock to 12hr clock
  if (h > 12) {
    h = h - 12;
  }

  // Add zero before single digit number
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  hours.innerHTML = h;
  minutes.innerHTML = m;
  seconds.innerHTML = s;
  ampm.innerHTML = am;
});

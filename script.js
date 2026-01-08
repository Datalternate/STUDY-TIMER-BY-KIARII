let countdown;
const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - percent * circumference;
  circle.style.strokeDashoffset = offset;
}

function startTimer(minutes) {
  clearInterval(countdown);
  let time = minutes * 60;
  const total = time;

  countdown = setInterval(() => {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    document.getElementById("timer").textContent =
      `${min}:${sec < 10 ? '0'+sec : sec}`;

    setProgress((total - time) / total);
    time--;

    if (time < 0) {
      clearInterval(countdown);
      updateStreak();
    }
  }, 1000);
}

// 🔥 Streak Tracker
function updateStreak() {
  const today = new Date().toDateString();
  const lastDay = localStorage.getItem("lastDay");
  let streak = parseInt(localStorage.getItem("streak")) || 0;

  if (lastDay !== today) {
    if (new Date(today) - new Date(lastDay) === 86400000) {
      streak++;
    } else {
      streak = 1;
    }
    localStorage.setItem("lastDay", today);
    localStorage.setItem("streak", streak);
  }

  document.getElementById("streak").textContent = `🔥 Streak: ${streak} days`;
}

// Initialize streak display
updateStreak();

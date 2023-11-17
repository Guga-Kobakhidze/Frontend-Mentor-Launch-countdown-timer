const timers = document.querySelectorAll(".timer");

timers.forEach((element) => {
  flip(element);
});

const countDate = new Date();
countDate.setDate(countDate.getDate() + 8); // Add 24 days
countDate.setHours(countDate.getHours() + 24); // Add 24 hours
let previousTimeBetweenDates;

updateCountdown();

setInterval(updateCountdown, 250);

function updateCountdown() {
  const currentDate = new Date();
  const timeBetweenDates = Math.ceil((countDate - currentDate) / 1000);

  previousTimeBetweenDates = timeBetweenDates;
  flipAllCards(timeBetweenDates);
}

function flipAllCards(time) {
  const days = Math.floor(time / (3600 * 24));
  const hours = Math.floor((time % (3600 * 24)) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  flip(document.querySelector("[data-day]"), days);
  flip(document.querySelector("[data-hour]"), hours);
  flip(document.querySelector("[data-minute]"), minutes);
  flip(document.querySelector("[data-second]"), seconds);
}

function flip(timer, newNum) {
  const topHalf = timer.querySelector(".top");
  const bottomHalf = timer.querySelector(".bottom");

  const startNum = Number(topHalf.textContent);

  if (newNum === startNum) return;

  const formatStartNum = startNum < 10 ? `0${startNum}` : startNum;
  const formatNum = newNum < 10 ? `0${newNum}` : newNum;

  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");

  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bottom-flip");

  topHalf.textContent = formatStartNum;
  bottomHalf.textContent = formatStartNum;

  topFlip.textContent = formatStartNum;
  bottomFlip.textContent = formatNum;

  topFlip.addEventListener("animationstart", (e) => {
    topHalf.textContent = formatNum;
  });

  topFlip.addEventListener("animationend", (e) => {
    topFlip.remove();
  });

  bottomFlip.addEventListener("animationend", (e) => {
    bottomHalf.textContent = formatNum;
    bottomFlip.remove();
  });

  timer.append(topFlip, bottomFlip);
}

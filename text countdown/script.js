const scrambleText = document.getElementById("scrambleText");
const originalText = scrambleText.textContent.toLowerCase();
scrambleText.innerHTML = "";

// Split each character into a span
[...originalText].forEach(char => {
  const span = document.createElement("span");
  span.className = "char";
  span.textContent = char;
  scrambleText.appendChild(span);
});

const chars = "0123456789abcdefghijklmnopqrstuvwxyz";

function getRandomChar(limitIndex) {
  return chars[Math.floor(Math.random() * (limitIndex + 1))];
}

function animateChar(span, targetChar) {
  const index = chars.indexOf(targetChar);
  const totalSteps = 20;
  const delay = 0.02;

  let step = 0;
  const interval = setInterval(() => {
    if (step >= totalSteps) {
      span.textContent = targetChar;
      clearInterval(interval);
      return;
    }
    span.textContent = getRandomChar(index);
    step++;
  }, delay * 1000); // convert to ms
}

scrambleText.addEventListener("mouseenter", () => {
  const spans = document.querySelectorAll(".char");
  spans.forEach((span, i) => {
    animateChar(span, originalText[i]);
  });
});

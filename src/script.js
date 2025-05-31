let isRGB = false;
const colorHistory = [];

function ChangeColor() {
  let color;

  if (isRGB) {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    color = `rgb(${r}, ${g}, ${b})`;
  } else {
    color =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
  }

  document.body.style.backgroundColor = color;
  document.getElementById("colorCode").textContent = color;
  document.getElementById("colorCode").style.color = color;

  addToHistory(color);
}

function toggleColorMode() {
  isRGB = !isRGB;
  let button = document.querySelectorAll("button")[1];
  button.textContent = isRGB ? "Switch to HEX" : "Switch to RGB";
}

function addToHistory(color) {
  const history = document.getElementById("history");

  if (colorHistory.length === 5) {
    colorHistory.pop();
  }

  colorHistory.unshift(color);
  history.innerHTML = "";

  colorHistory.forEach((c) => {
    const colorBox = document.createElement("span");
    colorBox.textContent = c;
    colorBox.style.backgroundColor = c;
    colorBox.className = "history-color";
    colorBox.title = "Click to apply";

    colorBox.onclick = () => reapplyColor(c);

    history.appendChild(colorBox);
  });
}

function copyColor() {
  const colorText = document.getElementById("colorCode").textContent;

  navigator.clipboard
    .writeText(colorText)
    .then(() => {
      alert(`Color Copied: ${colorText}`);
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
    });
}

function reapplyColor(color) {
  document.body.style.backgroundColor = color;
  const colorDisplay = document.getElementById("colorCode");
  colorDisplay.textContent = color;
  colorDisplay.style.color = color;
}

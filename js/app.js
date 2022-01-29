import Color from "./mode.js";
import Sketch from "./sketch.js";

const grid = document.querySelector(".grid-area");
const sliderLabel = document.querySelector(".grid-slider__label");
const sliderInput = document.querySelector(".grid-slider__input");
const colorInput = document.querySelector(".settings__color-picker");
const colorBtn = document.querySelector(".settings__color-mode");
const rainbowBtn = document.querySelector(".settings__rainbow-mode");
const eraserBtn = document.querySelector(".settings__eraser-mode");
const clearBtn = document.querySelector(".settings__clear")
const modeBtns = document.querySelectorAll(".btn--mode");

sliderLabel.textContent = `${sliderInput.value} x ${sliderInput.value}`
const sketch = new Sketch(grid, colorInput.value);

function changeGridSize(size) {
  sketch.removeGrid();
  sketch.createGrid(size)
}
function changeColor(color) {
  sketch.setColor(color)
}
function toggleActiveButton() {
  modeBtns.forEach(btn => {
    btn.addEventListener("click", (event) => {
      modeBtns.forEach(inactiveBtn => {
        inactiveBtn.classList.remove("btn--active");
      });
      event.target.classList.toggle("btn--active");
    });
  });
}
window.onload = () => {
  sketch.createGrid(sliderInput.value)
}
sliderInput.oninput = (event) => { sliderLabel.textContent = `${event.target.value} x ${event.target.value}`; };
sliderInput.onchange = (event) => changeGridSize(event.target.value); 
colorInput.onchange = (event) => changeColor(event.target.value)
colorBtn.onclick = () => sketch.paint();
rainbowBtn.onclick = () => sketch.random();
eraserBtn.onclick = () => sketch.erase();
clearBtn.onclick = () => sketch.clearGrid();
toggleActiveButton();

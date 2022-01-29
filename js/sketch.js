import Color from "./mode.js";
export default class Sketch {
    #grid;
    #defaultSize;
    #currentMode;
    #currentColor;
    #penActive;
    constructor(grid, currentColor) {
        this.#grid = grid;
        this.#defaultSize = 16
        this.#penActive = false;
        this.#currentMode = Color.input(currentColor);
        this.#currentColor = currentColor;

    }
    createGrid = (size = this.#defaultSize) => {
      this.#grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
      this.#grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
      const area = size * size;
      this.#grid.addEventListener("click", this.#togglePenHandler);
      for(let index = 0; index < area; index++) {
        const gridCell = document.createElement("div");
        this.#grid.appendChild(gridCell);
      }
    }
    clearGrid = () => {
      if(this.#grid.childNodes.length <= 0) { return; }
      this.#grid.childNodes.forEach(child => {
        child.style.backgroundColor = Color.eraser().color;
      });
    }
    removeGrid = () => {
      while(this.#grid.firstChild) {
        this.#grid.removeChild(this.#grid.firstChild);
      }
      this.#penActive = false;
    }
    erase = () => this.#currentMode = Color.eraser();
    paint = () => this.#currentMode = Color.input(this.#currentColor);
    random = () => this.#currentMode = Color.random();
    setColor = newColor => this.#currentColor = newColor;
    
    #togglePenHandler = () => {
      this.#penActive = !this.#penActive
      if(this.#penActive) {
        this.#grid.childNodes.forEach(child => {
          child.addEventListener("mouseenter", this.#paintGrid);
          child.addEventListener("mouseleave", this.#paintGrid);
        });
      } else {
        this.#grid.childNodes.forEach(child => {
          child.removeEventListener("mouseenter", this.#paintGrid);
          child.removeEventListener("mouseleave", this.#paintGrid);
        });
      }
    }
    #paintGrid = (event) => {
      switch (this.#currentMode.type) {
        case Color.input(this.#currentColor).type:
          event.target.style.backgroundColor = Color.input(this.#currentColor).color;
          break;
        case Color.eraser().type:
          event.target.style.backgroundColor = Color.eraser().color;
          break;
        case Color.random().type:
          event.target.style.backgroundColor = Color.random().color; 
      }

    }
}
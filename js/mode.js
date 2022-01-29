class Mode {
    #string;
    constructor(string) {
        this.#string = string;
    }
    static colorInput = new Mode("color").#string;
    static rainbow = new Mode("rainbow").#string;
    static eraser = new Mode("eraser").#string; 
}
export default class Color {
    #mode;
    #color;
    constructor(mode, color) {
        this.#mode = mode;
        this.#color = color;
    }
    get type() {
        return this.#mode
    }
    get color() {
        return this.#color
    }
    static input = (userColor) => {
        return new Color(Mode.colorInput, userColor)
    }
    static eraser = () => {
        return new Color(Mode.eraser, "#fff8f7");
    }
    static random = () => {
        const colorRange = 256;
        const max = colorRange * 1000
        let red = Math.floor(Math.random() * max) % colorRange;
        let blue = Math.floor(Math.random() * max) % colorRange;
        let green = Math.floor(Math.random() * max) % colorRange;
        return new Color(Mode.rainbow, `rgb(${red}, ${green}, ${blue})`);
    }
}
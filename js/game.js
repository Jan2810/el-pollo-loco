let canvas;
let world;
keyboard = new Keyboard();
let keyIsDown = false;


function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    document.getElementById("menu").classList.add("d-none")
}

function closeOverlay() {
    document.getElementById("startOverlay").style.display = "none";
}

window.addEventListener('keydown', (event) => {

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 65) {
        keyboard.A = true;
    }
    if (event.keyCode == 83) {
        keyboard.S = true;
    }
    if (event.keyCode == 68 && !keyIsDown) {
        keyboard.D = true;
        keyIsDown = true;
        console.log(keyIsDown);
    }
});

window.addEventListener('keyup', (event) => {

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 65) {
        keyboard.A = false;
    }
    if (event.keyCode == 83) {
        keyboard.S = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
        keyIsDown = false;
        console.log(keyIsDown);
    }
});

document.getElementById('leftBtn').addEventListener('touchstart', (event) => {
    event.preventDefault();
    keyboard.LEFT = true;
    console.log('Pressed:', keyboard.LEFT);
});

document.getElementById('leftBtn').addEventListener('touchend', (event) => {
    event.preventDefault();
    keyboard.LEFT = false;
    console.log('Released:', keyboard.LEFT);
});
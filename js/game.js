let canvas;
let world;
keyboard = new Keyboard();
let keyIsDown = false;

async function init() {
    clearAllIntervals();
    canvas = document.getElementById("canvas");
    await initLevel();
    world = new World(canvas, keyboard);
    closeStartScreen();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function closeStartScreen() {
    document.getElementById("menu").classList.add("d-none");
    document.getElementById("fullscreen").classList.remove("d-none");
    document.getElementById("canvas").classList.remove("d-none");
    document.getElementById("description").classList.remove("d-none");
}

function closeOverlay(overlay) {
    document.getElementById(overlay).classList.add("d-none");
}

function goToMenu(overlay) {
    document.getElementById(overlay).classList.add("d-none");
    document.getElementById("menu").classList.remove("d-none");
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


setInterval(() => {
    document.getElementById('leftBtn').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('leftBtn').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('rightBtn').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('rightBtn').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('jumpBtn').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('jumpBtn').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('bottleBtn').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('bottleBtn').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.D = false;
    });
}, 50);

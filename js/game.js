let canvas;
let world;
keyboard = new Keyboard();
let keyIsDown = false;
background_music = new Audio('audio/music.mp3');

async function init() {
    canvas = document.getElementById("canvas");
    await initLevel();
    world = new World(canvas, keyboard, background_music);
    document.getElementById("menu").classList.add("d-none");
    document.getElementById("fullscreen").classList.remove("d-none");
    document.getElementById("canvas").classList.remove("d-none");
    document.getElementById("description").classList.remove("d-none");
}

function closeOverlay(overlay) {
    document.getElementById(overlay).style.display = "none";
    // background_music.volume = 0.3;
    // background_music.play();
    // background_music.loop = true;
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


setInterval(() => {
    document.getElementById('leftBtn').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
        console.log('Pressed:', keyboard.LEFT);
    });
    document.getElementById('rightBtn').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
        console.log('Released:', keyboard.LEFT);
    });

    document.getElementById('rightBtn').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
        console.log('Pressed:', keyboard.RIGHT);
    });
    document.getElementById('rightBtn').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.RIGHT = false;
        console.log('Released:', keyboard.RIGHT);
    });

    document.getElementById('jumpBtn').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
        console.log('Pressed:', keyboard.SPACE);
    });
    document.getElementById('jumpBtn').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.SPACE = false;
        console.log('Released:', keyboard.SPACE);
    });

    document.getElementById('bottleBtn').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.D = true;
        console.log('Pressed:', keyboard.D);
    });
    document.getElementById('bottleBtn').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.D = false;
        console.log('Released:', keyboard.D);
    });

    
}, 50);

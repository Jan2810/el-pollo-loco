let canvas;
let world;
keyboard = new Keyboard();
let keyIsDown = false;
let gameIsMuted = true;;

/**
 * Initializes the game by clearing all intervals, getting the canvas element,
 * initializing the level, creating a new World instance, and closing the start screen.
 *
 * @async
 * @returns {void}
 */
async function init() {
    clearAllIntervals();
    canvas = document.getElementById("canvas");
    await initLevel();
    world = new World(canvas, keyboard, gameIsMuted);
    closeStartScreen();
}

/**
 * Toggles the game's sound on or off.
 * Updates the mute button's image and logs the current mute status to the console.
 *
 * @returns {void}
 */
function toggleMute() {
    if (gameIsMuted) {
        gameIsMuted = false;
        document.getElementById('muteBtn').src = 'img/11_ingame/unmute_sound.png';
    } else {
        gameIsMuted = true;
        document.getElementById('muteBtn').src = 'img/11_ingame/mute_sound.png';
    };
}

/**
 * Clears all intervals by iterating through a range of interval IDs and using the clearInterval function.
 * This function is useful for stopping all ongoing intervals when a new game or level starts.
 *
 * @returns {void}
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Closes the start screen by hiding the menu, full screen, canvas, and description elements.
 *
 * @returns {void}
 */
function closeStartScreen() {
    document.getElementById("menu").classList.add("d-none");
    document.getElementById("fullScreen").classList.remove("d-none");
    document.getElementById("canvas").classList.remove("d-none");
    document.getElementById("description").classList.remove("d-none");
}

/**
 * Closes a specified overlay element by adding the "d-none" class to it.
 *
 * @param {string} overlay - The ID of the overlay element to be closed.
 *
 * @returns {void}
 */
function closeOverlay(overlay) {
    document.getElementById(overlay).classList.add("d-none");
}

/**
 * Opens a specified overlay element by removing the "d-none" class from it.
 *
 * @param {string} overlay - The ID of the overlay element to be opened.
 *
 * @returns {void}
 */
function openOverlay(overlay) {
    document.getElementById(overlay).classList.remove("d-none");
}

/**
 * Navigates to the main menu by hiding the specified overlay element and showing the main menu.
 *
 * @param {string} overlay - The ID of the overlay element to be hidden.
 *
 * @returns {void}
 */
function goToMenu(overlay) {
    document.getElementById(overlay).classList.add("d-none");
    document.getElementById("menu").classList.remove("d-none");
}

/**
 * Event listener for keydown events. Updates the state of the keyboard object based on the pressed key.
 *
 * @param {KeyboardEvent} event - The event object containing information about the key that was pressed.
 * @listens keydown
 * @returns {void}
 */
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

/**
 * Event listener for keyup events. Updates the state of the keyboard object based on the released key.
 *
 * @param {KeyboardEvent} event - The event object containing information about the key that was released.
 * @listens keyup
 * @returns {void}
 */
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
    }
});

/**
 * Sets up touch event listeners for the game's touch controls.
 * This function listens for touchstart and touchend events on specific buttons,
 * and updates the state of the keyboard object based on the touch events.
 *
 * @returns {void}
 */
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
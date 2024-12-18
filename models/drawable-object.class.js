class DrawableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};
    currentImage = 0;
    intervalIDs = [];


    /**
     * This function loads an image into the DrawableObject's image property.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * This function loads multiple images into an image cache for later use.
     */
    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Draws the DrawableObject on the canvas using the provided context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }



    /**
     * This function stops the game and displays the game lost overlay after a 1-second delay.
     * It pauses the background music, clears all intervals, and modifies the visibility of HTML elements.
     *
     * @returns {void}
     */
    stopLost() {
        setTimeout(() => {
            world.background_music_endboss.pause();
            world.background_music.pause();
            this.clearAllIntervals();
            document.getElementById("fullScreen").classList.add("d-none");
            document.getElementById("canvas").classList.add("d-none");
            document.getElementById("description").classList.add("d-none");
            document.getElementById("gameLostOverlay").classList.remove("d-none");
        }, 1000);
    }


    /**
     * This function stops the game and displays the game won overlay after a 2-second delay.
     * It pauses the background music, clears all intervals, and modifies the visibility of HTML elements.
     *
     * @returns {void}
     */
    stopWin() {
        setTimeout(() => {
            world.background_music_endboss.pause();
            world.background_music.pause();
            this.clearAllIntervals();
            document.getElementById("fullScreen").classList.add("d-none");
            document.getElementById("canvas").classList.add("d-none");
            document.getElementById("description").classList.add("d-none");
            document.getElementById("gameWonOverlay").classList.remove("d-none");
        }, 2000);
    }


    /**
     * This function clears all intervals by iterating through a range of possible interval IDs and using the clearInterval function.
     * This is a workaround for the fact that clearInterval does not accept an array of IDs, and there is no built-in method to retrieve all interval IDs.
     *
     * @returns {void}
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }
}
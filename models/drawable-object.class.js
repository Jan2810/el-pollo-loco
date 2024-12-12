class DrawableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};
    currentImage = 0;
    intervalIDs = [];


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // drawFrame(ctx) {
    //     if (this instanceof Character || this instanceof Chicken || this instanceof BabyChicken || this instanceof Endboss || this instanceof Coin || this instanceof SalsaBottle || this instanceof ThrowableObject) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '5';
    //         ctx.strokeStyle = 'blue';
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     };
    // }

    // drawCollisionFrame(ctx) {
    //     if (this instanceof Character || this instanceof Chicken || this instanceof BabyChicken || this instanceof Endboss || this instanceof Coin || this instanceof SalsaBottle || this instanceof ThrowableObject) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '3';
    //         ctx.strokeStyle = 'red';
    //         ctx.rect(this.x + this.offsetLeft, this.y + this.offsetTop, this.width - this.offsetLeft - this.offsetRight, this.height - this.offsetTop -this.offsetBottom);
    //         ctx.stroke();
    //     };
    // }

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

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    //   this.intervalIDs.forEach(id => clearInterval(id));

}
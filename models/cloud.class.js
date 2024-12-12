class Cloud extends MovableObject {

    y = 0;
    height = 480;
    width = 720;
    speedX = 0.15;
    x;

    constructor(path, x) {
        super().loadImage(path);
        this.x = x;
        this.animate();
    }

    /**
     * Animates the cloud object by continuously moving it to the left.
     *
     * @function animate
     * @memberof Cloud
     * @instance
     *
     * @returns {undefined} This function does not return a value.
     *
     * @example
     * let cloud = new Cloud('path/to/cloud.png', 500);
     * cloud.animate();
     */
    animate() {
        let animationInterval = setInterval(() => {
            this.moveLeft()
        }, 1000/60);
        this.intervalIDs.push(animationInterval);
    }

}
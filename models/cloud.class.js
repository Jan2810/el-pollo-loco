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

    animate() {
        let animationInterval = setInterval(() => {
            this.moveLeft()
        }, 1000/60);
        this.intervalIDs.push(animationInterval);
    }
}
class Cloud extends MovableObject {

    y = 0;
    height = 480;
    width = 720;

    constructor(path, x) {
        super().loadImage(path);
        this.x = x;
        this.animate();
    }

    animate() {
        this.moveLeft()
    }
}
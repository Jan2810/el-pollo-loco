class BackgroundObject extends MovableObject {

    height = 480;
    width = 720;
    y = 0;

    constructor(path, x) {
        super().loadImage(path);
        this.x  = x;
    }
}
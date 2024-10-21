class SalsaBottle extends MovableObject {
    y = 350;
    height = 80;
    width = 80;

    constructor(path, x) {
        super().loadImage(path);
        this.x = x;
    }
}
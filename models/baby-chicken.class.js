class BabyChicken extends MovableObject {

    y = 345;
    height = 80;
    width = 70;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]
    
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x  = 200 + Math.random() * 4200;    // Spawnlocation of the chickens
        this.speed = 0.2 + Math.random() * 0.25;    // Speed of the chickens
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
    }

}
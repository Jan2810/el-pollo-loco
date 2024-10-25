class Chicken extends MovableObject {

    y = 345;
    height = 80;
    width = 70;
    speedX = 0.15;
    offsetTop = 60;
    offsetBottom = 130;
    offsetLeft = 5;
    offsetRight = 10;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];
    
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x  = 200 + Math.random() * 4200;    // Spawnlocation of the chickens
        this.speed = 0.2 + Math.random() * 0.25;    // Speed of the chickens
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 200);
    }

}
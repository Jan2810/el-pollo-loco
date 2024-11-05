class Chicken extends MovableObject {

    y = 345;
    height = 80;
    width = 70;
    speedX = 0.15;
    offsetTop = 5;
    offsetBottom = 5;
    offsetLeft = 5;
    offsetRight = 5;
    isMovingLeft = true;
    isKilled = false;


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
        // Store intervals in variables
        let moveInterval = setInterval(() => {
            if (!this.isKilled) {
                this.moveLeft();
            } else {
                clearInterval(moveInterval); // Stop moving when killed
            }
        }, 1000 / 60);

        let walkingAnimationInterval = setInterval(() => {
            if (!this.isKilled) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                clearInterval(walkingAnimationInterval); // Stop walking animation when killed
            }
        }, 200);

        let deathCheckInterval = setInterval(() => {
            if (this.isKilled) {
                this.loadImage(this.IMAGES_DEAD);
                clearInterval(deathCheckInterval); // Stop checking once the image is loaded
            }
        }, 200);
    }

    
}
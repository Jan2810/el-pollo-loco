class BabyChicken extends MovableObject {

    y = 335;
    height = 80;
    width = 70;
    speedX = 0.15;
    offsetTop = 5;
    offsetBottom = 5;
    offsetLeft = 10;
    offsetRight = 10;
    isKilled = false;
    isActive = true;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];
    
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x  = 200 + Math.random() * 4200;
        this.speed = 0.2 + Math.random() * 0.25;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        let moveInterval = setInterval(() => {
            if (!this.isKilled) {
                this.moveLeft();
            } else {
                clearInterval(moveInterval);
            }
        }, 1000 / 60);
        this.intervalIDs.push(moveInterval);
        

        let walkingAnimationInterval = setInterval(() => {
            if (!this.isKilled) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                clearInterval(walkingAnimationInterval);
            }
        }, 200);
        this.intervalIDs.push(walkingAnimationInterval);

        let deathCheckInterval = setInterval(() => {
            if (this.isKilled) {
                this.loadImage(this.IMAGES_DEAD);
                clearInterval(deathCheckInterval);
            }
        }, 200);
        this.intervalIDs.push(deathCheckInterval);        
    }

}
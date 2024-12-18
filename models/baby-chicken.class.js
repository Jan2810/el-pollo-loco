class BabyChicken extends MovableObject {

    y = 335;
    height = 80;
    width = 70;
    speedX = 0.5;
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
    };

    
    /**
     * Animates the baby chicken by starting its movement, walking animation, and death check.
     */
    animate() {
        this.startMoving();
        this.startWalkingAnimation();
        this.startDeathCheck();
    }

    
    /**
     * Starts the movement of the baby chicken by setting up an interval to call the moveLeft method.
     * The interval is cleared when the baby chicken is killed.
     */
    startMoving() {
        let moveInterval = setInterval(() => {
            if (!this.isKilled) {
                this.moveLeft();
            } else {
                clearInterval(moveInterval);
            }
        }, 1000 / 60);
        this.intervalIDs.push(moveInterval);
    }

    
    /**
     * Starts the walking animation of the baby chicken.
     * The animation is played by changing the image of the baby chicken every 200 milliseconds.
     * The animation is cleared when the baby chicken is killed.
     */
    startWalkingAnimation() {
        let walkingAnimationInterval = setInterval(() => {
            if (!this.isKilled) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                clearInterval(walkingAnimationInterval);
            }
        }, 200);
        this.intervalIDs.push(walkingAnimationInterval);
    }

    
    /**
     * Starts the death check for the baby chicken.
     * The function checks if the baby chicken is killed every 200 milliseconds.
     * If the baby chicken is killed, it changes its image to the dead image and clears the death check interval.
     */
    startDeathCheck() {
        let deathCheckInterval = setInterval(() => {
            if (this.isKilled) {
                this.loadImage(this.IMAGES_DEAD);
                clearInterval(deathCheckInterval);
            }
        }, 200);
        this.intervalIDs.push(deathCheckInterval);
    }

    
}
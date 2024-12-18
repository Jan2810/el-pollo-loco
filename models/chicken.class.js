class Chicken extends MovableObject {

    y = 335;
    height = 80;
    width = 70;
    speedX = 3.1;
    offsetTop = 5;
    offsetBottom = 5;
    offsetLeft = 5;
    offsetRight = 5;
    isMovingLeft = true;
    isKilled = false;
    isActive = true;

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
        this.x = 200 + Math.random() * 24000;
        this.speed = 0.2 + Math.random() * 0.25;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    /**
     * Animates the chicken object by starting its movement, walking animation, and death check.
     */
    animate() {
        this.startMoving();
        this.startWalkingAnimation();
        this.startDeathCheck();
    }

    
    /**
     * Starts the chicken's movement by setting up an interval that calls the moveLeft method.
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
     * Starts the chicken's walking animation by setting up an interval that calls the playAnimation method.
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
     * Starts the chicken's death check by setting up an interval that checks if the chicken is killed.
     * If the chicken is killed, it loads the dead image and clears the interval.
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
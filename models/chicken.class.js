class Chicken extends MovableObject {

    y = 335;
    height = 80;
    width = 70;
    speedX = 4;
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
     * Animates the chicken's movement and appearance.
     *
     * This function sets up three intervals:
     * 1. A movement interval that moves the chicken left while it's not killed.
     * 2. A walking animation interval that changes the chicken's image to create a walking animation.
     * 3. A death check interval that loads the dead image when the chicken is killed.
     *
     * @returns {void}
     */
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
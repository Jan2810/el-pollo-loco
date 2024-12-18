class Endboss extends MovableObject {
    y = 52;
    height = 400;
    width = 300;
    offsetTop = 60;
    offsetBottom = 40;
    offsetLeft = 20;
    offsetRight = 20;
    speedX = 4.5;
    world;

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    hurt_sound = new Audio('audio/endboss_hurt.mp3');

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    dead_sound = new Audio('audio/endboss_dead.mp3');

    isWalkingLeft = true;
    isKilled = false;
    isActive = true;
    isHurt = false;
    energy = 100;

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.x = 4000;
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.movementAnimation();
    }

    /**
     * Manages the endboss's animation. It uses setInterval to create a loop that changes the endboss's image
     * based on its current state (walking, hurt, or dead). It also handles the endboss's animation switching.
     */
    animate() {
        let animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.handleDeathAnimation();
            } else if (this.isHurt) {
                this.handleHurtAnimation();
            } else {
                this.playWalkingAnimation();
            }
        }, 300);
        this.intervalIDs.push(animationInterval);
    }


    /**
     * Handles the endboss's death animation.
     * It plays the death animation, plays the death sound, and stops the winning animation.
     */
    handleDeathAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        if (!this.world.gameIsMuted) {
            this.dead_sound.play();
        }
        this.stopWin();
    }


    /**
     * Handles the endboss's hurt animation.
     * It plays the hurt animation, plays the hurt sound, and sets the isHurt flag to false after a certain time.
     */
    handleHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        if (!this.world.gameIsMuted) {
            this.hurt_sound.play();
        }
        setTimeout(() => {
            this.isHurt = false;
        }, 600);
    }


    /**
     * Handles the endboss's walking animation.
     * It plays the walking animation by changing the endboss's image based on the IMAGES_WALK array.
     */
    playWalkingAnimation() {
        this.playAnimation(this.IMAGES_WALK);
    }


    /**
     * Handles the endboss's movement animation.
     * It starts the movement interval and the direction change interval.
     */
    movementAnimation() {
        let movementInterval = this.startMovementInterval();
        this.scheduleDirectionChange(movementInterval);
    }


    /**
     * Starts the movement interval for the endboss.
    */
    startMovementInterval() {
        let movementInterval = setInterval(() => {
            if (!this.isDead()) {
                this.updatePosition();
            }
        }, 1000 / 60);
        this.intervalIDs.push(movementInterval);
        return movementInterval;
    }


    /**
     * Updates the endboss's position based on its walking direction.
     */
    updatePosition() {
        if (this.isWalkingLeft) {
            this.x -= this.speedX;
        } else {
            this.x += this.speedX;
        }
    }


    /**
     * Schedules a direction change for the endboss after a specified time.
     */
    scheduleDirectionChange(movementInterval) {
        setTimeout(() => {
            this.toggleWalkingDirection();
            clearInterval(movementInterval);
            this.attackingAnimation();
        }, 3000);
    }


    /**
     * Toggles the endboss's walking direction.
     */
    toggleWalkingDirection() {
        this.isWalkingLeft = !this.isWalkingLeft;
    }


    /**
     * Handles the endboss's attack animation.
     * It starts the attack interval and schedules a direction change after a specified time.
     */
    attackingAnimation() {
        let attackInterval = this.startAttackInterval();
        this.scheduleAttackDirectionChange(attackInterval);
    }

    
    /**
     * Starts the attack interval for the endboss.
     */
    startAttackInterval() {
        let attackInterval = setInterval(() => {
            this.playAttackOrAlertAnimation();
        }, 300);
        this.intervalIDs.push(attackInterval);
        return attackInterval;
    }

    
    /**
     * This function plays the attack or alert animation based on the endboss's walking direction.
     */
    playAttackOrAlertAnimation() {
        if (this.isWalkingLeft === false) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else {
            this.playAnimation(this.IMAGES_ALERT);
        }
    }

    
    /**
     * Schedules a direction change for the endboss after a specified time.
     */
    scheduleAttackDirectionChange(attackInterval) {
        setTimeout(() => {
            this.toggleOtherDirection();
            clearInterval(attackInterval);
            this.movementAnimation();
        }, 2000);
    }

    
    /**
     * Toggles the endboss's other direction.
     * This function is used to change the endboss's direction during its attack animation.
     */
    toggleOtherDirection() {
        this.otherDirection = !this.otherDirection;
    }
    

    /**
     * This function is called when the endboss object is hit by a bottle.
     * It reduces the endboss's energy by 40 points and checks if the endboss's energy is depleted.
     * If the endboss's energy is depleted, it calls the isDead() method.
     *
     * @returns {void}
     */
    hitByBottle() {
        this.energy -= 20;
        if (this.energy <= 0) {
            this.energy = 0;
            this.isDead();
        }
    }
}


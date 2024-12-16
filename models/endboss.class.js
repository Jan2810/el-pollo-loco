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

    /**
     * This function manages the endboss's animation. It uses setInterval to create a loop that changes the endboss's image
     * based on its current state (walking, hurting, or dead). It also plays the corresponding sound effect.
     *
     * @returns {void}
     */
    animate() {
        let animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                if (!this.world.gameIsMuted) {
                    this.dead_sound.play();
                }
                this.stopWin();
            } else if (this.isHurt == true) {
                this.playAnimation(this.IMAGES_HURT);
                if (!this.world.gameIsMuted) {
                    this.hurt_sound.play();
                }
                setTimeout(() => {
                    this.isHurt = false;
                }, 600);
            } else {
                this.playAnimation(this.IMAGES_WALK);
            }
        }, 300);
        this.intervalIDs.push(animationInterval);
    }


    /**
     * This function manages the endboss's movement animation. It uses setInterval to create a loop that changes the endboss's position
     * based on its current walking direction. It also handles the endboss's walking direction change after a certain time.
     *
     * @returns {void}
     */
    movementAnimation() {
        let movementInterval = setInterval(() => {
            if (!this.isDead()) {
                if (this.isWalkingLeft) {
                    this.x -= this.speedX;
                } else {
                    this.x += this.speedX;
                }
            }
        }, 1000 / 60);
        setTimeout(() => {
            if (this.isWalkingLeft === true) {
                this.isWalkingLeft = false;
            } else {
                this.isWalkingLeft = true;
            }
            clearInterval(movementInterval);
            this.attackingAnimation();
        }, 3000);
        this.intervalIDs.push(movementInterval);
    }

    /**
     * This function manages the endboss's attacking animation. It uses setInterval to create a loop that changes the endboss's image
     * based on its current walking direction. It also handles the endboss's attacking animation and switching back to its walking animation.
     *
     * @returns {void}
     */
    attackingAnimation() {
        let attackInterval = setInterval(() => {
            if (this.isWalkingLeft == false) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.isWalkingLeft == true) {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 300);
        setTimeout(() => {
            if (this.otherDirection == true) {
                this.otherDirection = false;
            } else {
                this.otherDirection = true;
            }
            clearInterval(attackInterval);
            this.movementAnimation();
        }, 2000);
        this.intervalIDs.push(attackInterval);
    }
}
class Character extends MovableObject {

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    walking_sound = new Audio('audio/walk.mp3');

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    jumping_sound = new Audio('audio/jump.mp3');

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    snoring_sound = new Audio('audio/character_snoring.mp3');

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    dead_sound = new Audio('audio/character_dead.mp3');
    dead_sound_played = false;

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
    hurt_sound = new Audio('audio/character_hurt.mp3');

    x = 0;
    y = 150;
    height = 280;
    width = 150;
    world;
    speedX = 5;
    offsetTop = 110;
    offsetBottom = 12;
    offsetLeft = 30;
    offsetRight = 40;
    lastInteraction = Date.now();

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.characterMovement();
        this.characterAnimations();
    }

    /**
     * This function handles the character's movement and interaction with the keyboard inputs.
     * It uses an interval to continuously update the character's position and play sound effects based on the keyboard inputs.
     *
     * @returns {void}
     */
    characterMovement() {
        setInterval(() => {
            this.walking_sound.pause();
            let interaction = this.handleKeyboardInput();
            this.updateCameraPosition();
            if (interaction) this.lastInteraction = Date.now();
        }, 1000 / 60);
    }

    /**
     * Handles the character's keyboard inputs and updates the character's state accordingly.
     */
    handleKeyboardInput() {
        let interaction = false;
        interaction = this.handleRightMovement(interaction);
        interaction = this.handleLeftMovement(interaction);
        interaction = this.handleJump(interaction);
        interaction = this.handleOtherKey(interaction);
        return interaction;
    }


    /**
     * Handles the character's movement to the right.
     * It checks if the right arrow key is pressed and the character is within the level boundaries.
     * If the conditions are met, it calls the characterMoveRight function and updates the interaction flag.
     */
    handleRightMovement(interaction) {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.characterMoveRight();
            interaction = true;
        }
        return interaction;
    }


    /**
     * Handles the character's movement to the left.
     * It checks if the left arrow key is pressed and the character is within the level boundaries.
     * If the conditions are met, it calls the characterMoveLeft function and updates the interaction flag.
     */
    handleLeftMovement(interaction) {
        if (this.world.keyboard.LEFT && this.x > 20) {
            this.characterMoveLeft();
            interaction = true;
        }
        return interaction;
    }

    
    /**
     * Handles the character's jump action based on keyboard input.
     */
    handleJump(interaction) {
        if (this.world.keyboard.SPACE && this.canJump && !this.isAboveGround()) {
            this.canJump = false;
            this.characterJump();
            interaction = true;
        } else if (!this.world.keyboard.SPACE) {
            this.canJump = true;
            this.jumping_sound.pause();
        }
        return interaction;
    }


    /**
     * Handles the character's other keyboard inputs and updates the character's state accordingly.
     */
    handleOtherKey(interaction) {
        if (this.world.keyboard.D) {
            interaction = true;
        }
        return interaction;
    }

    
    /**
     * Updates the camera position based on the character's position.
     * The camera's x-coordinate is set to follow the character's x-coordinate,
     * with a slight offset to center the character in the viewport.
     */
    updateCameraPosition() {
        this.world.camera_x = -this.x + 50;
    }


    /**
     * This function handles the character's movement to the right.
     * It updates the character's position, direction, and sound effect.
     */
    characterMoveRight() {
        this.moveRight();
        this.otherDirection = false;
        this.walking_sound.playbackRate = 2;
        if (this.y === 150 && !this.world.gameIsMuted) {
            this.walking_sound.play();
        }
    }


    /**
     * This function handles the character's movement to the left.
     * It updates the character's position, direction, and sound effect.
     */
    characterMoveLeft() {
        this.moveLeft();
        this.otherDirection = true;
        if (this.y === 150 && !this.world.gameIsMuted) {
            this.walking_sound.play();
        }
    }


    /**
     * Handles the character's animations.
     * This function uses an interval to continuously update the character's animation based on its current state.
     */
    characterAnimations() {
        setInterval(() => {
            if (this.isDead()) {
                this.characterDeadAnimation();
                return;
            }
            this.handleAirAnimations();
        }, 150);
    }
    

    /**
     * Handles the character's animations when in the air (not on the ground).
     * It checks if the character is above the ground and plays the jumping animation accordingly.
     * If the character is not above the ground, it calls the handleGroundAnimations function.
     */
    handleAirAnimations() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            this.handleGroundAnimations();
        }
    }


    /**
     * Handles the character's animations when on the ground (not in the air).
     * It checks the character's state and plays the corresponding animation.
     */
    handleGroundAnimations() {
        let interaction = false;
        if (this.isHurt()) {
            this.characterHurtAnimation();
            interaction = true;
        } 
        else if (this.isWalking()) {
            this.playAnimation(this.IMAGES_WALKING);
        } 
        else if (this.isLongIdle()) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            this.playSnoringSound();
        } 
        else {
            this.playAnimation(this.IMAGES_IDLE);
        }
        if (interaction) {
            this.lastInteraction = Date.now();
        }
    }


    /**
     * Checks if the character is currently walking.
     * @returns {boolean} - Returns true if the character is walking (right or left arrow keys are pressed and the character is on the ground), false otherwise.
     */
    isWalking() {
        return (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && this.y == 150;
    }

    
    /**
     * Checks if the character is in a long idle state.
     * The character is considered in a long idle state if it has not moved for more than 5 seconds.
     * @returns {boolean} - Returns true if the character is in a long idle state, false otherwise.
     */
    isLongIdle() {
        return Date.now() - this.lastInteraction > 5000;
    }


    /**
     * Handles the character's hurt animation and sound effect.
     * This function is called when the character is in a hurt state.
     * It plays the hurt animation and sound effect if the game is not muted.
     *
     */
    characterHurtAnimation() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            if (!this.world.gameIsMuted) {
                this.hurt_sound.volume = 0.3;
                this.hurt_sound.play();
            };
        }
    }


    /**
     * Handles the character's snoring sound effect.
     * This function is called when the character is in a long idle state (not moving for more than 5 seconds).
     * It plays the snoring sound effect if the game is not muted.
     */
    playSnoringSound() {
        if (!this.world.gameIsMuted) {
            this.snoring_sound.volume = 1;
            this.snoring_sound.play();
        }
    }


    /**
     * This function handles the character's death animation and sound effect.
     *
     */
    characterDeadAnimation() {
        if ((!this.dead_sound_played) && !this.world.gameIsMuted) {
            this.dead_sound.volume = 0.3;
            this.dead_sound.play();
            this.dead_sound_played = true;
        }
        this.stopLost();
        this.playAnimation(this.IMAGES_DEAD);
    }


    /**
     * This function is responsible for making the character jump.
     * It sets the vertical speed of the character to a positive value, simulating the jumping motion.
     * Additionally, it plays a sound effect for the jumping action if the game is not muted.
     *
     * @returns {void}
     */
    characterJump() {
        this.speedY = 26;
        if (!this.world.gameIsMuted) {
            this.jumping_sound.playbackRate = 0.7;
            this.jumping_sound.play();
        }
    }

    
    /**
     * This function is responsible for making the character bounce.
     * It sets the vertical speed of the character to a positive value, simulating the bouncing motion after jumping ontop of an enemy.
     *
     * @returns {void}
     */
    bounce() {
        this.speedY = 20;
    }
}
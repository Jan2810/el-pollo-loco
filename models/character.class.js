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

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {
        let lastInteraction = Date.now();

        let moveInterval = setInterval(() => {
            this.walking_sound.pause();
            let interaction = false;

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.playbackRate = 2;
                if (this.y === 150 && !this.world.gameIsMuted) {
                    this.walking_sound.play();
                }
                interaction = true;
            }
            if (this.world.keyboard.LEFT && this.x > 20) {
                this.moveLeft();
                this.otherDirection = true;
                if (this.y === 150 && !this.world.gameIsMuted) {
                    this.walking_sound.play();
                }
                interaction = true;
            }
            if (!this.isAboveGround() && this.world.keyboard.SPACE) {
                this.jump();
                interaction = true;
            }
            this.world.camera_x = -this.x + 50;

            if (interaction) {
                lastInteraction = Date.now();
            }
        }, 1000 / 60);
        this.intervalIDs.push(moveInterval);

        let animationsInterval = setInterval(() => {
            if (this.isDead()) {
                if ((!this.dead_sound_played) && !this.world.gameIsMuted) {
                    this.dead_sound.volume = 0.3;
                    this.dead_sound.play();
                    this.dead_sound_played = true;
                }
                this.stopLost();
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                if (this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_JUMPING);
                } else {
                    if (this.isHurt()) {
                        this.playAnimation(this.IMAGES_HURT);
                        if (this.world.gameisMuted) {
                            this.hurt_sound.volume = 0.3;
                            this.hurt_sound.play();
                        }
                    } else {
                        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT && this.y == 150) {
                            this.playAnimation(this.IMAGES_WALKING);
                        } else if (Date.now() - lastInteraction > 10000) {
                            this.playAnimation(this.IMAGES_LONG_IDLE);
                            if (!this.world.gameIsMuted) {
                                this.snoring_sound.volume = 1;
                                this.snoring_sound.play();
                            }
                        } else {
                            this.playAnimation(this.IMAGES_IDLE);
                        }
                    }
                }
            }
        }, 200);
        this.intervalIDs.push(animationsInterval);
    }

    jump() {
        this.speedY = 25;
        if (!this.world.gameIsMuted) {
            this.jumping_sound.playbackRate = 0.7;
            this.jumping_sound.play();
        }
    }

    bounce() {
        this.speedY = +10;
    }
}
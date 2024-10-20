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

    x = 0;
    y = 150;
    height = 280;
    width = 150;
    world;
    speedX = 5;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speedX;
                this.otherDirection = false;
                this.walking_sound.playbackRate = 4;
                if (this.y === 150) {
                    this.walking_sound.play();
                }
            }
            if (this.world.keyboard.LEFT && this.x > 20) {
                this.x -= this.speedX;
                this.otherDirection = true;
                if (this.y === 150) {
                    this.walking_sound.play();
                }
            }
            if (this.y == 150 && this.world.keyboard.UP) {
                this.jump()
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING)
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT && this.y == 150) {
                    this.playAnimation(this.IMAGES_WALKING)
                }
            }
        }, 50);
    }

    jump() {
        this.speedY = 25; 
        this.jumping_sound.play();
    }
}
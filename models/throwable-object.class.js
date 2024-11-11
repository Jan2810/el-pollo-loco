class ThrowableObject extends MovableObject {

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    offsetTop = 20;
    offsetBottom = 40;
    offsetLeft = 30;
    offsetRight = 60;
    keyboard;

    constructor(x, y, keyboard) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.keyboard = keyboard;
        this.height = 80;
        this.width = 80;
        this.y = y;
        this.x = x;
        this.throw();
        this.animate();
    }

    throw() {
        this.speedY = 35;
        this.applyGravity();
        setInterval(() => {
            this.x += 18;
        }, 40);
    }

    animate(x, y) {
        if (this.keyboard.D) {
            this.throw(x, y);
            setInterval(() => {
                this.playAnimation(this.IMAGES_ROTATION);
            }, 100);
        }
    }

    playSplashAnimation(x, y) {
        let currentImage = 0;
        let interval = setInterval(() => {
            if (currentImage < this.IMAGES_SPLASH.length) {
                this.loadImage(this.IMAGES_SPLASH[currentImage]);
                this.x = x;
                this.y = y;
                currentImage++;
            } else {
                clearInterval(interval);
            }
        }, 33);
    }
    
}

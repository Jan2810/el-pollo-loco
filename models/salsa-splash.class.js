class SalsaSplash extends MovableObject {

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    height = 50;
    width = 50;
    x;
    y;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png');
        this.x = x;
        this.y = y;
        this.playSplashAnimation();
    }

    playSplashAnimation() {
        let currentImage = 0;
        let interval = setInterval(() => {
            if (currentImage < this.IMAGES_SPLASH.length) {
                this.loadImage(this.IMAGES_SPLASH[currentImage]);
                currentImage++;
            } else {
                clearInterval(interval);
            }
        }, 50);
    }
}
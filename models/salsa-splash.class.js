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
    world;

    constructor(x, y, world) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png');
        this.world = world;
        this.x = x;
        this.y = y;
        this.playSplashAnimation();
    }

    /**
     * Plays a splash animation for the salsa bottle.
     * The animation consists of a sequence of images representing the bottle's splash.
     *
     * @function playSplashAnimation
     * @memberof SalsaSplash
     *
     * @returns {void}
     */
    playSplashAnimation() {
        let currentImage = 0;
        let animationInterval = setInterval(() => {
            if (currentImage < this.IMAGES_SPLASH.length) {
                this.loadImage(this.IMAGES_SPLASH[currentImage]);
                currentImage++;
            } else {
                clearInterval(animationInterval);
            }
        }, 50);
    }
}
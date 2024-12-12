class Coin extends MovableObject {
    y = 245;
    height = 120;
    width = 120;
    offsetTop = 40;
    offsetBottom = 40;
    offsetLeft = 40;
    offsetRight = 40;

    IMAGES_PULSE = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];
    
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x  = 200 + Math.random() * 3000;
        this.y  = 150 + Math.random() * 150;
        this.loadImages(this.IMAGES_PULSE);
        this.animate();
    }

    /**
     * Animates the coin by cycling through the pulse images.
     *
     * @function animate
     * @memberof Coin
     * @instance
     *
     * @returns {undefined} This function does not return a value.
     *
     * @example
     * coinInstance.animate();
     */
    animate() {
        let animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_PULSE)
        }, 200);
        this.intervalIDs.push(animationInterval);
    }

}
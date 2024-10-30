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
        // this.speed = 0.2 + Math.random() * 0.25;    // Speed of the chickens
        this.loadImages(this.IMAGES_PULSE);
        this.animate();
    }

    animate() {
        // this.moveLeft();*
        setInterval(() => {
            this.playAnimation(this.IMAGES_PULSE)
        }, 200);
    }
}
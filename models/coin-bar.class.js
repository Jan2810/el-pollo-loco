class Coinbar extends Statusbar {

    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    x = 30;
    y = 90;

    amount = 0;

    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
        this.loadImages(this.IMAGES_COINS);
    }

    increaseAmount() {
        this.amount++;
        let path = this.IMAGES_COINS[this.amount]; /// muss gefixed werden nach collision
        this.img = this.imageCache[path];
    };
}
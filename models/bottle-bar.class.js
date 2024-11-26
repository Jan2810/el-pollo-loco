class Bottlebar extends Statusbar {

    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    x = 30;
    y = 10;

    amount = 0;

    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png');
        this.loadImages(this.IMAGES_BOTTLE);
    }

    increaseAmount() {
        this.amount++;
        let path = this.IMAGES_BOTTLE[this.amount];
        this.img = this.imageCache[path];
    };

    reduceAmount() {
        this.amount--;
        let path = this.IMAGES_BOTTLE[this.amount];
        this.img = this.imageCache[path];
    }
}
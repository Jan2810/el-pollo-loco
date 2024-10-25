class Bottlebar extends Statusbar {

    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    amount = 0;
    x = 30;
    y = 10;

    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.setAmount(5);
    }

    setAmount(amount) {
        this.amount = amount;
        let path = this.IMAGES_BOTTLE[this.amount]; /// muss gefixed werden nach collision
        this.img = this.imageCache[path];
    };

    // resolveImageIndex() {
    //     if (this.percentage == 100) {
    //         return 5;
    //     } else if (this.percentage > 80) {
    //         return 4;
    //     } else if (this.percentage > 60) {
    //         return 3;
    //     } else if (this.percentage > 40) {
    //         return 2;
    //     } else if (this.percentage > 20) {
    //         return 1;
    //     } else {
    //         return 0;
    //     }
    // };
}
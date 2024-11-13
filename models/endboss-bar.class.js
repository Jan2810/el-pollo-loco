class Endbossbar extends Statusbar {

    IMAGES_ENERGY = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];

    percentage = 100;
    x = 480;
    y = 15;

    constructor() {
        super().loadImage('img/7_statusbars/2_statusbar_endboss/orange/orange100.png');
        this.loadImages(this.IMAGES_ENERGY);
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_ENERGY[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    };

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 3;
        } else if (this.percentage >= 60) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    };
}
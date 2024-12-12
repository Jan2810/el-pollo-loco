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

    /**
     * Updates the percentage value and sets the corresponding image for the endboss bar.
     *
     * @param {number} percentage - The new percentage value for the endboss bar. Must be a number between 0 and 100.
     *
     * @returns {void}
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_ENERGY[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    };


    /**
     * Resolves the image index for the endboss bar based on the current percentage value.
     *
     * @returns {number} The index of the image to be used for the endboss bar. The index corresponds to the following:
     * - 0: 0% to 19%
     * - 1: 20% to 59%
     * - 2: 60% to 99%
     * - 3: 100%
     */
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
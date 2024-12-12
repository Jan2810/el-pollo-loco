class Energybar extends Statusbar {

    IMAGES_ENERGY = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    percentage = 100;
    x = 30;
    y = 50;

    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png');
        this.loadImages(this.IMAGES_ENERGY);
        this.setPercentage(100);
    }

    /**
     * Updates the energy bar's percentage and corresponding image.
     *
     * @param {number} percentage - The new percentage value for the energy bar. Must be between 0 and 100.
     *
     * @returns {void}
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_ENERGY[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    };

    /**
     * Resolves the index of the image to be displayed based on the current energy percentage.
     *
     * @returns {number} The index of the image to be displayed. The index corresponds to the following energy percentages:
     * - 100: 5
     * - 80-99: 4
     * - 60-79: 3
     * - 40-59: 2
     * - 20-39: 1
     * - 0-19: 0
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    };

}
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

    /**
     * Increases the amount of the bottlebar status and updates the image accordingly.
     *
     * @function increaseAmount
     * @memberof Bottlebar
     * @instance
     *
     * @returns {void}
     *
     * @example
     * // Increase the amount of the bottlebar status
     * bottlebar.increaseAmount();
     */
    increaseAmount() {
        this.amount++;
        let path = this.IMAGES_BOTTLE[this.amount];
        this.img = this.imageCache[path];
    };


    /**
     * Reduces the amount of the bottlebar status and updates the image accordingly.
     *
     * @function reduceAmount
     * @memberof Bottlebar
     * @instance
     *
     * @returns {void}
     *
     * @example
     * // Reduce the amount of the bottlebar status
     * bottlebar.reduceAmount();
     */
    reduceAmount() {
        this.amount--;
        let path = this.IMAGES_BOTTLE[this.amount];
        this.img = this.imageCache[path];
    }

}
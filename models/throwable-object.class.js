class ThrowableObject extends MovableObject {

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    offsetTop = 20;
    offsetBottom = 40;
    offsetLeft = 30;
    offsetRight = 60;
    keyboard;
    isActive = true;

    constructor(x, y, keyboard) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.keyboard = keyboard;
        this.height = 80;
        this.width = 80;
        this.y = y;
        this.x = x;
        this.animate();
        this.lastInteraction = Date.now();
    }

    /**
     * This function is responsible for throwing the throwable object.
     * It sets the initial vertical speed, applies gravity, and moves the object horizontally.
     *
     * @returns {void}
     */
    throw() {
        this.speedY = 35;
        this.applyGravity();
        setInterval(() => {
            if (!this.otherDirection) {
                this.x += 15;
            } else {
                this.x -= 15;
            }
        }, 40);
    }
    /**
     * This function is responsible for animating the throwable object based on keyboard input.
     * It checks if the 'D' key is pressed and, if so, calls the 'throw' method and starts the animation.
     *
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     *
     * @returns {void}
     */
    animate(x, y) {
        if (this.keyboard.D) {
            this.throw(x, y);
            setInterval(() => {
                this.playAnimation(this.IMAGES_ROTATION);
            }, 100);
        }
    }
}

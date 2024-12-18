class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    lastHit = 0;
    energy = 100; 

    /**
     * Applies gravity to the movable object.
     * The gravity is simulated by continuously updating the object's position and speed.
     * If the object is above the ground or has a non-zero vertical speed, it will be moved downwards.
     * The vertical speed is decreased by the acceleration due to gravity.
     * If the object is a character and its vertical position exceeds 150, it will be set back to 150 and the vertical speed will be reset to 0.
     *
     * @returns {void}
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY != 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (this instanceof Character && this.y > 150) {
                this.y = 150;
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the movable object is above the ground.
     *
     * @returns {boolean} Returns true if the object is above the ground or if it is a throwable object.
     *                    Returns false if the object is not above the ground and not a throwable object.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
    }

    /**
     * Checks if the current movable object is colliding with another object.
     *
     * @param {MovableObject} object - The object to check for collision.
     * @returns {boolean} Returns true if the current object is colliding with the given object.
     *                   Returns false if the current object is not colliding with the given object.
     */
    isColliding(object) {
        return (this.x + this.width) - this.offsetRight >= object.x + object.offsetLeft &&
            (this.y + this.height) - this.offsetBottom >= object.y + object.offsetTop &&
            this.x + this.offsetLeft <= (object.x + object.width) - object.offsetRight &&
            this.y + this.offsetTop <= (object.y + object.height) - object.offsetBottom
    }

    /**
     * Reduces the energy of the movable object by 5 points.
     * If the energy drops below 0, it sets the energy to 0.
     * Also updates the last hit timestamp to the current time.
     *
     * @returns {void}
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the movable object is currently in a hurt state.
     * The hurt state is determined by the time elapsed since the last hit.
     * If the time elapsed is less than 1 second, the object is considered hurt.
     *
     * @returns {boolean} Returns true if the object is currently in a hurt state.
     *                   Returns false if the object is not currently in a hurt state.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the movable object is currently dead.
     * The object is considered dead if its energy is equal to 0.
     *
     * @returns {boolean} Returns true if the object is currently dead.
     *                   Returns false if the object is not currently dead.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Moves the movable object to the right by incrementing its x-coordinate by the speedX property.
     *
     * @function moveRight
     * @memberof MovableObject
     * @instance
     * @returns {void}
     */
    moveRight() {
        this.x += this.speedX;
    }

    /**
     * Moves the movable object to the left by decrementing its x-coordinate by the speedX property.
     *
     * @function moveLeft
     * @memberof MovableObject
     * @instance
     * @returns {void}
     */
    moveLeft() {
        this.x -= this.speedX;
    }

    /**
     * Plays an animation for the movable object by cycling through the provided images.
     *
     * @function playAnimation
     * @memberof MovableObject
     * @instance
     * @param {string[]} images - An array of image paths representing the animation frames.
     * @returns {void}
     */
    playAnimation(images) {
        if (this.currentImage >= images.length) {
            this.currentImage = 0;
        }
        let path = images[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    lastHit = 0;
    energy = 100;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;;
        }
    }

    // isColliding(object) {
    //     return (this.x + this.width) >= object.x && this.x <= (object.x + object.width) &&
    //         (this.y + this.height) >= object.y &&
    //         this.y <= (object.y + object.height);
    // }

    // isColliding(object) {
    //     return (this.x + this.width) >= object.X && this.X <= (object.X + object.width) &&
    //         (this.y + this.offsetY + this.height) >= object.y &&
    //         (this.y + this.offsetY) <= (object.y + object.height)
    //         // object.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    // }

    isColliding(object) {
        return this.x + this.width - this.offsetRight > object.x + object.offsetLeft &&
            this.y + this.height - this.offsetBottom > object.y + object.offsetTop &&
            this.x + this.offsetLeft < object.x + object.width - this.offsetRight &&
            this.y + this.offsetTop < object.y + object.height - this.offsetBottom;
    }

    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();;
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    moveRight() {
        this.x += this.speedX;
    }

    moveLeft() {
        this.x -= this.speedX;
    }

    jump() {
        this.speedY = 25;
        this.jumping_sound.playbackRate = 0.7;
        this.jumping_sound.play();
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}
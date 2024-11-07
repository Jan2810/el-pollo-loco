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

    isCollidingFromAbove(object) {
        return this.y + this.height - this.offsetBottom >= object.y + object.offsetTop &&
        this.speedY < 0;
    }

    isColliding(object) {
        return (this.x + this.width) - this.offsetRight >= object.x + object.offsetLeft &&
            (this.y + this.height) - this.offsetBottom >= object.y + object.offsetTop &&
            this.x + this.offsetLeft <= (object.x + object.width) - object.offsetRight &&
            this.y + this.offsetTop <= (object.y + object.height) - object.offsetBottom
    }

    hit() {
        this.energy -= 5;
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
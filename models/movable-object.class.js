class MovableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 150;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof BabyChicken || this instanceof Endboss || this instanceof Coin || this instanceof SalsaBottle) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        };
    }


    isColliding(object) {
        return (this.x + this.width) >= object.x && this.x <= (object.x + object.width) &&
            (this.y + this.height) >= object.y &&
            this.y <= (object.y + object.height);
    }

    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit =  new Date().getTime();;
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

    // isColliding(obj) {
    //     return (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) &&
    //         (this.Y + this.offsetY + this.height) >= obj.Y &&
    //         (this.Y + this.offsetY) <= (obj.Y + obj.height) &&
    //         obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    // }


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
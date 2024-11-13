class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbar = [
        new Bottlebar(),
        new Energybar(),
        new Coinbar(),
        new Endbossbar(),
    ];

    throwableObject = [];
    splashObject = [];
    // backgroundMusic = new Audio('audio/music.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        // this.playBackgroundMusic();
    }

    // playBackgroundMusic() {
    //     this.backgroundMusic.volume = 0.3;
    //     this.backgroundMusic.play();
    //     this.backgroundMusic.loop = true;
    // }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkBottleCollections();
            this.checkCoinCollections();
            this.throwObjects();
        }, 100);
    }

    throwObjects() {
        if (this.keyboard.D && this.statusbar[0].amount > 0) {
            let bottle = new ThrowableObject(this.character.x + 20, this.character.y + 200, this.keyboard);
            this.throwableObject.push(bottle);
            this.statusbar[0].reduceAmount();
            this.checkBottleCollision(bottle);
        }      // else play error sound
    }

    checkBottleCollision(bottle) {
        let interval = setInterval(() => {
            for (let i = 0; i < this.level.enemies.length; i++) {
                let enemy = this.level.enemies[i];
                if (bottle.isColliding(enemy) && (enemy instanceof Chicken || enemy instanceof BabyChicken)) {
                    this.killEnemy(enemy);
                    setTimeout(() => {
                        this.splashObject.splice(0, 1);
                    }, 300);
                    bottle.isActive = false;
                    clearInterval(interval);
                } else if (bottle.isColliding(enemy) && bottle.isActive && (enemy instanceof Endboss)) {
                    this.hurtEndboss(enemy, bottle);
                    setTimeout(() => {
                        this.splashObject.splice(0, 1);
                    }, 300);
                    clearInterval(interval);
                }
            }
        }, 10);
    }

    killEnemy(enemy) {
        enemy.isKilled = true;
        enemy.isActive = false;
        let splash = new SalsaSplash(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
        this.splashObject.push(splash);
    }

    hurtEndboss(enemy, bottle) {
        enemy.hitByBottle();
        enemy.isHurt = true;
        bottle.isActive = false;
        this.statusbar[3].setPercentage(enemy.energy);
        let splash = new SalsaSplash(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
        this.splashObject.push(splash);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isActive && this.character.speedY < 0 && this.character.isColliding(enemy)) {
                enemy.isKilled = true;
                enemy.isActive = false;
                this.character.bounce();
            } else if (enemy.isActive && this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbar[1].setPercentage(this.character.energy)
            }
        });
    }

    checkBottleCollections() {
        this.level.salsaBottle.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.salsaBottle.splice(index, 1);
                this.statusbar[0].increaseAmount();
            }
        });
    }

    checkCoinCollections() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.statusbar[2].increaseAmount();
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.salsaBottle);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.splashObject);

        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.statusbar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    addToMap(object) {
        if (object.otherDirection) {
            this.flipImage(object);
        }
        object.draw(this.ctx);
        object.drawFrame(this.ctx);
        object.drawCollisionFrame(this.ctx);

        if (object.otherDirection) {
            this.flipImageBack(object);
        }
    }

    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0)
        this.ctx.scale(-1, 1);
        object.x = object.x * -1
    }

    flipImageBack(object) {
        object.x = object.x * -1
        this.ctx.restore();
    }
}
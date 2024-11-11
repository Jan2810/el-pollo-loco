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
    ];

    throwableObject = [];
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
        setInterval(() => {
            for (let i = 0; i < this.level.enemies.length; i++) {
                let enemy = this.level.enemies[i];
                if (bottle.isColliding(enemy) && (enemy instanceof Chicken || enemy instanceof BabyChicken)) {
                    enemy.isKilled = true;
                    enemy.isActive = false;
                    bottle.playSplashAnimation(enemy.x, enemy.y);
                }
            }
        }, 10);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isActive && this.character.speedY < 0 && this.character.isColliding(enemy)) {
                enemy.isKilled = true;
                enemy.isActive = false;
                this.character.bounce();
                // console.log('is colliding with', enemy);
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
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
    chicken_dead_sound = new Audio('audio/chicken_dead.mp3');
    collectBottleSound = new Audio('audio/collect_bottle.mp3');
    collectCoinSound = new Audio('audio/collect_coin.mp3');

    throwableObject = [];
    splashObject = [];
    backgroundMusic = new Audio('audio/music.mp3');
    backgroundMusicEndboss = new Audio('audio/music_endboss.mp3');
    endboss_dead_sound = new Audio('audio/endboss_dead.mp3');

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
    //     setInterval(() => {
    //         if (this.character.x > 3300) {
    //             this.backgroundMusic.pause();
    //             this.backgroundMusicEndboss.volume = 0.3;
    //             this.backgroundMusicEndboss.play();
    //             this.backgroundMusicEndboss.loop = true;
    //         }
    //     }, 200);
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
        if (this.keyboard.D && !this.keyboard.keyIsDown && this.statusbar[0].amount > 0) {
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
                if (bottle.isColliding(enemy) && enemy.isActive && (enemy instanceof Chicken || enemy instanceof BabyChicken)) {
                    this.killEnemy(enemy);
                    this.splashBottle();
                    bottle.isActive = false;
                    clearInterval(interval);
                } else if (bottle.isColliding(enemy) && bottle.isActive && (enemy instanceof Endboss)) {
                    this.hurtEndboss(enemy, bottle);
                    this.splashBottle();
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

    splashBottle() {
        setTimeout(() => {
            this.splashObject.splice(0, 1);
        }, 300);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isActive && (enemy instanceof Chicken || enemy instanceof BabyChicken) && this.character.speedY < 0 && this.character.isColliding(enemy)) {
                enemy.isKilled = true;
                enemy.isActive = false;
                this.chicken_dead_sound.volume = 0.1;
                this.chicken_dead_sound.play();
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
                this.collectBottleSound.volume = 0.5;
                this.collectBottleSound.play();
            }
        });
    }

    checkCoinCollections() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.statusbar[2].increaseAmount();
                this.collectCoinSound.volume = 0.2;
                this.collectCoinSound.play();
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
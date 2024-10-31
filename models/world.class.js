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
        }, 200);
    }

    throwObjects() {
            if (this.keyboard.D && this.statusbar[0].amount > 0) {
                let bottle = new ThrowableObject(this.character.x + 20, this.character.y + 200, this.keyboard);
                this.throwableObject.push(bottle);
                this.statusbar[0].reduceAmount();
            }      // else play error sound
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
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
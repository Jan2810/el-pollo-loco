class World {
    gameIsMuted;
    character = new Character();
    level = level1;
    endboss = this.level.enemies[24];
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
    bottleThrow = true;

    chicken_dead_sound = new Audio('audio/chicken_dead.mp3');
    collect_bottle_sound = new Audio('audio/collect_bottle.mp3');
    collect_coin_sound = new Audio('audio/collect_coin.mp3');
    error_sound = new Audio('audio/error.mp3');
    background_music = new Audio('audio/music.mp3');
    background_music_endboss = new Audio('audio/music_endboss.mp3');
    endboss_dead_sound = new Audio('audio/endboss_dead.mp3');
    bottle_splash_sound = new Audio('audio/hit_bottle.mp3');

    constructor(canvas, keyboard, gameIsMuted) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.gameIsMuted = gameIsMuted;
        this.draw();
        this.setWorld();
        this.run();
        this.playBackgroundMusic();
    }
    
    /**
     * Sets the world context for the character and endboss.
     * This function is called when initializing the world to establish a reference to the world instance for the character and endboss.
     *
     * @function setWorld
     * @memberof World
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
     * Manages and controls the game's main loop.
     * This function is responsible for checking collisions, collecting objects, and throwing objects at regular intervals.
     *
     * @function run
     * @memberof World
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkBottleCollections();
            this.checkCoinCollections();
            this.throwObjects();
        }, 100);
    }

    /**
     * Toggles the game's mute status.
     * If the game is currently muted, it will unmute it, and vice versa.
     *
     * @function toggleMute
     * @memberof World
     */
    toggleMute() {
        if (this.gameIsMuted) {
            this.gameIsMuted = false;
        } else {
            this.gameIsMuted = true;
        }
    }

    /**
     * Manages and controls the background music of the game.
     * Changes the music based on the game's progression and mute status.
     *
     * @function playBackgroundMusic
     * @memberof World
     */
    playBackgroundMusic() {
        let endbossmusic = false;
        setInterval(() => {
            if (!this.gameIsMuted) {
                if (this.character.x > 2900) {
                    this.playEndbossMusic();
                    endbossmusic = true;
                } else if (endbossmusic == false) {
                    this.playLevelMusic();
                }
            } else if (this.gameIsMuted) {
                this.muteMusic();
            }
        }, 200);
    }

    /**
     * Manages and controls the background music of the game during the level.
     * Changes the music's volume and starts playing the music in a loop.
     *
     * @function playLevelMusic
     * @memberof World
     */
    playLevelMusic() {
        this.background_music.volume = 0.3;
        this.background_music.play();
        this.background_music.loop = true;
    }

    /**
     * Manages and controls the background music of the game during the endboss level.
     * Changes the music's volume and starts playing the music in a loop.
     *
     * @function playEndbossMusic
     * @memberof World
     */
    playEndbossMusic() {
        this.background_music.pause();
        this.background_music_endboss.volume = 0.3;
        this.background_music_endboss.play();
        this.background_music_endboss.loop = true;
    }

    /**
     * Manages and controls the background music of the game.
     * Pauses both the level music and the endboss music.
     *
     * @function muteMusic
     * @memberof World
     */
    muteMusic() {
        this.background_music.pause();
        this.background_music_endboss.pause();
    }

    /**
     * Manages and controls the throwing of objects by the character.
     *
     * @function throwObjects
     * @memberof World
     */
    throwObjects() {
        if (this.keyboard.D && this.canThrow && (this.statusbar[0].amount > 0)) {
            let bottle = new ThrowableObject(this.character.x + 20, this.character.y + 200, this.keyboard);
            this.throwableObject.push(bottle);
            this.statusbar[0].reduceAmount();
            this.checkBottleCollision(bottle);
            this.canThrow = false;
        } else if (this.keyboard.D && !this.statusbar[0].amount && !this.gameIsMuted) {
            this.error_sound.volume = 0.6;
            this.error_sound.play();
        }
        if (!this.keyboard.D) {
            this.canThrow = true;
        }
    }

    /**
     * Checks for collisions between the given bottle and enemies in the game world.
     *
     * @function checkBottleCollision
     * @memberof World
     * @param {ThrowableObject} bottle - The bottle object to check collisions with.
     */
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
                    if (!this.gameIsMuted) {
                        this.bottle_splash_sound.volume = 0.5;
                        this.bottle_splash_sound.play();
                    }
                    this.splashBottle();
                    clearInterval(interval);
                }
            }
        }, 10);
    }

    /**
     * Kills the given enemy by setting its 'isKilled' and 'isActive' properties to false.
     *
     * @function killEnemy
     * @memberof World
     * @param {Enemy} enemy - The enemy object to be killed.
     */
    killEnemy(enemy) {
        enemy.isKilled = true;
        enemy.isActive = false;
        let splash = new SalsaSplash(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
        if (!this.gameIsMuted) {
            this.bottle_splash_sound.volume = 0.5;
            this.bottle_splash_sound.play();
        }
        this.splashObject.push(splash);
    }

    /**
     * Handles the action when the character hits the endboss with a bottle.
     *
     * @function hurtEndboss
     * @memberof World
     * @param {Enemy} enemy - The endboss object to be hit.
     * @param {ThrowableObject} bottle - The bottle object used to hit the endboss.
     */
    hurtEndboss(enemy, bottle) {
        enemy.hitByBottle();
        enemy.isHurt = true;
        bottle.isActive = false;
        this.statusbar[3].setPercentage(enemy.energy);
        let splash = new SalsaSplash(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, this);
        this.splashObject.push(splash);
    }

    /**
     * Handles the action of creating a splash effect when a bottle hits an enemy.
     * Removes the first splash object from the 'splashObject' array after a 300ms delay.
     *
     * @function splashBottle
     * @memberof World
     */
    splashBottle() {
        setTimeout(() => {
            this.splashObject.splice(0, 1);
        }, 300);
    }

    /**
     * Checks for collisions between the character and enemies in the game world.
     *
     * @function checkCollisions
     * @memberof World
     */
    checkCollisions() {
        let enemyKilled = false;
        this.level.enemies.forEach((enemy) => {
            if (enemy.isActive && (enemy instanceof Chicken || enemy instanceof BabyChicken) && (this.character.speedY < 0) && this.character.isColliding(enemy)) {
                enemy.isKilled = true;
                enemy.isActive = false;
                enemyKilled = true;
                if (!this.gameIsMuted) {
                    this.chicken_dead_sound.volume = 0.1;
                    this.chicken_dead_sound.play();
                }
                this.character.bounce();
            }
            else if (!enemyKilled && enemy.isActive && this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbar[1].setPercentage(this.character.energy)
            }
        });
    }

    /**
     * Checks for collisions between the character and salsa bottles in the game world.
     *
     * @function checkBottleCollections
     * @memberof World
     */
    checkBottleCollections() {
        this.level.salsaBottle.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.salsaBottle.splice(index, 1); // Remove the collected salsa bottle from the array
                this.statusbar[0].increaseAmount(); // Increase the salsa bottle count in the status bar
                if (!this.gameIsMuted) {
                    this.collect_bottle_sound.volume = 0.5;
                    this.collect_bottle_sound.play(); // Play a sound when a salsa bottle is collected
                }
            }
        });
    }

    /**
     * Checks for collisions between the character and coins in the game world.
     *
     * @function checkCoinCollections
     * @memberof World
     */
    checkCoinCollections() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1); // Remove the collected coin from the array
                this.statusbar[2].increaseAmount(); // Increase the coin count in the status bar
                if (!this.gameIsMuted) {
                    this.collect_coin_sound.volume = 0.2;
                    this.collect_coin_sound.play(); // Play a sound when a coin is collected
                }
            }
        });
    }

    /**
     * Draws the game world
     *
     * @function draw
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMapSummary();
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

    /**
     * Adds objects to the game map based on their type (summary).
     * @function addObjectsToMapSummary
     */
    addObjectsToMapSummary() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.salsaBottle);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.splashObject);
    }


    /**
     * Adds objects to the game map.
     * This function iterates through the given array of objects and calls the addToMap function for each object.
     *
     * @function addObjectsToMap
     * @memberof World
     * @param {Array.<Object>} objects - An array of game objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    /**
     * Adds the given game object to the game map.
     *
     * @function addToMap
     * @memberof World
     * @param {Object} object - The game object to be added to the map.
     */
    addToMap(object) {
        if (object.otherDirection) {
            this.flipImage(object);
        }
        object.draw(this.ctx);
        // object.drawFrame(this.ctx);
        // object.drawCollisionFrame(this.ctx);

        if (object.otherDirection) {
            this.flipImageBack(object);
        }
    }

    /**
     * Flips the image of the given game object horizontally.
     * This function is used to draw the object in the opposite direction.
     *
     * @function flipImage
     * @memberof World
     * @param {Object} object - The game object to be flipped.
     */
    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    /**
     * Restores the context after flipping the image back to its original state.
     * This function is used to draw the object in the correct direction.
     */
    flipImageBack(object) {
        object.x = object.x * -1; // Restore the original x position of the object
        this.ctx.restore(); // Restore the context to its original state
    }
}
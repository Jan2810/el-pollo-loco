class Level {
    enemies;
    clouds;
    salsaBottle;
    coins;
    backgroundObjects;
    level_end_x = 3850;

    constructor(enemies, clouds, salsaBottle, coins, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.salsaBottle = salsaBottle;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}
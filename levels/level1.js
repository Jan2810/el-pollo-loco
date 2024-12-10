let level1;
async function initLevel() {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new BabyChicken(),
            new BabyChicken(),
            new BabyChicken(),
            new Endboss(this),
        ],
        [
            new Cloud('img/5_background/layers/4_clouds/1.png', 0),
            new Cloud('img/5_background/layers/4_clouds/2.png', 800),
            new Cloud('img/5_background/layers/4_clouds/1.png', 1800),
            new Cloud('img/5_background/layers/4_clouds/2.png', 2500),
            new Cloud('img/5_background/layers/4_clouds/1.png', 3200),
            new Cloud('img/5_background/layers/4_clouds/2.png', 4000),
            new Cloud('img/5_background/layers/4_clouds/1.png', 4900),
            new Cloud('img/5_background/layers/4_clouds/2.png', 5700),
            new Cloud('img/5_background/layers/4_clouds/1.png', 6500),
            new Cloud('img/5_background/layers/4_clouds/2.png', 7900),
        ],
        [
            new SalsaBottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 100),
            new SalsaBottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 100),
            new SalsaBottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 100),
            new SalsaBottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 100),
            new SalsaBottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 100),
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6),
        ],
    );
}
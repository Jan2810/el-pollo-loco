class Cloud extends MovableObject {

    y = 0;
    height = 480;
    width = 720;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x  = Math.random() * 200;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.1;
        },1000/60);
    }
}
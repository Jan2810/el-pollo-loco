class MovableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};

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
    
    moveRight(){
        console.log('Moving Right');
    }

    moveLeft() {
        
    }
}
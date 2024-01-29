class Music {
    constructor(title, singer, img, file) {
        this.title = title
        this.singer = singer
        this.img = img
        this.file = file
    }

    getName() {
        return this.title + " - " + this.singer
    }
}

const musicList = [
    new Music("Masal", "Motive", "1.jpg", "masal.mp3"),
    new Music("Kala Kal", "Motive", "1.jpg", "kalakal.mp3"),
    new Music("Bana Gayret", "Motive", "1.jpg", "banagayret.mp3"),
    new Music("Mentalité", "Baby Gang", "2.jpg", "mentalite.mp3")
]
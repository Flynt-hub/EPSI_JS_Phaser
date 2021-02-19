class Actor extends Phaser.GameObjects.Sprite {

    gameManager;
    spriteName;
    armor;
    lifePoint;

    constructor(gameManager, x, y, spriteName) {
        super(gameManager, x, y, spriteName);

        this.gameManager = gameManager;
        this.spriteName = spriteName;


    }

    move(direction) {
        // should move the object on screen

    }

    hitOther(cible) {


    }

    takeDammage(damage) {
        this.setLife(this.lifePoint - damage);
    }

    getLifePoint() {
        return this.lifePoint;
    }

    setLife(newLife) {
        this.lifePoint = newLife
    }
    getArmor(){
        return this.armor;
    }
    setArmor(newArmor){
        this.armor = newArmor;
    }


}
class Actor extends Phaser.GameObjects.Sprite
{

    constructor(gameManager, x, y, spriteName)
    {
        super(gameManager, x, y, spriteName);

        this.gameManager = gameManager;
        this.spriteName = spriteName;

        this.gameManager;
        this.spriteName;
        this.armor;
        this.lifePoint;
    }

    move(direction){
        // should move this object on screen

    }
    hitOther(cible){

    }
    takeDammage(damage){
        this.lifePoint = this.lifePoint - dammage;
    }

    getLifePoint(){
        return this.lifePoint;
    }

    setLife(newLife){
        this.   lifePoint = newLife
    }








}
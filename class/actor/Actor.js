class Actor extends Phaser.GameObjects.Sprite
{
    #gameManager;
    #spriteName;
    #armor;
    #lifePoint;

    constructor(gameManager, x, y, spriteName)
    {
        super(gameManager, x, y, spriteName)
        this.gameManager = gameManager;
        this.spriteName = spriteName;

    }

    move(direction){
        // should move this object on screen

    }
    hitOther(cible){

    }
    takeDammage(damage){
        this.lifePoint = this.#lifePoint - dammage;
    }

    getLifePoint(){
        return this.#lifePoint;
    }

    setLife(newLife){
        this.#lifePoint = newLife
    }








}
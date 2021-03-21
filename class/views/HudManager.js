class HudManager
{
    constructor( pPhaserContext )
    {
        this.mPhaserContext   = pPhaserContext ;
        this.mHealthBarBorder = null ;
        this.mHealthBar       = null ;
    }
    showHealthBar( pActorX, pActorY )
    {
        this.mHealthBarBorder = this.mPhaserContext.add.graphics() ;
        this.mHealthBarBorder.fillStyle( 0xD4AF37, 0.8 ) ;
        this.mHealthBarBorder.fillRect( pActorX, pActorY, 50, 20 ) ;

        this.mHealthBar = this.mPhaserContext.add.graphics() ;
        this.mHealthBar.fillStyle( 0xe50000, 1 ) ;
        this.mHealthBar.fillRect( pActorX, pActorY, 44, 14 ) ;
    }
    update( pActorX, pActorY )
    {
        this.mHealthBarBorder.setPosition( pActorX - 75, pActorY - 460 ) ;
        // this.mHealthBar.setPosition( pActorX - 72, pActorY - 457 ) ;
        this.mHealthBar.strokeRect( pActorX - 72, pActorY - 457, 44, 14 ) ;
    }
}
class HealthBar 
{

    constructor (scene, x, y)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = 46 / 100;

        this.draw();

        scene.add.existing(this.bar);
    }

    decrease (amount)
    {
        this.value -= amount;

        if (this.value < 0)
        {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }

    draw ()
    {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 50, 16);

        //  Health

        this.bar.fillStyle(0xD4AF37);
        this.bar.fillRect(this.x + 2, this.y + 2, 44, 12);

        if (this.value < 30)
        {
            this.bar.fillStyle(0xff0000);
        }
        else
        {
            this.bar.fillStyle(0xe50000);
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }
    update( pActorX, pActorY )
    {
        this.bar.setPosition(pActorX - 75, pActorY - 460) ;
    }

}
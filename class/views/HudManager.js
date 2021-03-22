class HealthBar 
{

    constructor ( pPhaserContext, pX, pY )
    {
        this.mBar = new Phaser.GameObjects.Graphics(pPhaserContext) ;

        this.mX = pX ;
        this.mY = pY ;
        this.pValue = 100 ;
        this.p = 46 / 100 ;

        this.draw() ;

        pPhaserContext.add.existing(this.mBar) ;
    }

    decrease (amount)
    {
        this.pValue -= amount ;

        if ( this.pValue < 0 )
        {
            this.pValue = 0 ;
        }

        this.draw() ;

        return ( this.pValue === 0 ) ;
    }

    draw ()
    {
        this.mBar.clear() ;

        //  BG
        this.mBar.fillStyle(0x000000) ;
        this.mBar.fillRect( this.mX, this.mY, 50, 16 ) ;

        //  Health

        this.mBar.fillStyle(0xD4AF37) ;
        this.mBar.fillRect( this.mX + 2, this.mY + 2, 44, 12 ) ;

        if (this.pValue < ( 0.3 * this.pValue ) )
        {
            this.mBar.fillStyle(0xff0000) ;
        }
        else
        {
            this.mBar.fillStyle(0xe50000) ;
        }

        let lDepth = Math.floor( this.p * this.pValue ) ;

        this.mBar.fillRect( this.mX + 2, this.mY + 2, lDepth, 12 ) ;
    }
    update( pActorX, pActorY )
    {
        this.mBar.setPosition( pActorX , pActorY ) ;
    }

}
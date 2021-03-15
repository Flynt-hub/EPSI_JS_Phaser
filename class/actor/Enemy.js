class Enemy extends Actor
{
    constructor( pPhaserContext, pX, pY, pKey, pFrame, pName )
    {
        super( pPhaserContext, pX, pY, pKey, pFrame ) ;
        this.setData( 'healthPoint', 60 ) ;
        this.setData( 'name', pName ) ;
        this.displayWidth  = 100 ;
        this.displayHeight = 100 ;
        // this.setBounce(0.2) ;
        // this.setCollideWorldBounds(true) ;
        this.body.setGravityY(300) ;
        this.body.setSize( 400, 550 ) ;
    }
}
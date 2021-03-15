class Actor extends Phaser.GameObjects.Sprite 
{
    constructor( pPhaserContext, pX, pY, pKey, pFrame )
    {
        super( pPhaserContext, pX, pY, pKey, pFrame ) ;
        this.mPhaserContext = pPhaserContext ;
        this.mPhaserContext.add.existing(this) ;
        this.mPhaserContext.physics.add.existing(this)
        // this.mPhaserContext.physics.world.enableBody( this, 0 ) ;
        this.setData( "isAlive", true) ;
        this.setData( "moveVelocity", 160 ) ;
        this.setData( "jumpVelocity", -450 ) ;
    }
}
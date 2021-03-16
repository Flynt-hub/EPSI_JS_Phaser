class Actor extends Phaser.Physics.Arcade.Sprite
{
    constructor( pPhaserContext, pX, pY, pKey, pFrame )
    {
        super( pPhaserContext, pX, pY, pKey, pFrame ) ;
        this.mPhaserContext = pPhaserContext ;
        this.mPhaserContext.add.existing( this ) ;
        this.mPhaserContext.physics.world.enableBody( this, 0 ) ;
        this.setCollideWorldBounds(true);

        this.setData( "isAlive", true) ;
        this.setData( "moveVelocity", 160 ) ;
        this.setData( "jumpVelocity", -450 ) ;

    }
}

class Sword extends Phaser.GameObjects.Sprite
{
    constructor( pPhaserContext, pX, pY )
    {
        super( pPhaserContext, pX, pY, '', '' ) ;
        this.mPhaserContext = pPhaserContext ;
        this.setData( 'damages', 10) ;
        this.mPhaserContext.add.existing( this ) ;
        this.mPhaserContext.physics.world.enableBody( this, 0 ) ;
        this.body.setSize( 5, 5 ) ;
        this.body.setAllowGravity( false ) ;
        this.displayWidth  = 10 ;
        this.displayHeight = 10 ;
    }
}
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
        this.mHealthBarBorder.fillStyle( 0x222222, 0.8 ) ;
        this.mHealthBarBorder.fillRect( pActorX, pActorY, 50, 20 ) ;
    }
    update( pActorX, pActorY )
    {
        this.mHealthBarBorder.setPosition(pActorX, pActorY)
    }
}
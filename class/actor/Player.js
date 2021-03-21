class Player extends Actor
{
    constructor( pPhaserContext, pX, pY, pKey, pFrame )
    {
        super( pPhaserContext, pX, pY, pKey, pFrame ) ;

        this.setData( 'healthPoint', 100 ) ;
        this.setData( 'name', 'knight' ) ;
        this.setData( 'hit', false ) ;
        this.displayWidth  = 100 ;
        this.displayHeight = 100 ;
        this.setBounce(0.2) ;
        this.body.setGravityY(300) ;
        this.body.setSize( 340, 550 ) ;        
    }
    update()
    {
        if( this.body.touching.down )
        {
            this.body.velocity.x = 0 ;
            if ( !this.mIsHitting ) { this.anims.play( 'knightIdle' , true ) ; }
        }
    }
    onDestroy()
    {
        this.scene.time.addEvent( {
          delay: 50,
          callback: function() {
            this.scene.scene.start( "SceneEnd" ) ;
          },
          callbackScope: this,
          loop: false
        } ) ;
    }
}
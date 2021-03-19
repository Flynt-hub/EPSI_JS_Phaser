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
    attack()
    {
        if ( this.mIsHitting === false )
        {
            this.mIsHitting      = true ;
            let lSword           = null ;
            const lIsFacingRight = this.flipX ;
            
            this.once( 'animationcomplete', () => {
                this.mIsHitting = false ;
            }, this ) ;
            if ( this.body.touching.down ) { this.anims.play( 'knightSlashing' , true ) ; }
            else { this.anims.play( this.getData( 'name' ) + 'Slashing in The Air' , true ) ; }
            this.mPhaserContext.time.delayedCall( 150, () => {                       
                if ( lIsFacingRight ) { lSword = new Sword( this.mPhaserContext, this.x - 30, this.y ) ; }
                else { lSword = new Sword( this.mPhaserContext, this.x + 30, this.y ) ; }
                this.mPhaserContext.mPlayerSword.add( lSword ) ;
            } ) ;
            this.mPhaserContext.time.delayedCall( 300, () => {                       
                if(this.mPhaserContext.mPlayerSword.children.entries.length > 0) { this.mPhaserContext.mPlayerSword.children.entries[0].destroy() ; }                
            } ) ;
            
        }
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
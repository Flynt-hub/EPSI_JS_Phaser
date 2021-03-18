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
        this.mIsHitting = false ;
    }
    moveRight() 
    {
        this.body.velocity.x = this.getData( "moveVelocity" ) ;
        this.flipX           = false ;
        this.anims.play( 'knightRunning', true ) ;
    }
    moveLeft() 
    {
        this.body.velocity.x = -this.getData( "moveVelocity" ) ;
        this.flipX           = true ;
        this.anims.play( 'knightRunning', true ) ;
    }
    moveUp()
    {
        this.body.velocity.y = this.getData( "jumpVelocity" ) ;
        this.anims.play( 'knightJump Loop' , true ) ;
    }
    attack()
    {
        if ( this.mIsHitting === false )
        {
            this.mIsHitting = true ;
            
            let lSword = null ;
            const lIsFacingRight = this.flipX ;
            if ( lIsFacingRight ) { lSword = new Sword( this.mPhaserContext, this.x - 30, this.y ) ; }
            else { lSword = new Sword( this.mPhaserContext, this.x + 30, this.y ) ; }
            this.mPhaserContext.mPlayerSword.add( lSword ) ;
            this.mPhaserContext.time.delayedCall( 200, () => {                       
                if(this.mPhaserContext.mPlayerSword.children.entries.length > 0) { this.mPhaserContext.mPlayerSword.children.entries[0].destroy() ; }                
            } ) ;
            this.anims.play( 'knightSlashing' , true ) ;
            
        }
    }
    update()
    {
        if( this.anims.getProgress() === 1 ) { this.mIsHitting = false ; }
        if( !this.mIsHitting )
        {
            this.body.velocity.x = 0 ;            
            this.anims.play( 'knightIdle' , true ) ;
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
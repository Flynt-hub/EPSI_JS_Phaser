class Player extends Actor
{
    constructor( pPhaserContext, pX, pY, pKey, pFrame )
    {
        super( pPhaserContext, pX, pY, pKey, pFrame ) ;  
        this.mPhaserContext = pPhaserContext ;       
        this.setData( 'healthPoint', 100 ) ;
        this.setData( 'name', 'knight' ) ;
        this.setData( 'hit', false ) ;
        this.displayWidth  = 100 ;
        this.displayHeight = 100 ;
        // this.setBounce(0.2) ;
        // this.setCollideWorldBounds(true) ;
        this.body.setGravityY( 300 ) ;
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
        let lSword = null ;
        const lIsFacingRight = this.flipX ;
        if ( lIsFacingRight ) { lSword = new Sword( this.mPhaserContext, this.x - 20, this.y ) ; }
        else { lSword = new Sword( this.mPhaserContext, this.x + 20, this.y ) ; }
        this.mPhaserContext.mPlayerSword.add( lSword ) ;
        console.log(this.mPhaserContext.mPlayerSword) ;
        this.mPhaserContext.time.delayedCall( 200, () => {
            // lSword.setActive(false);
            // lSword.setVisible(false) ;
            this.mPhaserContext.mPlayerSword.children.entries[0].destroy() ;
        } ) ;
        this.anims.play( 'knightSlashing' , true ) ;
    }
    update()
    {
        this.body.velocity.x = 0 ;
        this.anims.play( 'knightIdle' , true ) ;
    }
    ondestroy()
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
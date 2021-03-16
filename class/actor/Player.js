class Player extends Actor
{
    constructor( pPhaserContext, pX, pY, pKey, pFrame )
    {
        super( pPhaserContext, pX, pY, pKey, pFrame ) ;

        this.setData( 'healthPoint', 100 ) ;
        this.setData( 'name', 'knight' ) ;
        this.displayWidth  = 100 ;
        this.displayHeight = 100 ;
         this.setBounce(0.2) ;

        this.body.setGravityY(300) ;
        this.body.setSize( 340, 550 ) ;
    }
    moveRight() 
    {
        this.body.velocity.x = this.getData("moveVelocity") ;
        this.flipX           = false ;
        this.anims.play( 'knightRunning', true ) ;
    }
    moveLeft() 
    {
        this.body.velocity.x = -this.getData("moveVelocity") ;
        this.flipX           = true ;
        this.anims.play( 'knightRunning', true ) ;
    }
    moveUp()
    {
        this.body.velocity.y = this.getData("jumpVelocity") ;
        this.anims.play( 'knightJump Loop' , true ) ;
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
            this.scene.scene.start("SceneEnd") ;
          },
          callbackScope: this,
          loop: false
        } ) ;
    }
}
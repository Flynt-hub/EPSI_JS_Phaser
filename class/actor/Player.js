class Player extends Actor
{
    constructor( pScene, pX, pY, pKey, pFrame )
    {
        super( pScene, pX, pY, pKey, pFrame ) ;        
        this.setData( 'healthPoint', 100 ) ;
        this.setData( 'name', 'knight' ) ;
        this.displayWidth  = 100 ;
        this.displayHeight = 100 ;
        //this.setBounce(0.2) ;
        //this.setCollideWorldBounds(true) ;
        this.body.setGravityY(300) ;
        // this.body.setSize( 340, 550 ) ;
    }
    moveRight() 
    {
        this.body.velocity.x = this.getData("moveVelocity") ;
    }
    moveLeft() 
    {
        this.body.velocity.x = -this.getData("moveVelocity") ;
    }
    moveUp()
    {
        this.body.velocity.y = -this.getData("jumpVelocity") ;
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
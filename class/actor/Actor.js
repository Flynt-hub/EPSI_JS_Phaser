class Actor extends Phaser.Physics.Arcade.Sprite
{
    constructor( pPhaserContext, pX, pY, pKey, pFrame )
    {
        super( pPhaserContext, pX, pY, pKey, pFrame ) ;
        this.mPhaserContext = pPhaserContext ;
        this.mPhaserContext.add.existing( this ) ;
        this.mPhaserContext.physics.world.enableBody( this, 0 ) ;
        this.setCollideWorldBounds(true);

        this.mIsHitting = false ;
        this.setData( "isAlive", true ) ;
        this.setData( "moveVelocity", 160 ) ;
        this.setData( "jumpVelocity", -450 ) ;
    }
    moveLeft() 
    {
        this.body.velocity.x = -this.getData( "moveVelocity" ) ;
        this.flipX           = true ;
        if ( this.body.touching.down ) 
        {
            if ( this.mIsHitting ){ this.anims.play( this.getData('name') + 'Run Slashing' , true ) ; }
            else { this.anims.play( this.getData('name') + 'Running', true ) ; }
        }
    }
    moveRight() 
    {
        this.body.velocity.x = this.getData( "moveVelocity" ) ;
        this.flipX           = false ;        
        if ( this.body.touching.down ) 
        {
            if ( this.mIsHitting ){ this.anims.play( this.getData('name') + 'Run Slashing' , true ) ; }
            else { this.anims.play( this.getData('name') + 'Running', true ) ; }
        }
    }
    moveUp()
    {
        this.body.velocity.y = this.getData( "jumpVelocity" ) ;
        this.once( 'animationcomplete', (e) => {
            this.anims.play( this.getData('name') + 'Jump Loop' , true ) ;
            console.log(e.getLastFrame()) ;
        }, this ) ;
        this.anims.play( this.getData('name') + 'Jump Start' , true ) ;
    }
    takeDamage( pDamageAmount )
    {
        this.setData( 'healthPoint', this.getData( 'healthPoint' ) - pDamageAmount ) ;
        if ( this.getData( 'healthPoint' ) <= 0 ) { this.die() ; }
    }
    die()
    {
        this.setData( 'isAlive', false ) ;
        console.log( this.getData('isAlive') ) ;
        this.anims.play( this.getData('name') + 'Dying', true ) ;
        this.on( 'animationcomplete', () => { this.disableBody( true, false ) ; }, this ) ;
    }
}

class Sword extends Phaser.GameObjects.Sprite
{
    constructor( pPhaserContext, pX, pY )
    {
        super( pPhaserContext, pX, pY, '', '' ) ;
        this.mPhaserContext = pPhaserContext ;
        this.setData( 'damages', 100 ) ;
        this.mPhaserContext.add.existing( this ) ;
        this.mPhaserContext.physics.world.enableBody( this, 0 ) ;
        this.body.setSize( 25, 40 ) ;
        this.setVisible(false) ;
        this.body.setAllowGravity( false ) ;
    }
    hit( pTarget )
    {
        pTarget.takeDamage( this.getData( 'damages' ) ) ;
    }
}
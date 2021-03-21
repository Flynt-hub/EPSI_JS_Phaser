class Actor extends Phaser.Physics.Arcade.Sprite
{
    constructor( pPhaserContext, pX, pY, pKey, pFrame )
    {
        super( pPhaserContext, pX, pY, pKey, pFrame ) ;
        this.mPhaserContext = pPhaserContext ;
        this.mPhaserContext.add.existing( this ) ;
        this.mPhaserContext.physics.world.enableBody( this, 0 ) ;
        this.setCollideWorldBounds(true);

        this.mIsHitting   = false ;
        this.mIsSuffering = false ;
        this.setData( "isAlive", true ) ;
        this.setData( "moveVelocity", 160 ) ;
        this.setData( "jumpVelocity", -450 ) ;

        this.mWhooshCounter = 3 ; // used to get sword attack sounds

        this.mHealthBar = new HudManager( pPhaserContext ) ;
        this.mHealthBar.showHealthBar( this.x, this.y ) ;
    }
    moveLeft() 
    {
        this.body.velocity.x = -this.getData( "moveVelocity" ) ;
        this.flipX           = true ;
        if ( this.body.touching.down && !this.mIsSuffering ) 
        {
            if ( this.mIsHitting ){ this.anims.play( this.getData('name') + 'Run Slashing' , true ) ; }
            else { this.anims.play( this.getData('name') + 'Running', true ) ; }
        }
    }
    moveRight() 
    {
        this.body.velocity.x = this.getData( "moveVelocity" ) ;
        this.flipX           = false ;        
        if ( this.body.touching.down && !this.mIsSuffering ) 
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
    attack()
    {
        if ( this.mIsHitting === false )
        {
            this.mPhaserContext.sound.sounds[ this.mWhooshCounter ].play() ;
            ++this.mWhooshCounter ;
            this.mWhooshCounter = this.mWhooshCounter > 9 ? 3 : this.mWhooshCounter ;
            this.mIsHitting      = true ;
            let lSword           = null ;
            const lIsFacingRight = this.flipX ;
            
            this.once( 'animationcomplete', () => {
                this.mIsHitting = false ;
            }, this ) ;
            if ( this.body.touching.down ) { this.anims.play( this.getData( 'name' ) + 'Slashing' , true ) ; }
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
    takeDamage( pDamageAmount )
    {
        this.mIsSuffering = true ;

        this.once( 'animationcomplete', () => {
            this.mIsSuffering = false ;
        }, this ) ;
        this.anims.play( this.getData('name') + 'Hurt' , true ) ;

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
    update()
    {
        if( this.body.touching.down )
        {
            this.body.velocity.x = 0 ;
            if ( !this.mIsHitting ) { this.anims.play( this.getData( 'name' ) + 'Idle' , true ) ; }
        }
    }
}

class Sword extends Phaser.GameObjects.Sprite
{
    constructor( pPhaserContext, pX, pY )
    {
        super( pPhaserContext, pX, pY, '', '' ) ;
        this.mPhaserContext = pPhaserContext ;
        this.setData( 'damages', 50 ) ;
        this.mPhaserContext.add.existing( this ) ;
        this.mPhaserContext.physics.world.enableBody( this, 0 ) ;
        this.body.setSize( 25, 40 ) ;
        this.setVisible( false ) ;
        this.body.setAllowGravity( false ) ;
    }
    hit( pTarget )
    {
        pTarget.takeDamage( this.getData( 'damages' ) ) ;
    }
}
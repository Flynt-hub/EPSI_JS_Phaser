class Enemy extends Actor
{
    constructor( pPhaserContext, pX, pY, pKey, pFrame, pName )
    {
        super( pPhaserContext, pX, pY, pKey, pFrame ) ;
        this.setData( 'healthPoint', 100 ) ;
        this.setData( 'name', pName ) ;
        this.displayWidth  = 100 ;
        this.displayHeight = 100 ;
        this.body.setGravityY( 300 ) ;
        this.body.setSize( 400, 550 ) ;
    }
    AI( pPlayer, pImportantMapPoints ) 
    {   
        const lDeltaX = pPlayer.body.position.x - this.body.position.x ;
        const lDeltaY = pPlayer.body.position.y - this.body.position.y ;
    
        const lPlayerIsAtRight      = lDeltaX > 100 ;
        const lPlayerIsAtLeft       = lDeltaX < -100 ;
        const lPlayerIsUpper        = lDeltaY < -50 ;
        const lPlayerIsCloseToRight = lDeltaX > 0 && lDeltaX < 100 && lDeltaY > -50 && lDeltaY < 50 ;
        const lPlayerIsCloseToLeft  = lDeltaX < 0 && lDeltaX > -100 && lDeltaY > -50 && lDeltaY < 50 ;
        if ( lPlayerIsAtRight && !lPlayerIsUpper )
        {
            this.moveRight() ;
        }
        else if ( lPlayerIsAtLeft && !lPlayerIsUpper )
        {
            this.moveLeft() ;
        }    
        if ( lPlayerIsUpper && this.body.touching.down )
        {
            const lEnemyIsAtGround  = this.body.position.y < ( pImportantMapPoints.groundToPlatform1.y + 10 ) && this.body.position.y > ( pImportantMapPoints.groundToPlatform1.y - 10 ) ;
            const lEnemyIsPlatform1 = this.body.position.y < ( pImportantMapPoints.platform1ToPlatform2.y + 10 ) && this.body.position.y > ( pImportantMapPoints.platform1ToPlatform2.y - 10 ) ;
            const lEnemyIsPlatform2 = this.body.position.y < ( pImportantMapPoints.platform2ToPlatform3.y + 10 ) && this.body.position.y > ( pImportantMapPoints.platform2ToPlatform3.y - 10 ) ;
            const a = pImportantMapPoints.groundToPlatform1.y + 10 ;
            const b = pImportantMapPoints.groundToPlatform1.y - 10 ;
            console.log("mummy y : " + this.body.position.y + "ground interval : [" + a + " - " + b + "]") ;
            if ( lEnemyIsAtGround )
            {
                const lEnemyIsLeftToGroundPoint  = this.body.position.x > pImportantMapPoints.groundToPlatform1.xMax ;
                const lEnemyIsRightToGroundPoint = this.body.position.x < pImportantMapPoints.groundToPlatform1.xMin ;
                const lEnemyIsWellPlacedToJump   = this.body.position.x > pImportantMapPoints.groundToPlatform1.xMin && this.body.position.x < pImportantMapPoints.groundToPlatform1.xMax ;
                if( lEnemyIsLeftToGroundPoint )
                {
                    this.moveLeft() ;
                    console.log("ground : going to left") ;
                }
                else if( lEnemyIsRightToGroundPoint )
                {
                    this.moveRight() ;
                    console.log("ground : going to right") ;
                }
                else if( lEnemyIsWellPlacedToJump )
                {
                    this.moveUp() ;
                    this.moveRight() ;
                    console.log("ground : well placed") ;
                }            
            }
            else if ( lEnemyIsPlatform1 )
            {
                const lEnemyIsLeftToPlatform1Point  = this.body.position.x > pImportantMapPoints.platform1ToPlatform2.xMax ;
                const lEnemyIsRightToPlatform1Point = this.body.position.x < pImportantMapPoints.platform1ToPlatform2.xMin ;
                const lEnemyIsWellPlacedToJump      = this.body.position.x > pImportantMapPoints.platform1ToPlatform2.xMin && this.body.position.x < pImportantMapPoints.platform1ToPlatform2.xMax ;
                if( lEnemyIsLeftToPlatform1Point )
                {
                    this.moveLeft() ;
                    console.log("platform1 : going to right") ;
                }
                else if( lEnemyIsRightToPlatform1Point )
                {
                    this.moveRight() ;
                    console.log("platform1 : going to left") ;
                }
                else if( lEnemyIsWellPlacedToJump )
                {
                    this.moveUp() ;
                    this.moveLeft() ;
                    console.log("platform1 : well placed") ;
                }  
            }
            else if ( lEnemyIsPlatform2 )
            {
                const lEnemyIsLeftToPlatform2Point  = this.body.position.x > pImportantMapPoints.platform2ToPlatform3.xMax ;
                const lEnemyIsRightToPlatform2Point = this.body.position.x < pImportantMapPoints.platform2ToPlatform3.xMin ;
                const lEnemyIsWellPlacedToJump      = this.body.position.x > pImportantMapPoints.platform2ToPlatform3.xMin && this.body.position.x < pImportantMapPoints.platform2ToPlatform3.xMax ;
                if( lEnemyIsLeftToPlatform2Point )
                {
                    this.moveLeft() ;
                    console.log("platform2 : going to left") ;
                }
                else if( lEnemyIsRightToPlatform2Point )
                {
                    this.moveRight() ;
                    console.log("platform2 : going to right") ;
                }
                else if( lEnemyIsWellPlacedToJump )
                {
                    this.moveUp() ;
                    this.moveRight() ;
                    console.log("platform2 : well placed") ;
                }
            }
        }
        if ( lPlayerIsCloseToRight && !this.mIsSuffering  )
        {
            // this.anims.play( this.getData( 'name' ) + 'Slashing', true ) ;
            this.attack() ;
        }
        else if ( lPlayerIsCloseToLeft && !this.mIsSuffering  )
        {
            // this.anims.play( this.getData( 'name' ) + 'Slashing', true ) ;
            this.attack() ;
        }
    }
}
class GameManager
{
    constructor( pPhaserContext )
    {
        this.mAssetsLoader = new AssetsLoader( pPhaserContext ) ;
        this.mActorManager = new ActorManager( pPhaserContext ) ;
        this.mIsPlayerCreated = false ;
        this.mIsMummyCreated = false ;
        this.mPhaserContext = pPhaserContext ;        
    }
    loadAssets( pSprites )
    {
        switch ( pSprites ) 
        {
            case 'mainMenu':
                this.mAssetsLoader.loadMainMenuAssets() ;
                break;
            case 'level1':
                this.mAssetsLoader.loadLevel1Assets() ;
                break ;
            case 'playerSprites':
                this.mAssetsLoader.loadPlayerAssets() ;
                break ;
            case 'mummySprites':
                this.mAssetsLoader.loadMummyAssets() ;                
                break ;
            default:
                break;
        }
    }
    createPlayer()
    {
        if ( !this.mIsPlayerCreated )
        {
            this.mIsPlayerCreated = true ;
            this.createAnimationsSequences('player') ;
            return new Player(this.mPhaserContext, 50, 400, 'knightIdle000' ) ;
        }
        return false ;
    }
    createMummy()
    {
        if ( !this.mIsMummyCreated )
        {
            this.createAnimationsSequences('mummy') ;
            this.mIsMummyCreated = true ;
            return new Enemy(this.mPhaserContext, 700, 200, 'mummyIdle000', '', 'mummy' ) ;
        }
        return false ;
    }
    createAnimationsSequences( pActor )
    {
        switch (pActor)
        {
            case 'player':
                this.setAnimationSequences( 'Idle', 18, -1, 'knight' ) ;
                this.setAnimationSequences( 'Dying', 15, 0, 'knight' ) ;
                this.setAnimationSequences( 'Falling Down', 6, 0, 'knight' ) ;
                this.setAnimationSequences( 'Hurt', 12, 0, 'knight' ) ;
                this.setAnimationSequences( 'Jump Loop', 6, 0, 'knight' ) ;
                this.setAnimationSequences( 'Jump Start', 6, 0, 'knight' ) ;
                this.setAnimationSequences( 'Kicking', 12, 0, 'knight' ) ;
                this.setAnimationSequences( 'Run Slashing', 12, 0, 'knight' ) ;
                this.setAnimationSequences( 'Run Throwing', 12, 0, 'knight' ) ;
                this.setAnimationSequences( 'Running', 12, -1, 'knight' ) ;
                this.setAnimationSequences( 'Slashing', 12, 0, 'knight' ) ;
                this.setAnimationSequences( 'Slashing in The Air', 12, 0, 'knight' ) ;
                this.setAnimationSequences( 'Sliding', 6, 1, 'knight' ) ;
                this.setAnimationSequences( 'Throwing', 12, 0, 'knight' ) ;
                this.setAnimationSequences( 'Throwing in The Air', 12, 0, 'knight' ) ;
                break;
            case 'mummy':
                this.setAnimationSequences( 'Idle', 18, -1, 'mummy' ) ;
                this.setAnimationSequences( 'Dying', 15, 0, 'mummy' ) ;
                this.setAnimationSequences( 'Falling Down', 6, 1, 'mummy' ) ;
                this.setAnimationSequences( 'Hurt', 12, 1, 'mummy' ) ;
                this.setAnimationSequences( 'Jump Loop', 6, 1, 'mummy' ) ;
                this.setAnimationSequences( 'Jump Start', 6, 1, 'mummy' ) ;
                this.setAnimationSequences( 'Kicking', 12, 1, 'mummy' ) ;
                this.setAnimationSequences( 'Run Slashing', 12, 1, 'mummy' ) ;
                this.setAnimationSequences( 'Run Throwing', 12, 1, 'mummy' ) ;
                this.setAnimationSequences( 'Running', 12, -1, 'mummy' ) ;
                this.setAnimationSequences( 'Slashing', 12, 1, 'mummy' ) ;
                this.setAnimationSequences( 'Slashing in The Air', 12, 1, 'mummy' ) ;
                this.setAnimationSequences( 'Sliding', 6, 1, 'mummy' ) ;
                this.setAnimationSequences( 'Throwing', 12, 1, 'mummy' ) ;
                this.setAnimationSequences( 'Throwing in The Air', 12, 1, 'mummy' ) ;
                break ;
            default:
                break;
        }
    }
    setAnimationSequences( pAnimationName, pNumberOfSequences, pSequenceRepeatNumber, pModelName )
    {
        let lKeyFrame        = function( pKeyName ){this.key = pKeyName ; } ;
        let lAnimationKeyTab = [] ; 
    
        for (let i = 0; i < pNumberOfSequences; ++i) 
        {
            let lKeyName = pModelName + pAnimationName  + '0' ;
            if ( i < 10 )
            {
                lAnimationKeyTab.push( new lKeyFrame( lKeyName + '0' + i ) ) ;
            }
            else
            {
                lAnimationKeyTab.push( new lKeyFrame( lKeyName + i ) ) ;
            }
        }
        this.mPhaserContext.anims.create(
            {
                key: pModelName + pAnimationName,
                frames: lAnimationKeyTab,
                frameRate: 15,
                repeat: pSequenceRepeatNumber
            }
        ) ; 
    }
}
class AssetsLoader
{
    constructor(pPhaserContext)
    {
        this.mPhaserContext = pPhaserContext ;
    }

    setPhaserContext(pPhaserContext)
    {
        this.mPhaserContext = pPhaserContext ;
    }    

    loadMainMenuAssets()
    {
        this.mPhaserContext.load.image( 'startButton', 'assets/Gui/startButton.png' ) ;
        this.mPhaserContext.load.image( 'startButtonPushed', 'assets/Gui/startButtonPushed.png' ) ;
        this.mPhaserContext.load.image( 'mainMenuBackground', 'assets/Gui/mainMenuBackground.jpg' ) ;
    }
    loadLevel1Assets()
    {
        this.mPhaserContext.load.image('volcanoBackground00', './assets/Volcano Level Set/PNG/Background/Volcano Level Set_Background - Layer 00.png') ;
        this.mPhaserContext.load.image('volcanoBackground01', './assets/Volcano Level Set/PNG/Background/Volcano Level Set_Background - Layer 01.png') ;

        this.mPhaserContext.load.image( 'Volcano Ground 01', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 01.png') ;
        this.mPhaserContext.load.image( 'Volcano Ground 02', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 02.png') ;
        this.mPhaserContext.load.image( 'Volcano Ground 03', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 03.png') ;
        this.mPhaserContext.load.image( 'Volcano Ground 04', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 04.png') ;
        this.mPhaserContext.load.image( 'Volcano Ground 05', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 05.png') ;
        this.mPhaserContext.load.image( 'Volcano Ground 06', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 06.png') ;
        this.mPhaserContext.load.image( 'Volcano Ground 07', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 07.png') ;
        this.mPhaserContext.load.image( 'Volcano Ground 08', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 08.png') ;
        this.mPhaserContext.load.image( 'Volcano Ground 09', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 09.png') ;
        this.mPhaserContext.load.image( 'Volcano Ground 10', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 10.png') ;
        this.mPhaserContext.load.image( 'Volcano Ground 11', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 11.png') ;
        this.mPhaserContext.load.image( 'Volcano Ground 12', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 12.png') ;
            
        this.mPhaserContext.load.image( 'Volcano Ground Additional 01', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground Additional 01.png') ;
        this.mPhaserContext.load.image( 'Volcano Ground Additional 02', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground Additional 02.png') ;
        this.mPhaserContext.load.image( 'Volcano Ground Additional 03', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground Additional 03.png') ;
        this.mPhaserContext.load.image( 'Volcano Ground Additional 04', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground Additional 04.png') ;
        this.mPhaserContext.load.image( 'Volcano Ground Additional 05', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground Additional 05.png') ;
        this.mPhaserContext.load.image( 'Volcano Ground Additional 06', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground Additional 06.png') ;
        this.mPhaserContext.load.image( 'Volcano Ground Additional 07', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground Additional 07.png') ;
            
        this.mPhaserContext.load.image( 'Volcano Ladder', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ladder.png') ;
        this.mPhaserContext.load.image( 'Volcano Wooden Barrel', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Wooden Barrel.png') ;
        this.mPhaserContext.load.image( 'Volcano Wooden Box', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Wooden Box.png') ;
    }
    loadPlayerAssets()
    {
        const lKnightAnimationFolderName = 'Templar Knight' ;

        this.loadAnimationSequences( 'Idle', 18, lKnightAnimationFolderName, 'knight' ) ;
        this.loadAnimationSequences( 'Dying', 15, lKnightAnimationFolderName, 'knight' ) ;
        this.loadAnimationSequences( 'Falling Down', 6, lKnightAnimationFolderName, 'knight' ) ;
        this.loadAnimationSequences( 'Hurt', 12, lKnightAnimationFolderName, 'knight' ) ;
        this.loadAnimationSequences( 'Jump Loop', 6, lKnightAnimationFolderName, 'knight' ) ;
        this.loadAnimationSequences( 'Jump Start', 6, lKnightAnimationFolderName, 'knight' ) ;
        this.loadAnimationSequences( 'Kicking', 12, lKnightAnimationFolderName, 'knight' ) ;
        this.loadAnimationSequences( 'Run Slashing', 12, lKnightAnimationFolderName, 'knight' ) ;
        this.loadAnimationSequences( 'Run Throwing', 12, lKnightAnimationFolderName, 'knight' ) ;
        this.loadAnimationSequences( 'Running', 12, lKnightAnimationFolderName, 'knight' ) ;
        this.loadAnimationSequences( 'Slashing', 12, lKnightAnimationFolderName, 'knight' ) ;
        this.loadAnimationSequences( 'Slashing in The Air', 12, lKnightAnimationFolderName, 'knight' ) ;
        this.loadAnimationSequences( 'Sliding', 6, lKnightAnimationFolderName, 'knight' ) ;
        this.loadAnimationSequences( 'Throwing', 12, lKnightAnimationFolderName, 'knight' ) ;
        this.loadAnimationSequences( 'Throwing in The Air', 12, lKnightAnimationFolderName, 'knight' ) ;
        this.loadAnimationSequences( 'Walking', 24, lKnightAnimationFolderName, 'knight' ) ;
    
    }
    loadMummyAssets()
    {
        const lMummyAnimationFolderName  = 'Egyptian Mummy' ;

        this.loadAnimationSequences( 'Idle', 18, lMummyAnimationFolderName, 'mummy' ) ;
        this.loadAnimationSequences( 'Idle Blinking', 18, lMummyAnimationFolderName, 'mummy' ) ;
        this.loadAnimationSequences( 'Dying', 15, lMummyAnimationFolderName, 'mummy' ) ;
        this.loadAnimationSequences( 'Falling Down', 6, lMummyAnimationFolderName, 'mummy' ) ;
        this.loadAnimationSequences( 'Hurt', 12, lMummyAnimationFolderName, 'mummy' ) ;
        this.loadAnimationSequences( 'Jump Loop', 6, lMummyAnimationFolderName, 'mummy' ) ;
        this.loadAnimationSequences( 'Jump Start', 6, lMummyAnimationFolderName, 'mummy' ) ;
        this.loadAnimationSequences( 'Kicking', 12, lMummyAnimationFolderName, 'mummy' ) ;
        this.loadAnimationSequences( 'Run Slashing', 12, lMummyAnimationFolderName, 'mummy' ) ;
        this.loadAnimationSequences( 'Run Throwing', 12, lMummyAnimationFolderName, 'mummy' ) ;
        this.loadAnimationSequences( 'Running', 12, lMummyAnimationFolderName, 'mummy' ) ;
        this.loadAnimationSequences( 'Slashing', 12, lMummyAnimationFolderName, 'mummy' ) ;
        this.loadAnimationSequences( 'Slashing in The Air', 12, lMummyAnimationFolderName, 'mummy' ) ;
        this.loadAnimationSequences( 'Sliding', 6, lMummyAnimationFolderName, 'mummy' ) ;
        this.loadAnimationSequences( 'Throwing', 12, lMummyAnimationFolderName, 'mummy' ) ;
        this.loadAnimationSequences( 'Throwing in The Air', 12, lMummyAnimationFolderName, 'mummy' ) ;
        this.loadAnimationSequences( 'Walking', 24, lMummyAnimationFolderName, 'mummy' ) ;

    }
    loadAnimationSequences( pAnimationName, pNumberOfSequences, pFolderName, pModelName)
    {
        for (let i = 0; i < pNumberOfSequences; ++i) 
        {
            let lPath = './assets/' + pFolderName + '/PNG/PNG Sequences/' + pAnimationName + '/' + pAnimationName + '_0' ;
            let lKey = pModelName + pAnimationName  + '0' ;
            if ( i < 10 )
            {
                lKey  += '0' + i ;
                lPath += '0' + i + '.png' ;
                this.mPhaserContext.load.image( lKey, lPath ) ;
            }
            else
            {
                lKey  += i ;
                lPath += i + '.png' ;
                this.mPhaserContext.load.image( lKey, lPath ) ;
            }
        }
    }
    loadMainMenuTheme()
    {
        this.mPhaserContext.load.audio('mainMenuTheme', './assets/music/music_epic_heroes_story.wav') ;
        this.mPhaserContext.load.audio('startNotification', './assets/music/LQ_Positive_Notification.wav') ;
    }
    loadLevel1Audios()
    {
        this.mPhaserContext.load.audio('level1Theme', './assets/music/BRPG_Hell_Spawn_FULL_Loop.wav') ;
        this.mPhaserContext.load.audio('swordHit1', './assets/music/sword_hit_impact_01.wav') ;
        this.mPhaserContext.load.audio('swordWhoosh1', './assets/music/PP_Whoosh_1_1.wav') ;
        this.mPhaserContext.load.audio('swordHit2', './assets/music/sword_hit_impact_02.wav') ;
        this.mPhaserContext.load.audio('swordWhoosh2', './assets/music/PP_Whoosh_1_2.wav') ;
        this.mPhaserContext.load.audio('swordHit3', './assets/music/sword_hit_impact_03.wav') ;
        this.mPhaserContext.load.audio('swordWhoosh3', './assets/music/PP_Whoosh_1_3.wav') ;
        this.mPhaserContext.load.audio('swordHit4', './assets/music/sword_hit_impact_04.wav') ;
    }
}

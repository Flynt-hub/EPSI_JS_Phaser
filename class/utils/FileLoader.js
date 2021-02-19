class FileLoader
{
    constructor(pPhaserGame)
    {
        this.mPhaserGame = pPhaserGame ;
        this.mLevelSprites = [] ;
        this.mEnemiesSprites = [] ;
        this.mPlayerSprites = "le/chemin/qui/va/bien.png" ;
    }

    setPhaserContext(pPhaserContext)
    {
        this.mPhaserContext = pPhaserContext ;
    }

    loadSpriteForPlayer()
    {
        if ( this.mPhaserContext !== undefined && this.mPhaserContext !== null)
        {
            this.mPhaserContext.load.image('knightIdle000', './assets/Templar Knight/PNG/PNG Sequences/Idle/Idle_000') ;
            this.mPhaserContext.load.image('knightIdle001', './assets/Templar Knight/PNG/PNG Sequences/Idle/Idle_001') ;
            this.mPhaserContext.load.image('knightIdle002', './assets/Templar Knight/PNG/PNG Sequences/Idle/Idle_002') ;
            this.mPhaserContext.load.image('knightIdle003', './assets/Templar Knight/PNG/PNG Sequences/Idle/Idle_003') ;
            this.mPhaserContext.load.image('knightIdle004', './assets/Templar Knight/PNG/PNG Sequences/Idle/Idle_003') ;
            this.mPhaserContext.load.image('knightIdle005', './assets/Templar Knight/PNG/PNG Sequences/Idle/Idle_004') ;
            this.mPhaserContext.load.image('knightIdle006', './assets/Templar Knight/PNG/PNG Sequences/Idle/Idle_005') ;
            this.mPhaserContext.load.image('knightIdle007', './assets/Templar Knight/PNG/PNG Sequences/Idle/Idle_006') ;
            this.mPhaserContext.load.image('knightIdle008', './assets/Templar Knight/PNG/PNG Sequences/Idle/Idle_007') ;
            this.mPhaserContext.load.image('knightIdle009', './assets/Templar Knight/PNG/PNG Sequences/Idle/Idle_008') ;
            this.mPhaserContext.load.image('knightIdle010', './assets/Templar Knight/PNG/PNG Sequences/Idle/Idle_009') ;
            this.mPhaserContext.load.image('knightIdle011', './assets/Templar Knight/PNG/PNG Sequences/Idle/Idle_010') ;
            this.mPhaserContext.load.image('knightIdle012', './assets/Templar Knight/PNG/PNG Sequences/Idle/Idle_011') ;
            this.mPhaserContext.load.image('knightIdle013', './assets/Templar Knight/PNG/PNG Sequences/Idle/Idle_012') ;
            this.mPhaserContext.load.image('knightIdle014', './assets/Templar Knight/PNG/PNG Sequences/Idle/Idle_013') ;
            this.mPhaserContext.load.image('knightIdle015', './assets/Templar Knight/PNG/PNG Sequences/Idle/Idle_014') ;
            this.mPhaserContext.load.image('knightIdle016', './assets/Templar Knight/PNG/PNG Sequences/Idle/Idle_015') ;
            this.mPhaserContext.load.image('knightIdle017', './assets/Templar Knight/PNG/PNG Sequences/Idle/Idle_016') ;
            this.mPhaserContext.load.image('knightIdle018', './assets/Templar Knight/PNG/PNG Sequences/Idle/Idle_017') ;
        }
    }
}
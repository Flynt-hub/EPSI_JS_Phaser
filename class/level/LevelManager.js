class LevelManager
{
    constructor()
    {
        this.mLevels = [] ;
    }

    setPhaserContext(pPhaserContext)
    {
        this.mPhaserContext = pPhaserContext ;
    }
    addLevel(pLevel)
    {
        this.mLevels.push(pLevel) ;
    }
    createFirstLevel()
    {
        this.mPhaserGame.push( new Level(this.mPhaserContext, 1) ) ;
    }
}
class LevelManager
{
    constructor(pPhaserGame)
    {
        this.mPhaserGame = pPhaserGame ;
        this.mLevels = [] ;
    }

    addLevel(pLevel)
    {
        this.mLevels.push(pLevel) ;
    }
    createFirstLevel(pPhaserGame)
    {
        this.mPhaserGame.push( new Level(pPhaserGame, 1) ) ;
    }
}
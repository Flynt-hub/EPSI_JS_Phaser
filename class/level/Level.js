class Level
{
    constructor(pPhaserGame, pLevelNumber)
    {
        this.mLevelNumber = pLevelNumber ;
        this.mPhaserGame = pPhaserGame ;
    }

    loadLevel()
    {
        if( this.mLevelNumber !== undefined )
        {
            switch ( this.mLevelNumber ) 
            {
                case 1:
                    this.loadFirstLevel() ;
                    break;
                case 2:
                    break;
                default:
                    console.log("Level number have unhandled number") ;
                    alert("erreur... veuillez recharger la page")
                    break;
            }
        }
    }
    loadFirstLevel()
    {
        //this.mPhaserGame.load
    }
}
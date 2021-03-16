class MainMenu extends Phaser.Scene
{
    constructor()
    {
        super( { key: "MainMenu", active: true } ) ;
        this.GameManager = new GameManager( this ) ;
    }
    preload()
    {
        this.GameManager.loadAssets('mainMenu') ;
    }
    create()
    {
        this.add.image( 400, 170, 'mainMenuBackground' ) ;  
        this.start = this.add.sprite( this.game.config.width * 0.5,
                                      this.game.config.height * 0.50,
                                      'startButton' ) ;  
                                      
        this.start.setInteractive() ;

        this.start.on( 'pointerdown', () => {
            this.start.setTexture('startButtonPushed') ;
        }, this ) ;

        this.start.on( 'pointerup', () => {
            this.start.setTexture('startButton') ;
            this.scene.start('Level1') ;
          }) ;
    }
}
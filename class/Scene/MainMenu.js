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
        this.GameManager.loadAssets('mainMenuTheme') ;
    }
    create()
    {
        let MainMenuTheme = this.sound.add( 'mainMenuTheme', { loop: true, volume: 0.5} ) ;
        let startNotification = this.sound.add( 'startNotification', { loop: false, volume: 0.5} ) ;

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
            startNotification.play()
            MainMenuTheme.stop() ;
          }) ;

        MainMenuTheme.play() ; 
    }
}
class Win extends Phaser.Scene
{
    constructor()
    {
        super( { key: "Win", active: false } ) ;
        this.GameManager = new GameManager( this ) ;
    }
    preload()
    {
        this.GameManager.loadAssets('Win') ;
    }
    create()
    {
        let lBackground = this.add.image( this.sys.canvas.width/2, this.sys.canvas.height/2, 'WinBackground' ) ;
        lBackground.setScale( 0.5 ) ;
    }
}
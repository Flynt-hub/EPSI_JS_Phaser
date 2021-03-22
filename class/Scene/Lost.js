class Lost extends Phaser.Scene
{
    constructor()
    {
        super( { key: "Lost", active: false } ) ;
        this.GameManager = new GameManager( this ) ;
    }
    preload()
    {
        this.GameManager.loadAssets('Lost') ;
    }
    create()
    {
        let lBackground = this.add.image( this.sys.canvas.width/2, this.sys.canvas.height/2, 'LostBackground' ) ;
        lBackground.setScale( 0.5 ) ;
    }
}
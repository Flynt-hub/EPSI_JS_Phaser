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
        let lBackground = this.add.image( 400, 170, 'LostBackground' ) ;
        lBackground.setScale( 0.5 ) ;
    }
}
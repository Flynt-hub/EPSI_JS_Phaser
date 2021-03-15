class Level1 extends Phaser.Scene
{
    constructor()
    {
        super( { key: "Level1" } ) ;

        this.GameManager = new GameManager( this ) ;
        this.mPlatform   = null ;
        this.mPlayer     = null ;
        this.mMummy      = null ;
    }
    preload()
    {
        let lProgressBar = this.add.graphics() ;
        let lProgressBox = this.add.graphics() ;
        var lWidth       = this.cameras.main.width ;
        let lHeight      = this.cameras.main.height ;
        let lLoadingText = this.make.text({
            x: lWidth / 2,
            y: lHeight / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        }) ;
        let lPercentText = this.make.text({
            x: lWidth / 2,
            y: lHeight / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        }) ;
        let lAssetText = this.make.text({
            x: lWidth / 2,
            y: lHeight / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        }) ;

        lAssetText.setOrigin(0.5, 0.5) ;
        lPercentText.setOrigin(0.5, 0.5) ;
        lLoadingText.setOrigin(0.5, 0.5) ;
        lProgressBox.fillStyle( 0x222222, 0.8 ) ;
        lProgressBox.fillRect( 240, 270, 320, 50 ) ;

        this.load.on('progress', function (pValue) 
        {
            lProgressBar.clear() ;
            lProgressBar.fillStyle( 0xffffff, 1 ) ;
            lProgressBar.fillRect( 250, 280, 300 * pValue, 30 ) ;
            lPercentText.setText(parseInt(pValue * 100) + '%') ;
        });                
        this.load.on('fileprogress', function (pFile) 
        {
            lAssetText.setText('Loading asset: ' + pFile.src.split('/')[ pFile.src.split('/').length - 5 ]) ;
        });     
        this.load.on('complete', function () 
        {
            lProgressBar.destroy() ;
            lProgressBox.destroy() ;
            lLoadingText.destroy() ;
            lPercentText.destroy();
            lAssetText.destroy();
        });

        this.GameManager.loadAssets('level1') ;
        this.GameManager.loadAssets('playerSprites') ;
        this.GameManager.loadAssets('mummySprites') ;
    }
    create()
    {
        let connard = this.GameManager.getPlayer() ;
        // this.mPlayer.setTexture('knightIdle000') ;
        console.log(this.textures) ; 
        //this.mPlayer.play('knightIdle') ;
        // debugger ;
        this.mMummy  = this.GameManager.getMummy() ;

        this.add.image( this.sys.canvas.width/2, this.sys.canvas.height/2, 'volcanoBackground00' ) ;
        this.add.image( this.sys.canvas.width/2, this.sys.canvas.height/2, 'volcanoBackground01' ) ;

        this.setPlatform() ;   

        this.physics.add.collider( this.mPlayer, this.mPlatform ) ;
        this.physics.add.collider( this.mMummy, this.mPlatform ) ;
        this.physics.add.collider( this.mMummy, this.mPlayer ) ;

        console.log(this);
    }

    setPlatform()
    {        
        this.mPlatform = this.physics.add.staticGroup() ;
        for (let i = 0; i < 13 ; ++i) 
        {
            let lOffsetX = (32 + 64 * i) ;
            this.mPlatform.create( lOffsetX, 568, ('Volcano Ground 02') ).setScale(0.5).refreshBody() ;        
        }
        this.mPlatform.create( 400 , 400, ('Volcano Ground 10') ).setScale(0.25).refreshBody() ;
        for (let i = 0; i < 12 ; ++i) 
        {
            let lOffsetX = (432 + 32 * i) ;
            this.mPlatform.create( lOffsetX , 400, ('Volcano Ground 11') ).setScale(0.25).refreshBody() ;        
        }
        this.mPlatform.create( 273 , 250, ('Volcano Ground 12') ).setScale(0.25).refreshBody() ;
        for (let i = 0; i < 8 ; ++i) 
        {
            let lOffsetX = (16 + 32 * i) ;
            this.mPlatform.create( lOffsetX , 250, ('Volcano Ground 11') ).setScale(0.25).refreshBody() ;        
        }
        this.mPlatform.create( 558 , 220, ('Volcano Ground 10') ).setScale(0.25).refreshBody() ;
        for (let i = 0; i < 7 ; ++i) 
        {
            let lOffsetX = (590 + 32 * i) ;
            this.mPlatform.create( lOffsetX , 220, ('Volcano Ground 11') ).setScale(0.25).refreshBody() ;        
        }
    }    
}
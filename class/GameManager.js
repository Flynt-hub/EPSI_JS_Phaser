class GameManager extends Phaser.Scene
{
    constructor ()
    {
        super();
        this.mPlatforms;
        this.mScore = 0 ;
        this.mScoreText ;
        this.mBombs ;
        this.mLevelManager = new LevelManager() ;
        this.mFileLoader = new FileLoader() ;
    }

    preload ()
    {
        this.mLevelManager.setPhaserContext(this) ;
        this.mFileLoader.setPhaserContext(this) ;
        this.mFileLoader.loadSpriteForPlayer() ;
    
        this.load.image('sky', './assets/sky.png');
        this.load.image('ground', './assets/platform.png');
        this.load.image('star', './assets/star.png');
        this.load.image('bomb', './assets/bomb.png');
        this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    
        this.load.image('volcanoBackground', './assets/Volcano Level Set/PNG/Background/Volcano Level Set_Background - Layer 00.png') ;
    }
    create ()
    {
        this.add.image(this.sys.canvas.width/2, this.sys.canvas.height/2, 'volcanoBackground');
        this.platforms = this.physics.add.staticGroup();
    
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');    
        
        this.anims.create(
            {
                key: 'idle',
                frames: [
                    {key: 'knightIdle000'},
                    {key: 'knightIdle001'},
                    {key: 'knightIdle002'},
                    {key: 'knightIdle003'},
                    {key: 'knightIdle004'},
                    {key: 'knightIdle005'},
                    {key: 'knightIdle006'},
                    {key: 'knightIdle007'},
                    {key: 'knightIdle008'},
                    {key: 'knightIdle009'},
                    {key: 'knightIdle010'},
                    {key: 'knightIdle011'},
                    {key: 'knightIdle012'},
                    {key: 'knightIdle013'},
                    {key: 'knightIdle014'},
                    {key: 'knightIdle015'},
                    {key: 'knightIdle016'},
                    {key: 'knightIdle017'}
                ],
                frameRate: 15,
                repeat: -1
            }
        ) ;
        this.player = this.physics.add.sprite(80, 225, 'knightIdle000').play('idle').setScale(0.1);    
    
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(300)
            
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
            
        this.physics.add.collider(this.player, this.platforms);
        
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update ()
    {

    }
}
const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
const DEFAULT_HEIGHT = 720 // any height you want
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    physics: {
        default: 'arcade',
        fps: 30
    },
    scene: [ GameManager ]
};
const game = new Phaser.Game(config);
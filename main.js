/*
const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
const DEFAULT_HEIGHT = 720 // any height you want
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT
var config = {
    type: Phaser.AUTO,//it try to use phaser.webGL, if failed then use Phaser.CANVAS
    //width: 800,
    //height: 600,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    }, 
    physics: 
    {
        default: 'arcade',
        arcade: 
        {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: 
    {
        preload: preload,
        create: create,
        update: update
    },
};
*/
//var game = new Phaser.Game(config);
var platforms;
var score = 0 ;
var scoreText ;
var bombs ;
var lLevelManager = new LevelManager() ;
var lFileLoader = new FileLoader() ;

function preload ()
{
    lLevelManager.setPhaserContext(this) ;
    lFileLoader.setPhaserContext(this) ;
    lFileLoader.loadSpriteForPlayer() ;

    this.load.image('sky', './assets/sky.png');
    this.load.image('ground', './assets/platform.png');
    this.load.image('star', './assets/star.png');
    this.load.image('bomb', './assets/bomb.png');
    this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 });

    this.load.image('volcanoBackground', './assets/Volcano Level Set/PNG/Background/Volcano Level Set_Background - Layer 00.png') ;
    console.log(this);
}

function create ()
{
    console.log(this) ;
    this.add.image(this.sys.canvas.width/2, this.sys.canvas.height/2, 'volcanoBackground');
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');


    //player = this.physics.add.sprite(100, 450, 'dude');
    



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

    player = this.physics.add.sprite(80, 225, 'knightIdle000').play('idle').setScale(0.1);    

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300)
   /* 
    this.anims.create(
    {
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create(
    {
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create(
    {
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

*/
    stars = this.physics.add.group(
    {
        key: 'star',
        repeat: 11,// 12 stars
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    
    bombs = this.physics.add.group();

    
    stars.children.iterate(function (child) 
    {
        
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        
    });
    
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    
    this.physics.add.collider(bombs, platforms);   
    this.physics.add.collider(player, bombs, hitBomb, null, this);
    this.physics.add.collider(stars, stars) ;
    this.physics.add.collider(stars, platforms) ;
    this.physics.add.collider(player, platforms);

    this.physics.add.overlap(player, stars, collectStar, null, this) ;
    cursors = this.input.keyboard.createCursorKeys();
}

function update ()
{
    //player.anims.play('idle', true) ;
    /*
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }
*/
    if (cursors.space.isDown /*&& player.body.touching.down*/)
    {
        player.setVelocityY(-450);
    }
}

function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
}

function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}
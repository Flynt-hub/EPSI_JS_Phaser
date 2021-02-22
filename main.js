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

let game = new Phaser.Game(config);
let platforms ;
let player ;
let cursor ;

let gKeyA ;
let gKeyZ ;
let gKeyE ;
let gKeyR ;
let gKeyT ;
let gKeyY ;
let gKeyQ ;
let gKeyS ;
let gKeyD ;
let gKeyF ;
let gKeyG ;
let gKeyH ;

function preload()
{
    this.load.image('volcanoBackground', './assets/Volcano Level Set/PNG/Background/Volcano Level Set_Background - Layer 00.png') ;
    this.load.image('ground', './assets/platform.png');

    loadKnightAnimationSequences( this, 'Idle', 18 ) ;
    loadKnightAnimationSequences( this, 'Dying', 15 ) ;
    loadKnightAnimationSequences( this, 'Falling Down', 6 ) ;
    loadKnightAnimationSequences( this, 'Hurt', 12 ) ;
    loadKnightAnimationSequences( this, 'Jump Loop', 6 ) ;
    loadKnightAnimationSequences( this, 'Jump Start', 6 ) ;
    loadKnightAnimationSequences( this, 'Kicking', 12 ) ;
    loadKnightAnimationSequences( this, 'Run Slashing', 12 ) ;
    loadKnightAnimationSequences( this, 'Run Throwing', 12 ) ;
    loadKnightAnimationSequences( this, 'Running', 12 ) ;
    loadKnightAnimationSequences( this, 'Slashing', 12 ) ;
    loadKnightAnimationSequences( this, 'Slashing in The Air', 12 ) ;
    loadKnightAnimationSequences( this, 'Sliding', 6 ) ;
    loadKnightAnimationSequences( this, 'Throwing', 12 ) ;
    loadKnightAnimationSequences( this, 'Throwing in The Air', 12 ) ;
    loadKnightAnimationSequences( this, 'Walking', 24 ) ;

}

function create()
{
    this.add.image(this.sys.canvas.width/2, this.sys.canvas.height/2, 'volcanoBackground');
    
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    createKnightAnimationSequences( this, 'Idle', 18, -1 ) ;
    createKnightAnimationSequences( this, 'Dying', 15, 1 ) ;
    createKnightAnimationSequences( this, 'Falling Down', 6, 1 ) ;
    createKnightAnimationSequences( this, 'Hurt', 12, 1 ) ;
    createKnightAnimationSequences( this, 'Jump Loop', 6, 1 ) ;
    createKnightAnimationSequences( this, 'Jump Start', 6, 1 ) ;
    createKnightAnimationSequences( this, 'Kicking', 12, 1 ) ;
    createKnightAnimationSequences( this, 'Run Slashing', 12, 1 ) ;
    createKnightAnimationSequences( this, 'Run Throwing', 12, 1 ) ;
    createKnightAnimationSequences( this, 'Running', 12, -1 ) ;
    createKnightAnimationSequences( this, 'Slashing', 12, 1 ) ;
    createKnightAnimationSequences( this, 'Slashing in The Air', 12, 1 ) ;
    createKnightAnimationSequences( this, 'Sliding', 6, 1 ) ;
    createKnightAnimationSequences( this, 'Throwing', 12, 1 ) ;
    createKnightAnimationSequences( this, 'Throwing in The Air', 12, 1 ) ;
/*
    this.anims.create(
        {
            key: 'Idle',
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
    */
    console.log(this.anims) ;

    player = this.physics.add.sprite(50, 200, 'knightIdle000').play('Idle').setScale(0.15);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300); 

    this.physics.add.collider(player, platforms);

    gKeyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A) ;
    gKeyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z) ;
    gKeyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E) ;
    gKeyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R) ;
    gKeyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T) ;
    gKeyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y) ;
    gKeyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q) ;
    gKeyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S) ;
    gKeyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D) ;
    gKeyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F) ;
    gKeyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G) ;
    gKeyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H) ;
    
    cursors = this.input.keyboard.createCursorKeys();

}

function update()
{
    
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
        player.flipX = true ;
        player.anims.play( 'Running', true ) ;
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.flipX = false ;        
        player.anims.play( 'Running', true ) ;
    }
    else if ( gKeyA.isDown ) { player.anims.play( 'Dying' , true) ; }
    else if ( gKeyZ.isDown ) { player.anims.play( 'Falling Down' , true) ; }
    else if ( gKeyE.isDown ) { player.anims.play( 'Hurt' , true) ; }
    else if ( gKeyE.isDown ) { player.anims.play( 'Jump Start' , true) ; }
    else if ( gKeyR.isDown ) { player.anims.play( 'Jump Loop' , true) ; }
    else if ( gKeyT.isDown ) { player.anims.play( 'Kicking' , true) ; }
    else if ( gKeyY.isDown ) { player.anims.play( 'Run Slashing' , true) ; }
    else if ( gKeyQ.isDown ) { player.anims.play( 'Run Throwing' , true) ; }
    else if ( gKeyS.isDown ) { player.anims.play( 'Slashing' , true) ; }
    else if ( gKeyD.isDown ) { player.anims.play( 'Slashing in The Air' , true) ; }
    else if ( gKeyF.isDown ) { player.anims.play( 'Sliding' , true) ; }
    else if ( gKeyG.isDown ) { player.anims.play( 'Throwing' , true) ; }
    else if ( gKeyH.isDown ) { player.anims.play( 'Throwing in The Air' , true) ; }
    else
    {
        player.setVelocityX(0) ;
        player.anims.play( 'Idle', true ) ;
    }

    if (cursors.space.isDown /*&& player.body.touching.down*/)
    {
        player.setVelocityY(-450);
    }
}

function loadKnightAnimationSequences(pContext, pAnimationName, pNumberOfSequences)
{
    for (let i = 0; i < pNumberOfSequences; ++i) 
    {
        let lPath = './assets/Templar Knight/PNG/PNG Sequences/' + pAnimationName + '/' + pAnimationName + '_0' ;
        let lKey = 'knight' + pAnimationName  + '0' ;
        if ( i < 10 )
        {
            lKey  += '0' + i ;
            lPath += '0' + i + '.png' ;
            pContext.load.image( lKey, lPath ) ;
        }
        else
        {
            lKey  += i ;
            lPath += i + '.png' ;
            pContext.load.image( lKey, lPath ) ;
        }
    }
}
function createKnightAnimationSequences( pContext, pAnimationName, pNumberOfSequences, pSequenceRepeatNumber )
{
    let lKeyFrame        = function( pKeyName ){this.key = pKeyName ; } ;
    let lAnimationKeyTab = [] ; 

    for (let i = 0; i < pNumberOfSequences; ++i) 
    {
        let lKeyName = 'knight' + pAnimationName  + '0' ;
        if ( i < 10 )
        {
            lAnimationKeyTab.push( new lKeyFrame( lKeyName + '0' + i ) ) ;
        }
        else
        {
            lAnimationKeyTab.push( new lKeyFrame( lKeyName + i ) ) ;
        }
    }
    pContext.anims.create(
        {
            key: pAnimationName,
            frames: lAnimationKeyTab,
            frameRate: 15,
            repeat: pSequenceRepeatNumber
        }
    ) ;
}
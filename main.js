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
            debug: true
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
let gEnemyMummy ;
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
    let lKnightAnimationFolderName = 'Templar Knight' ;
    let lMummyAnimationFolderName  = 'Egyptian Mummy' ;
    
    this.load.image('volcanoBackground', './assets/Volcano Level Set/PNG/Background/Volcano Level Set_Background - Layer 00.png') ;
    this.load.image('ground', './assets/platform.png');

    loadAnimationSequences( this, 'Idle', 18, lKnightAnimationFolderName, 'knight' ) ;
    loadAnimationSequences( this, 'Dying', 15, lKnightAnimationFolderName, 'knight' ) ;
    loadAnimationSequences( this, 'Falling Down', 6, lKnightAnimationFolderName, 'knight' ) ;
    loadAnimationSequences( this, 'Hurt', 12, lKnightAnimationFolderName, 'knight' ) ;
    loadAnimationSequences( this, 'Jump Loop', 6, lKnightAnimationFolderName, 'knight' ) ;
    loadAnimationSequences( this, 'Jump Start', 6, lKnightAnimationFolderName, 'knight' ) ;
    loadAnimationSequences( this, 'Kicking', 12, lKnightAnimationFolderName, 'knight' ) ;
    loadAnimationSequences( this, 'Run Slashing', 12, lKnightAnimationFolderName, 'knight' ) ;
    loadAnimationSequences( this, 'Run Throwing', 12, lKnightAnimationFolderName, 'knight' ) ;
    loadAnimationSequences( this, 'Running', 12, lKnightAnimationFolderName, 'knight' ) ;
    loadAnimationSequences( this, 'Slashing', 12, lKnightAnimationFolderName, 'knight' ) ;
    loadAnimationSequences( this, 'Slashing in The Air', 12, lKnightAnimationFolderName, 'knight' ) ;
    loadAnimationSequences( this, 'Sliding', 6, lKnightAnimationFolderName, 'knight' ) ;
    loadAnimationSequences( this, 'Throwing', 12, lKnightAnimationFolderName, 'knight' ) ;
    loadAnimationSequences( this, 'Throwing in The Air', 12, lKnightAnimationFolderName, 'knight' ) ;
    loadAnimationSequences( this, 'Walking', 24, lKnightAnimationFolderName, 'knight' ) ;

    loadAnimationSequences( this, 'Idle', 18, lMummyAnimationFolderName, 'mummy' ) ;
    loadAnimationSequences( this, 'Idle Blinking', 18, lMummyAnimationFolderName, 'mummy' ) ;
    loadAnimationSequences( this, 'Dying', 15, lMummyAnimationFolderName, 'mummy' ) ;
    loadAnimationSequences( this, 'Falling Down', 6, lMummyAnimationFolderName, 'mummy' ) ;
    loadAnimationSequences( this, 'Hurt', 12, lMummyAnimationFolderName, 'mummy' ) ;
    loadAnimationSequences( this, 'Jump Loop', 6, lMummyAnimationFolderName, 'mummy' ) ;
    loadAnimationSequences( this, 'Jump Start', 6, lMummyAnimationFolderName, 'mummy' ) ;
    loadAnimationSequences( this, 'Kicking', 12, lMummyAnimationFolderName, 'mummy' ) ;
    loadAnimationSequences( this, 'Run Slashing', 12, lMummyAnimationFolderName, 'mummy' ) ;
    loadAnimationSequences( this, 'Run Throwing', 12, lMummyAnimationFolderName, 'mummy' ) ;
    loadAnimationSequences( this, 'Running', 12, lMummyAnimationFolderName, 'mummy' ) ;
    loadAnimationSequences( this, 'Slashing', 12, lMummyAnimationFolderName, 'mummy' ) ;
    loadAnimationSequences( this, 'Slashing in The Air', 12, lMummyAnimationFolderName, 'mummy' ) ;
    loadAnimationSequences( this, 'Sliding', 6, lMummyAnimationFolderName, 'mummy' ) ;
    loadAnimationSequences( this, 'Throwing', 12, lMummyAnimationFolderName, 'mummy' ) ;
    loadAnimationSequences( this, 'Throwing in The Air', 12, lMummyAnimationFolderName, 'mummy' ) ;
    loadAnimationSequences( this, 'Walking', 24, lMummyAnimationFolderName, 'mummy' ) ;

}

function create()
{
    this.add.image(this.sys.canvas.width/2, this.sys.canvas.height/2, 'volcanoBackground');
    
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    createAnimationSequences( this, 'Idle', 18, -1, 'knight' ) ;
    createAnimationSequences( this, 'Dying', 15, 1, 'knight' ) ;
    createAnimationSequences( this, 'Falling Down', 6, 1, 'knight' ) ;
    createAnimationSequences( this, 'Hurt', 12, 1, 'knight' ) ;
    createAnimationSequences( this, 'Jump Loop', 6, 1, 'knight' ) ;
    createAnimationSequences( this, 'Jump Start', 6, 1, 'knight' ) ;
    createAnimationSequences( this, 'Kicking', 12, 1, 'knight' ) ;
    createAnimationSequences( this, 'Run Slashing', 12, 1, 'knight' ) ;
    createAnimationSequences( this, 'Run Throwing', 12, 1, 'knight' ) ;
    createAnimationSequences( this, 'Running', 12, -1, 'knight' ) ;
    createAnimationSequences( this, 'Slashing', 12, 1, 'knight' ) ;
    createAnimationSequences( this, 'Slashing in The Air', 12, 1, 'knight' ) ;
    createAnimationSequences( this, 'Sliding', 6, 1, 'knight' ) ;
    createAnimationSequences( this, 'Throwing', 12, 1, 'knight' ) ;
    createAnimationSequences( this, 'Throwing in The Air', 12, 1, 'knight' ) ;

    createAnimationSequences( this, 'Idle', 18, -1, 'mummy' ) ;
    createAnimationSequences( this, 'Dying', 15, 1, 'mummy' ) ;
    createAnimationSequences( this, 'Falling Down', 6, 1, 'mummy' ) ;
    createAnimationSequences( this, 'Hurt', 12, 1, 'mummy' ) ;
    createAnimationSequences( this, 'Jump Loop', 6, 1, 'mummy' ) ;
    createAnimationSequences( this, 'Jump Start', 6, 1, 'mummy' ) ;
    createAnimationSequences( this, 'Kicking', 12, 1, 'mummy' ) ;
    createAnimationSequences( this, 'Run Slashing', 12, 1, 'mummy' ) ;
    createAnimationSequences( this, 'Run Throwing', 12, 1, 'mummy' ) ;
    createAnimationSequences( this, 'Running', 12, -1, 'mummy' ) ;
    createAnimationSequences( this, 'Slashing', 12, 1, 'mummy' ) ;
    createAnimationSequences( this, 'Slashing in The Air', 12, 1, 'mummy' ) ;
    createAnimationSequences( this, 'Sliding', 6, 1, 'mummy' ) ;
    createAnimationSequences( this, 'Throwing', 12, 1, 'mummy' ) ;
    createAnimationSequences( this, 'Throwing in The Air', 12, 1, 'mummy' ) ;

    console.log(this.anims) ;

    player = this.physics.add.sprite( 50, 400, 'knightIdle000' ).play('Idle').setScale(0.15);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300); 
    player.body.setSize( 340, 550 ) ;

    gEnemyMummy = this.physics.add.sprite( 750, 200, 'mummyIdle000' ).play('Idle').setScale(0.15);
    gEnemyMummy.setBounce(0.2);
    gEnemyMummy.setCollideWorldBounds(true);
    gEnemyMummy.body.setGravityY(300); 
    gEnemyMummy.body.setSize( 400, 550 ) ;

    this.physics.add.collider( player, platforms );
    this.physics.add.collider( gEnemyMummy, platforms );

    gKeyA = this.input.keyboard.addKey( Phaser.Input.Keyboard.KeyCodes.A ) ;
    gKeyZ = this.input.keyboard.addKey( Phaser.Input.Keyboard.KeyCodes.Z ) ;
    gKeyE = this.input.keyboard.addKey( Phaser.Input.Keyboard.KeyCodes.E ) ;
    gKeyR = this.input.keyboard.addKey( Phaser.Input.Keyboard.KeyCodes.R ) ;
    gKeyT = this.input.keyboard.addKey( Phaser.Input.Keyboard.KeyCodes.T ) ;
    gKeyY = this.input.keyboard.addKey( Phaser.Input.Keyboard.KeyCodes.Y ) ;
    gKeyQ = this.input.keyboard.addKey( Phaser.Input.Keyboard.KeyCodes.Q ) ;
    gKeyS = this.input.keyboard.addKey( Phaser.Input.Keyboard.KeyCodes.S ) ;
    gKeyD = this.input.keyboard.addKey( Phaser.Input.Keyboard.KeyCodes.D ) ;
    gKeyF = this.input.keyboard.addKey( Phaser.Input.Keyboard.KeyCodes.F ) ;
    gKeyG = this.input.keyboard.addKey( Phaser.Input.Keyboard.KeyCodes.G ) ;
    gKeyH = this.input.keyboard.addKey( Phaser.Input.Keyboard.KeyCodes.H ) ;
    
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

function loadAnimationSequences(pContext, pAnimationName, pNumberOfSequences, pFolderName, pModelName)
{
    for (let i = 0; i < pNumberOfSequences; ++i) 
    {
        let lPath = './assets/' + pFolderName + '/PNG/PNG Sequences/' + pAnimationName + '/' + pAnimationName + '_0' ;
        let lKey = pModelName + pAnimationName  + '0' ;
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
function createAnimationSequences( pContext, pAnimationName, pNumberOfSequences, pSequenceRepeatNumber, pModelName )
{
    let lKeyFrame        = function( pKeyName ){this.key = pKeyName ; } ;
    let lAnimationKeyTab = [] ; 

    for (let i = 0; i < pNumberOfSequences; ++i) 
    {
        let lKeyName = pModelName + pAnimationName  + '0' ;
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
            key: pModelName + pAnimationName,
            frames: lAnimationKeyTab,
            frameRate: 15,
            repeat: pSequenceRepeatNumber
        }
    ) ;
}
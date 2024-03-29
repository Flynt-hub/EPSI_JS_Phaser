

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
            debug: true // make box colliders appears, add direction/speed vector to every model and stop every animation
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
let gPlatforms ;
let player ;
let gEnemyMummy ;
let cursor ;

let gPlayerAttackCollider ;

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

const gGroundY    = 568 ;
const gPlatform1Y = 400 ;
const gPlatform2Y = 250 ;
const gPlatform3Y = 220 ;

const gJumpPointGroundToPlatform1    = {xMin: 207, xMax: 255, y: 474} ;
const gJumpPointPlatform1ToPlatform2 = {xMin: 364, xMax: 415, y: 322} ;
const gJumpPointPlatform2ToPlatform3 = {xMin: 280, xMax: 286, y: 172} ;



function preload()
{
    const lKnightAnimationFolderName = 'Templar Knight' ;
    const lMummyAnimationFolderName  = 'Egyptian Mummy' ;
    let lProgressBar                 = this.add.graphics() ;
    let lProgressBox                 = this.add.graphics() ;
    var lWidth                       = this.cameras.main.width ;
    let lHeight                      = this.cameras.main.height ;
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

    this.load.image('volcanoBackground00', './assets/Volcano Level Set/PNG/Background/Volcano Level Set_Background - Layer 00.png') ;
    this.load.image('volcanoBackground01', './assets/Volcano Level Set/PNG/Background/Volcano Level Set_Background - Layer 01.png') ;
    this.load.image('ground', './assets/platform.png');

    //console.log(this)
    loadVolcanoLevelParts( this, 'Platformer', 'Ground', 13 ) ;

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
    this.add.image( this.sys.canvas.width/2, this.sys.canvas.height/2, 'volcanoBackground00' ) ;
    this.add.image( this.sys.canvas.width/2, this.sys.canvas.height/2, 'volcanoBackground01' ) ;
    
    gPlatforms = this.physics.add.staticGroup() ;
    //this.physics.children.entries.length
    for (let i = 0; i < 13 ; ++i) 
    {
        let lOffsetX = (32 + 64 * i) ;
        gPlatforms.create( lOffsetX, 568, ('Volcano Ground 02') ).setScale(0.5).refreshBody() ;        
    }
    gPlatforms.create( 400 , 400, ('Volcano Ground 10') ).setScale(0.25).refreshBody() ;
    for (let i = 0; i < 12 ; ++i) 
    {
        let lOffsetX = (432 + 32 * i) ;
        gPlatforms.create( lOffsetX , 400, ('Volcano Ground 11') ).setScale(0.25).refreshBody() ;        
    }
    gPlatforms.create( 273 , 250, ('Volcano Ground 12') ).setScale(0.25).refreshBody() ;
    for (let i = 0; i < 8 ; ++i) 
    {
        let lOffsetX = (16 + 32 * i) ;
        gPlatforms.create( lOffsetX , 250, ('Volcano Ground 11') ).setScale(0.25).refreshBody() ;        
    }
    gPlatforms.create( 558 , 220, ('Volcano Ground 10') ).setScale(0.25).refreshBody() ;
    for (let i = 0; i < 7 ; ++i) 
    {
        let lOffsetX = (590 + 32 * i) ;
        gPlatforms.create( lOffsetX , 220, ('Volcano Ground 11') ).setScale(0.25).refreshBody() ;        
    }

    createAnimationSequences( this, 'Idle', 18, -1, 'knight' ) ;
    createAnimationSequences( this, 'Dying', 15, 0, 'knight' ) ;
    createAnimationSequences( this, 'Falling Down', 6, 0, 'knight' ) ;
    createAnimationSequences( this, 'Hurt', 12, 0, 'knight' ) ;
    createAnimationSequences( this, 'Jump Loop', 6, 0, 'knight' ) ;
    createAnimationSequences( this, 'Jump Start', 6, 0, 'knight' ) ;
    createAnimationSequences( this, 'Kicking', 12, 0, 'knight' ) ;
    createAnimationSequences( this, 'Run Slashing', 12, 0, 'knight' ) ;
    createAnimationSequences( this, 'Run Throwing', 12, 0, 'knight' ) ;
    createAnimationSequences( this, 'Running', 12, -1, 'knight' ) ;
    createAnimationSequences( this, 'Slashing', 12, 0, 'knight' ) ;
    createAnimationSequences( this, 'Slashing in The Air', 12, 0, 'knight' ) ;
    createAnimationSequences( this, 'Sliding', 6, 1, 'knight' ) ;
    createAnimationSequences( this, 'Throwing', 12, 0, 'knight' ) ;
    createAnimationSequences( this, 'Throwing in The Air', 12, 0, 'knight' ) ;

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

    player               = this.physics.add.sprite( 50, 400, 'knightIdle000' ).play('knightIdle') ;
    player.name          = "knight" ;
    player.displayWidth  = 100 ;
    player.displayHeight = 100 ;
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300); 
    player.body.setSize( 340, 550 ) ;

    //console.log(player.body);
    //console.log(player);

    gEnemyMummy               = this.physics.add.sprite( 700, 200, 'mummyIdle000' ).play('mummyIdle') ;
    gEnemyMummy.name          = "mummy" ;
    gEnemyMummy.displayWidth  = 100 ;
    gEnemyMummy.displayHeight = 100 ;
    gEnemyMummy.setBounce(0.2);
    gEnemyMummy.setCollideWorldBounds(true);
    gEnemyMummy.body.setGravityY(300); 
    gEnemyMummy.body.setSize( 400, 550 ) ;

    this.physics.add.collider( player, gPlatforms );
    this.physics.add.collider( gEnemyMummy, gPlatforms );
    this.physics.add.collider( gEnemyMummy, player );

    //console.log(this.physics.add) ;

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
/*
    gPlayerAttackCollider                   = this.physics.add.image( player.body.position.x + 60, player.body.position.y + 30 ).setImmovable(true) ;
    gPlayerAttackCollider.body.allowGravity = false ;
    gPlayerAttackCollider.body.pushable     = false ;
    gPlayerAttackCollider.body.setCircle(10) ;
    gPlayerAttackCollider.setDebugBodyColor(0xffff00) ;
    this.physics.add.collider( gPlayerAttackCollider, gEnemyMummy ) ;
    this.physics.add.overlap(gPlayerAttackCollider, gEnemyMummy, function(){console.log("touching");}, null, this) ;
    //gPlayerAttackCollider.disableBody(true, true) ;
    */
   this.physics.add.overlap(gPlayerAttackCollider, gEnemyMummy, pouf);//, null, pContext) ;
}

function update()
{
    player.setVelocityX(0);
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
        player.flipX = true ;
        player.anims.play( 'knightRunning', true ) ;
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.flipX = false ;        
        player.anims.play( 'knightRunning', true ) ;
    }
    else if ( gKeyA.isDown ) { player.anims.play( 'knightDying' , true) ; }
    else if ( gKeyZ.isDown ) { player.anims.play( 'knightFalling Down' , true) ; }
    else if ( gKeyE.isDown ) { player.anims.play( 'knightHurt' , true) ; }
    else if ( gKeyE.isDown ) { player.anims.play( 'knightJump Start' , true) ; }
    else if ( gKeyR.isDown ) { player.anims.play( 'knightJump Loop' , true) ; }
    else if ( gKeyT.isDown ) { player.anims.play( 'knightKicking' , true) ; }
    else if ( gKeyY.isDown ) { player.anims.play( 'knightRun Slashing' , true) ; }
    else if ( gKeyQ.isDown ) { player.anims.play( 'knightRun Throwing' , true) ; }
    else if ( gKeyS.isDown )
    {
        player.anims.play( 'knightSlashing' , true) ;
        attack( this, gPlayerAttackCollider, player, gEnemyMummy) ;
    }
    else if ( gKeyD.isDown ) { player.anims.play( 'knightSlashing in The Air' , true) ; }
    else if ( gKeyF.isDown ) { player.anims.play( 'knightSliding' , true) ; }
    else if ( gKeyG.isDown ) { player.anims.play( 'knightThrowing' , true) ; }
    else if ( gKeyH.isDown ) { player.anims.play( 'knightThrowing in The Air' , true) ; }
    else if ( !player.anims.isPlaying || player.anims.getName() === 'knightRunning')
    {
        player.setVelocityX(0) ;
        player.anims.play( 'knightIdle', true ) ;
    }
    if ( cursors.space.isDown && player.body.touching.down )
    {
        player.setVelocityY(-450);
        //console.log(player.body.position.x) ;
        //console.log(player.body.position.y) ;
    }

    //AI(player, gEnemyMummy) ;
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
function loadVolcanoLevelParts( pContext, pPartSetName, pPartsName, pNumberOfParts )
{
    /* TODO @David during image loading every space are replace with "%20", this is not a problem during animation sequence loading, need to fix this
    let lPartPath = './assets/Volcano Level Set/PNG/' + pPartSetName + '/Volcano Level Set_' + pPartSetName + ' - ' + pPartsName + ' ' ;
    for (let i = 1; i <= pNumberOfParts; ++i) 
    {
        if ( i < 10 )
        {
            let lCompletePartPath = lPartPath + '0' + i + '.png' ;
            let lContextPartName  = pPartsName + '0' + i ;
            //pContext.load.image( lContextPartName, lCompletePartPath ) ;
            console.log(lCompletePartPath) ;
            console.log(lContextPartName) ;
        }
        else
        {
            let lCompletePartPath = lPartPath + i  ;
            let lContextPartName  = pPartsName + i ;
            pContext.load.image( lContextPartName, lCompletePartPath ) ;
            console.log(lCompletePartPath) ;
            console.log(lContextPartName) ;
        }
    }
    */
   pContext.load.image( 'Volcano Ground 01', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 01.png') ;
   pContext.load.image( 'Volcano Ground 02', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 02.png') ;
   pContext.load.image( 'Volcano Ground 03', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 03.png') ;
   pContext.load.image( 'Volcano Ground 04', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 04.png') ;
   pContext.load.image( 'Volcano Ground 05', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 05.png') ;
   pContext.load.image( 'Volcano Ground 06', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 06.png') ;
   pContext.load.image( 'Volcano Ground 07', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 07.png') ;
   pContext.load.image( 'Volcano Ground 08', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 08.png') ;
   pContext.load.image( 'Volcano Ground 09', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 09.png') ;
   pContext.load.image( 'Volcano Ground 10', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 10.png') ;
   pContext.load.image( 'Volcano Ground 11', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 11.png') ;
   pContext.load.image( 'Volcano Ground 12', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground 12.png') ;

   pContext.load.image( 'Volcano Ground Additional 01', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground Additional 01.png') ;
   pContext.load.image( 'Volcano Ground Additional 02', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground Additional 02.png') ;
   pContext.load.image( 'Volcano Ground Additional 03', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground Additional 03.png') ;
   pContext.load.image( 'Volcano Ground Additional 04', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground Additional 04.png') ;
   pContext.load.image( 'Volcano Ground Additional 05', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground Additional 05.png') ;
   pContext.load.image( 'Volcano Ground Additional 06', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground Additional 06.png') ;
   pContext.load.image( 'Volcano Ground Additional 07', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ground Additional 07.png') ;

   pContext.load.image( 'Volcano Ladder', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Ladder.png') ;
   pContext.load.image( 'Volcano Wooden Barrel', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Wooden Barrel.png') ;
   pContext.load.image( 'Volcano Wooden Box', './assets/Volcano Level Set/PNG/Platformer/Volcano Level Set_Platformer - Wooden Box.png') ;
   
}
function AI( pActor1, pActor2 ) 
{   
    const lDeltaX = pActor1.body.position.x - pActor2.body.position.x ;
    const lDeltaY = pActor1.body.position.y - pActor2.body.position.y ;

    const lActor1IsAtRight      = lDeltaX > 100 ;
    const lActor1IsAtLeft       = lDeltaX < -100 ;
    const lActor1IsUpper        = lDeltaY < -50 ;
    const lActor1IsCloseToRight = lDeltaX > 0 && lDeltaX < 100 && lDeltaY > -50 && lDeltaY < 50 ;
    const lActor1IsCloseToLeft  = lDeltaX < 0 && lDeltaX > -100 && lDeltaY > -50 && lDeltaY < 50 ;
    if ( lActor1IsAtRight && !lActor1IsUpper )
    {
        pActor2.setVelocityX(160) ;
        pActor2.flipX = false ;
        pActor2.anims.play( pActor2.name + 'Running', true ) ;
    }
    else if ( lActor1IsAtLeft && !lActor1IsUpper )
    {
        pActor2.setVelocityX(-160) ;
        pActor2.flipX = true ;
        pActor2.anims.play( pActor2.name + 'Running', true ) ;
    }    
    if ( lActor1IsUpper && pActor2.body.touching.down )
    {
        const lActor2IsAtGround  = pActor2.body.position.y < ( gJumpPointGroundToPlatform1.y + 10 ) && pActor2.body.position.y > ( gJumpPointGroundToPlatform1.y - 10 ) ;
        const lActor2IsPlatform1 = pActor2.body.position.y < ( gJumpPointPlatform1ToPlatform2.y + 10 ) && pActor2.body.position.y > ( gJumpPointPlatform1ToPlatform2.y - 10 ) ;
        const lActor2IsPlatform2 = pActor2.body.position.y < ( gJumpPointPlatform2ToPlatform3.y + 10 ) && pActor2.body.position.y > ( gJumpPointPlatform2ToPlatform3.y - 10 ) ;
        const niktamer = gJumpPointGroundToPlatform1.y + 10 ;
        const niktonper = gJumpPointGroundToPlatform1.y - 10 ;
        console.log("mummy y : " + pActor2.body.position.y + "ground interval : [" + niktamer + " - " + niktonper + "]") ;
        if ( lActor2IsAtGround )
        {
            const lActor2IsLeftToGroundPoint  = pActor2.body.position.x > gJumpPointGroundToPlatform1.xMax ;
            const lActor2IsRightToGroundPoint = pActor2.body.position.x < gJumpPointGroundToPlatform1.xMin ;
            const lActor2IsWellPlacedToJump   = pActor2.body.position.x > gJumpPointGroundToPlatform1.xMin && pActor2.body.position.x < gJumpPointGroundToPlatform1.xMax ;
            if( lActor2IsLeftToGroundPoint )
            {
                pActor2.setVelocityX(-160) ;
                pActor2.flipX = true ;
                pActor2.anims.play( pActor2.name + 'Running', true ) ;
                console.log("ground : going to right") ;
            }
            else if( lActor2IsRightToGroundPoint )
            {
                pActor2.setVelocityX(160) ;
                pActor2.flipX = false ;
                pActor2.anims.play( pActor2.name + 'Running', true ) ;
                console.log("ground : going to left") ;
            }
            else if( lActor2IsWellPlacedToJump )
            {
                pActor2.setVelocityY(-450) ;
                pActor2.setVelocityX(160) ;
                pActor2.flipX = false ;
                pActor2.anims.play( pActor2.name + 'Jump Loop', true ) ;
                console.log("ground : well placed") ;
            }            
        }
        else if ( lActor2IsPlatform1 )
        {
            const lActor2IsLeftToPlatform1Point  = pActor2.body.position.x > gJumpPointPlatform1ToPlatform2.xMax ;
            const lActor2IsRightToPlatform1Point = pActor2.body.position.x < gJumpPointPlatform1ToPlatform2.xMin ;
            const lActor2IsWellPlacedToJump      = pActor2.body.position.x > gJumpPointPlatform1ToPlatform2.xMin && pActor2.body.position.x < gJumpPointPlatform1ToPlatform2.xMax ;
            if( lActor2IsLeftToPlatform1Point )
            {
                pActor2.setVelocityX(-160) ;
                pActor2.flipX = true ;
                pActor2.anims.play( pActor2.name + 'Running', true ) ;
                console.log("platform1 : going to right") ;
            }
            else if( lActor2IsRightToPlatform1Point )
            {
                pActor2.setVelocityX(160) ;
                pActor2.flipX = false ;
                pActor2.anims.play( pActor2.name + 'Running', true ) ;
                console.log("platform1 : going to left") ;
            }
            else if( lActor2IsWellPlacedToJump )
            {
                pActor2.setVelocityY(-450) ;
                pActor2.setVelocityX(-160) ;
                pActor2.flipX = true ;
                pActor2.anims.play( pActor2.name + 'Jump Loop', true ) ;
                console.log("platform1 : well placed") ;
            }  
        }
        else if ( lActor2IsPlatform2 )
        {
            const lActor2IsLeftToPlatform2Point  = pActor2.body.position.x > gJumpPointPlatform2ToPlatform3.xMax ;
            const lActor2IsRightToPlatform2Point = pActor2.body.position.x < gJumpPointPlatform2ToPlatform3.xMin ;
            const lActor2IsWellPlacedToJump      = pActor2.body.position.x > gJumpPointPlatform2ToPlatform3.xMin && pActor2.body.position.x < gJumpPointPlatform2ToPlatform3.xMax ;
            if( lActor2IsLeftToPlatform2Point )
            {
                pActor2.setVelocityX(-160) ;
                pActor2.flipX = true ;
                pActor2.anims.play( pActor2.name + 'Running', true ) ;
                console.log("platform2 : going to left") ;
            }
            else if( lActor2IsRightToPlatform2Point )
            {
                pActor2.setVelocityX(160) ;
                pActor2.flipX = false ;
                pActor2.anims.play( pActor2.name + 'Running', true ) ;
                console.log("platform2 : going to right") ;
            }
            else if( lActor2IsWellPlacedToJump )
            {
                pActor2.setVelocityY(-450) ;
                pActor2.setVelocityX(160) ;
                pActor2.flipX = false ;
                pActor2.anims.play( pActor2.name + 'Jump Loop', true ) ;
                console.log("platform2 : well placed") ;
            }
        }
    }
    if ( lActor1IsCloseToRight )
    {
        pActor2.anims.play( pActor2.name + 'Slashing', true ) ;
    }
    else if ( lActor1IsCloseToLeft )
    {
        pActor2.anims.play( pActor2.name + 'Slashing', true ) ;
    }
}

function attack (pContext, pAttackCollider, pActor1, pActor2)
{
    // https://www.html5gamedevs.com/topic/45134-fighting-game-hitboxes-implementation/
    /**
     * to detect collision when an actor play attack animation, a trick would be to create a collision box in front of him for a short time and detect collision with another actor
    */
   
   pAttackCollider                   = pContext.physics.add.sprite( pActor1.body.position.x + 60, pActor1.body.position.y + 30 ).setImmovable(true) ;
   pAttackCollider.body.allowGravity = false ;
   pAttackCollider.body.pushable     = false ;
   //pAttackCollider.body.setBoundsRectangle( new Phaser.Geom.Rectangle(pActor1.body.position.x, pActor1.body.position.y + 30, 10, 10) ) ;
   pAttackCollider.setDebugBodyColor(0xffff00) ;
   pContext.physics.add.collider( pAttackCollider, pActor2 ) ;
   //pAttackCollider.body.onOverlap = function(){console.log("touching") ;} ;
   pContext.physics.add.overlap(pAttackCollider, pActor2);//, pouf, null, pContext) ;
   console.log(pAttackCollider.body.touching.none);
   //console.log( Phaser.Geom.Rectangle.Overlaps( pAttackCollider.getBounds(), pActor2.getBounds() ) ) ;
   pAttackCollider.body.destroy() ;
   
   //pAttackCollider.enableBody(false,100,100, true, true ) ;
}
function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    console.log(boundsA) ;

    return Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB);
}
function pouf()
{
    console.log("pouf") ;
}
/**
 * TODO @David, instead of spend days on pathfinding, we could create some points at each level to indicate to AI to reach those point to jump to upper platform to get player
 */



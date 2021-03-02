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

const gJumpPointGroundToPlatform1 = {xMin: 207, xMax: 255, y: 474} ;
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

    console.log(this)
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
    gPlatforms.create( 526 , 180, ('Volcano Ground 10') ).setScale(0.25).refreshBody() ;
    for (let i = 0; i < 9 ; ++i)
    {
        let lOffsetX = (558 + 32 * i) ;
        gPlatforms.create( lOffsetX , 180, ('Volcano Ground 11') ).setScale(0.25).refreshBody() ;
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

    console.log(player.body);
    console.log(player);

    gEnemyMummy               = this.physics.add.sprite( 750, 200, 'mummyIdle000' ).play('mummyIdle') ;
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
        //attack( this, gPlayerAttackCollider, player, gEnemyMummy) ;
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
    console.log(player.anims.getName()) ;
    if ( cursors.space.isDown && player.body.touching.down )
    {
        player.setVelocityY(-450);
        //console.log(player.body.position.x) ;
        //console.log(player.body.position.y) ;
    }

    AI(player, gEnemyMummy) ;
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
    let lPartPath = './assets/Volcano Level Set/PNG/' + pPartSetName + '/Volcano Level Set_' + pPartSetName + ' - ' + pPartsName + ' ' ;
    let lCompletePartPath;
    let lContextPartName;
    for (let i = 1; i <= pNumberOfParts; ++i) {
        if (i < 10) {
            lCompletePartPath = lPartPath + '0' + i + '.png';
            lContextPartName = 'Volcano ' + pPartsName + ' 0' + i;


        } else {
            lCompletePartPath = lPartPath + i + '.png';
            lContextPartName = 'Volcano ' + pPartsName + ' ' + i;
        }
        pContext.load.image(lContextPartName, lCompletePartPath);
        console.log(lCompletePartPath);
        console.log(lContextPartName);
    }
}
function AI( pTarget, pNpc )
{
    const lConstante = {swordRange: 65};
    const lDeltaX = pTarget.body.position.x - pNpc.body.position.x;
    const lDeltaY = pTarget.body.position.y - pNpc.body.position.y;

    const lTargetIsAtRight      = lDeltaX > lConstante.swordRange;
    const lTargetIsAtLeft       = lDeltaX < - lConstante.swordRange ;
    const lTargetIsUpper        = lDeltaY < -50 ;
    const lTargetIsCloseToRight = lDeltaX > 0 && lDeltaX < lConstante.swordRange && lDeltaY > -50 && lDeltaY < 50 ;
    const lTargetIsCloseToLeft  = lDeltaX < 0 && lDeltaX > - lConstante.swordRange && lDeltaY > -50 && lDeltaY < 50 ;

    if ( lTargetIsAtRight && !lTargetIsUpper )
    {
        pNpc.setVelocityX(160) ;
        pNpc.flipX = false ;
        pNpc.anims.play( pNpc.name + 'Running', true ) ;
    }
    else if ( lTargetIsAtLeft && !lTargetIsUpper )
    {
        pNpc.setVelocityX(-160) ;
        pNpc.flipX = true ;
        pNpc.anims.play( pNpc.name + 'Running', true ) ;
    }    
    if ( lTargetIsUpper && pNpc.body.touching.down )
    {
        const lNpcIsAtGround  = pNpc.body.position.y < ( gJumpPointGroundToPlatform1.y + 10 ) && pNpc.body.position.y > ( gJumpPointGroundToPlatform1.y - 10 ) ;
        const lNpcIsPlatform1 = pNpc.body.position.y < ( gJumpPointPlatform1ToPlatform2.y + 10 ) && pNpc.body.position.y > ( gJumpPointPlatform1ToPlatform2.y - 10 ) ;
        const lNpcIsPlatform2 = pNpc.body.position.y < ( gJumpPointPlatform2ToPlatform3.y + 10 ) && pNpc.body.position.y > ( gJumpPointPlatform2ToPlatform3.y - 10 ) ;
        const niktamer = gJumpPointGroundToPlatform1.y + 10 ;
        const niktonper = gJumpPointGroundToPlatform1.y - 10 ;
        console.log("mummy y : " + pNpc.body.position.y + "ground interval : [" + niktamer + " - " + niktonper + "]") ;
        if ( lNpcIsAtGround )
        {
            const lNpcIsLeftToGroundPoint  = pNpc.body.position.x > gJumpPointGroundToPlatform1.xMax ;
            const lNpcIsRightToGroundPoint = pNpc.body.position.x < gJumpPointGroundToPlatform1.xMin ;
            const lNpcIsWellPlacedToJump   = pNpc.body.position.x > gJumpPointGroundToPlatform1.xMin && pNpc.body.position.x < gJumpPointGroundToPlatform1.xMax ;
            if( lNpcIsLeftToGroundPoint )
            {
                pNpc.setVelocityX(-160) ;
                pNpc.flipX = true ;
                pNpc.anims.play( pNpc.name + 'Running', true ) ;
                console.log("ground : going to right") ;
            }
            else if( lNpcIsRightToGroundPoint )
            {
                pNpc.setVelocityX(160) ;
                pNpc.flipX = false ;
                pNpc.anims.play( pNpc.name + 'Running', true ) ;
                console.log("ground : going to left") ;
            }
            else if( lNpcIsWellPlacedToJump )
            {
                pNpc.setVelocityY(-450) ;
                pNpc.setVelocityX(160) ;
                pNpc.flipX = false ;
                pNpc.anims.play( pNpc.name + 'Jump Loop', true ) ;
                console.log("ground : well placed") ;
            }            
        }
        else if ( lNpcIsPlatform1 )
        {
            const lNpcIsLeftToPlatform1Point  = pNpc.body.position.x > gJumpPointPlatform1ToPlatform2.xMax ;
            const lNpcIsRightToPlatform1Point = pNpc.body.position.x < gJumpPointPlatform1ToPlatform2.xMin ;
            const lNpcIsWellPlacedToJump      = pNpc.body.position.x > gJumpPointPlatform1ToPlatform2.xMin && pNpc.body.position.x < gJumpPointPlatform1ToPlatform2.xMax ;
            if( lNpcIsLeftToPlatform1Point )
            {
                pNpc.setVelocityX(-160) ;
                pNpc.flipX = true ;
                pNpc.anims.play( pNpc.name + 'Running', true ) ;
                console.log("platform1 : going to right") ;
            }
            else if( lNpcIsRightToPlatform1Point )
            {
                pNpc.setVelocityX(160) ;
                pNpc.flipX = false ;
                pNpc.anims.play( pNpc.name + 'Running', true ) ;
                console.log("platform1 : going to left") ;
            }
            else if( lNpcIsWellPlacedToJump )
            {
                pNpc.setVelocityY(-450) ;
                pNpc.setVelocityX(-160) ;
                pNpc.flipX = true ;
                pNpc.anims.play( pNpc.name + 'Jump Loop', true ) ;
                console.log("platform1 : well placed") ;
            }  
        }
        else if ( lNpcIsPlatform2 )
        {
            const lNpcIsLeftToPlatform2Point  = pNpc.body.position.x > gJumpPointPlatform2ToPlatform3.xMax ;
            const lNpcIsRightToPlatform2Point = pNpc.body.position.x < gJumpPointPlatform2ToPlatform3.xMin ;
            const lNpcIsWellPlacedToJump      = pNpc.body.position.x > gJumpPointPlatform2ToPlatform3.xMin && pNpc.body.position.x < gJumpPointPlatform2ToPlatform3.xMax ;
            if( lNpcIsLeftToPlatform2Point )
            {
                pNpc.setVelocityX(-160) ;
                pNpc.flipX = true ;
                pNpc.anims.play( pNpc.name + 'Running', true ) ;
                console.log("platform2 : going to left") ;
            }
            else if( lNpcIsRightToPlatform2Point )
            {
                pNpc.setVelocityX(160) ;
                pNpc.flipX = false ;
                pNpc.anims.play( pNpc.name + 'Running', true ) ;
                console.log("platform2 : going to right") ;
            }
            else if( lNpcIsWellPlacedToJump )
            {
                pNpc.setVelocityY(-450) ;
                pNpc.setVelocityX(160) ;
                pNpc.flipX = false ;
                pNpc.anims.play( pNpc.name + 'Jump Loop', true ) ;
                console.log("platform2 : well placed") ;
            }
        }
    }
    if ( lTargetIsCloseToRight )
    {
        pNpc.flipX = false ;
        pNpc.anims.play( pNpc.name + 'Slashing', true ) ;
    }
    else if ( lTargetIsCloseToLeft )
    {
        pNpc.flipX = true ;
        pNpc.anims.play( pNpc.name + 'Slashing', true ) ;
    }
}

function attack (pContext, pAttackCollider, pActor1, pActor2)
{
    // https://www.html5gamedevs.com/topic/45134-fighting-game-hitboxes-implementation/
    /**
     * to detect collision when an actor play attack animation, a trick would be to create a collision box in front of him for a short time and detect collision with another actor
    */
   pAttackCollider = pContext.add.image( pActor1.body.position.x + 50, pActor1.body.position.y + 10 ) ;
   pAttackCollider.body.setCircle(10) ;
   pAttackCollider.setDebugBodyColor(0xffff00) ;
}

/**
 * TODO @David, instead of spend days on pathfinding, we could create some points at each level to indicate to AI to reach those point to jump to upper platform to get player
 */
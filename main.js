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
            debug: false // make box colliders appears, add direction/speed vector to every model and stop every animation
        }
    },
    scene: 
    [
        MainMenu,
        Level1,
        Lost,
        Win
    ],
    audio: 
    {
        disableWebAudio: true
    }
};

let game = new Phaser.Game(config) ;

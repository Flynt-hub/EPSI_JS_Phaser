class GameManager extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {

    }
    create ()
    {

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
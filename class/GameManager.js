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

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth  * 0.9,
    height: window.innerHeight * 0.9,
    pixelArt: true,
    physics: {
        default: 'arcade',
        fps: 30
    },
    scene: [ SceneMain ]
};
const game = new Phaser.Game(config);
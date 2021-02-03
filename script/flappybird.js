class Example extends Phaser.Scene
{
  constructor ()
  {
    super();
  }

  preload ()
  {
    this.load.image('map', 'img/earthbound-scarab.png');
    this.load.image('ship', 'img/fmship.png');
  }

  create ()
  {
    //this.cameras.main.setBounds(0, 0, 1024, 2048);
    this.physics.world.setBounds(0, 0, 1024, 2048);

    this.add.image(0, 0, 'map').setOrigin(0).setScrollFactor(1);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.ship = this.physics.add.image(400.5, 301.3, 'ship');
    this.ship.body.collideWorldBounds = true;

    this.shipClass = new keyBinding(this.ship);


    this.cameras.main.startFollow(this.ship);
    this.cameras.main.setBounds(0, 0, 1024, 2048);

    this.cameras.main.setZoom(3);
  }

  update ()
  {

    this.ship.setVelocity(0);
    var tata = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.shipClass.move(this.cursors);
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
  scene: [ Example ]
};
const game = new Phaser.Game(config);
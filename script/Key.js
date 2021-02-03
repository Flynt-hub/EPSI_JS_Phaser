class keyBinding  {
    velocity = 200;

    constructor(ship) {
        this.ship = ship;

    }

    move(cursors){
        //var toto = Phaser.Scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

        // pour le moment seul la fleche est géré, il faut aussi gérer la touche s (pour gérer zqsd)
        if (cursors.left.isDown)
        {
            this.ship.setAngle(-90).setVelocityX(-200);
        }
        else if (cursors.right.isDown)
        {
            this.ship.setAngle(90).setVelocityX(this.velocity);
        }

        if (cursors.up.isDown)
        {
            this.ship.setAngle(0).setVelocityY(-200);
        }
        else if (cursors.down.isDown)
        {
            this.ship.setAngle(-180).setVelocityY(this.velocity);
        }
        console.log("tiotiotf");
    }

}

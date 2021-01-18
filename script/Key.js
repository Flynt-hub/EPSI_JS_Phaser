class keyBinding  {
    constructor() {

    }

    static down(keyboard){
        //var toto = this.input.keyboard.addKey()
        // pour le moment seul la fleche est géré, il faut aussi gérer la touche s (pour gérer zqsd)
        return keyboard.down.isDown ;
    }

}

var config = {
  width: 400,
  height: 490,
  scene: {
    preload: preload,  // Chargement des ressources
    create: create,    // Initialisation des variables & objets
    update: update     // Fonction appelée 60 fois par seconde
  },
  parent: 'flappyBird', // Affiche le jeu dans le div id="flappyBird"
  physics: {
    default: 'arcade', // Permet d'appliquer un set de mouvements aux objets
    arcade: {
      gravity: {
        y: 0
      },
    },
  },
  backgroundColor: '#71c5cf', // Ciel bleu
};

// Variables globales
var game = new Phaser.Game(config);

function preload () {
  // C'est là qu'on vas charger les images et les sons
  this.load.image('bird', 'img/bird.png');
  this.load.image('pipe', 'img/pipe.png');
  this.load.audio('jump', 'sound/jump.wav');
}
function create () {
  // Ici on vas initialiser les variables, l'affichage ...

  piaf = this.physics.add.sprite(100, 245, 'bird'); // Affiche 'bird' en x=100 y=245
  piaf.body.gravity.y = 1000; // Ajoute jusqu'a 1000 px / frame a la coordonnée y des objets

  // Écoute la touche espace
  espace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  // Appel la fonction nouvelleColonne toutes les 1,5 secondes
  genereTuyaux = this.time.addEvent({
    delay: 1500,
    callback: nouvelleColonne,
    callbackScope: this,
    loop: true,
  });
}

function update () {
  // C'est la boucle principale du jeu

  // Si l'oiseau quite l'écran
  if (piaf.y < 0 || piaf.y > 490) {
    this.scene.restart(); // On redémare
  }

  // Si on appuie sur "espace"
  if (Phaser.Input.Keyboard.JustDown(espace)) {
    piaf.setVelocityY(-350); // on envoie piaf vers le haut
    this.sound.play('jump'); // Chpoing
  }
}
function nouvelleColonne() {
  // choisi une position entre 1 et 5 pour le trou dans les tyuaux
  trou = Phaser.Math.Between(1, 5);
  // on regroupe tout les bout de tuyaux dans un objet groupe
  tuyau = this.physics.add.group();
  for(var i = 0; i < 8; i++) {
    if(i != trou && i != trou + 1) {
      // on ajoute les morceaux en colonne
      tuyau.create(400, (60 * i) + 30, 'pipe');
    }
  }
  tuyau.setVelocityX(-200); // Fait défiler des tuyaux vers la gauche
}

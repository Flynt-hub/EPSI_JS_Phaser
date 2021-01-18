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
}
function create () {
  // Ici on vas initialiser les variables, l'affichage ...

  piaf = this.physics.add.sprite(100, 245, 'bird'); // Affiche 'bird' en x=100 y=245
  piaf.body.gravity.y = 1000; // Ajoute jusqu'a 1000 px / frame a la coordonnée y des objets
}
function update () {
  // C'est la boucle principale du jeu

  // Si l'oiseau quite l'écran
  if (piaf.y < 0 || piaf.y > 490) {
    this.scene.restart(); // On redémare
  }
}

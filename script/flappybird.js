var config = {
  width: 400,
  height: 490,
  scene: {
    preload: preload,  // Chargement des ressources
    create: create,    // Initialisation des variables & objets
    update: update     // Fonction appelée 60 fois par seconde
  },
  parent: 'flappyBird', // Affiche le jeu dans le div id="flappyBird"
};

// Variables globales
var game = new Phaser.Game(config);

function preload () {
  // C'est là qu'on vas charger les images et les sons
}
function create () {
  // Ici on vas initialiser les variables, l'affichage ...
}
function update () {
  // C'est la boucle principale du jeu
}

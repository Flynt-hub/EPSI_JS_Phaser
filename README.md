# EPSI_JS_Phaser
little JS project to discover Phaser framework

after launching the game, use arrows to move, spacebar to jump and key 'E' to attack

génération du index.html

echo '<!DOCTYPE html> <html lang="fr"> <head> ' > index.html
echo '<script src="https://cdn.jsdelivr.net/npm/phaser@3.52.0/dist/phaser-arcade-physics.min.js"></script>' >> index.html
tree class/ --noreport -aflix | grep ".js" | while read -r line; do echo '<script src="'$line'"></script>' >>index.html ; done
echo '</head> <body> </body> </html> ' >> index.html

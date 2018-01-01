
// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(1920, 1080,Phaser.AUTO,"phaser-game");

// Add the 'mainState' and call it 'main'
game.state.add('mainMenu', MainMenu);
game.state.add('lavel1', mainState);
// Start the state to actually start the game
game.state.start('mainMenu');
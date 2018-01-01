var MainMenu = {

    preload: function() {
        this.load.image('mainBgg', '../img/MainMenu/MainBg.png');
        this.load.image('continue', '../img/MainMenu/Continue.png');
        this.load.image('newGame', '../img/MainMenu/NewGame.png');
    },

    create: function() {

        this.mainBg = game.add.tileSprite(0, 0, 1920, 1080, 'mainBgg')

        //New game
        this.newGame = game.add.button(game.world.centerX + 120,
            game.world.centerY + 10, "newGame", () => {
                playar = new Player();

                game.state.start('lavel1', true, false);
            }, this, 0, 0, 1, 0);

        if (localStorage.gamesave) {
            this.coutinueGame = game.add.button(game.world.centerX + 120,
                game.world.centerY + 220, "continue", () => {
                    playar = JSON.parse(localStorage.gamesave, reviwerPlayer);

                    game.state.start('lavel1', true, false);

                }, this, 0, 0, 1, 0);
            this.coutinueGame.width = 700;
            this.coutinueGame.height = 200;
        }



        this.newGame.width = 700;

        this.newGame.height = 200;

    },

    update: function() {


    },

    render: function() {

    },

};
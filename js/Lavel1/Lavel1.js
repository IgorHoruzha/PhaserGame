var mainState = {

    preload: function() {
        this.load.image('bg', '../img/GameField/BitFlowBG.png');

        this.load.image('menu', '../img/GameField/GameButton/Menu.png');
        this.load.image('stats', '../img/GameField/GameButton/Stats.png');
        this.load.image('upgrades', '../img/GameField/GameButton/Upgrades.png');

        this.load.image('clock', '../img/GameField/Clock.png');

        this.load.image('toilet', '../img/GameField/Toilet.png');
        this.load.image('CatchButton', '../img/GameField/CatchButton.png');

        this.load.image('videoCard', '../img/GameField/VideoCard.png');

        this.load.image('conveyor', '../img/GameField/conveyor.png'); //reset

        this.load.image('coin', '../img/GameField/coin.png'); //reset
    },

    create: function() {

        this.GameField = new GameInterface(this.game);
        this.GameField.CreateGame();
    },

    update: function() {
        var hitPlatform = game.physics.arcade.collide(this.GameField.coins, this.GameField.conveyor);
        game.physics.arcade.overlap(this.GameField.toilet, this.GameField.coins, (toilet, coin) => {
            this.GameField.DeleteCoin(toilet, coin);;
            this.GameField.toiletCoinCount.text = ++playar.toiletCoints;
            this.GameField.factor.text = "X " + (playar.gameFactor = playar.catchStrick = 1);
        }, null, this);

    },

    render: function() {
        // game.debug.bodyInfo(this.GameField.toilet, 32, 32);

        // game.debug.body(this.GameField.toilet);
        // game.debug.body(this.GameField.conveyor);
        // game.debug.body(this.GameField.catchPoint);
        // this.GameField.coins.forEach((a, b) => { game.debug.body(a); }, this, true);
    },

};
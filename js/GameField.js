function GameInterface(game) {


    this.background;
    this.menu;
    this.stats;
    this.upgrades;

    this.clock;
    this.countCoin; //text.

    this.videoCard;
    this.factor; //text.

    this.knifeSwitch; //button catch  coints.
    this.catchPoint; // radius coint catched.

    this.conveyor;
    this.coins;
    this.coinsTimer; //timer create coins.

    this.toilet;
    this.toiletCoin;
    this.toiletCoinCount //text.

    this.autoSaveTimer;

    var self = this;
    var currentGame = game;
    this.CreateGame = function() {
        currentGame.physics.startSystem(Phaser.Physics.ARCADE);

        this.background = currentGame.add.tileSprite(0, 0, 1920, 1080, 'bg');


        //Menu
        this.menu = game.add.button(currentGame.world.width - 260,
            170, "menu", () => {
                ///////TODO: SAVE GAME  HERE!
                localStorage.setItem("gamesave", JSON.stringify(playar));
                game.state.start('mainMenu', true);
            }, this, 0, 0, 1, 0);

        //Stats     
         this.stats = game.add.button(currentGame.world.width - 470,
            170, "stats", () => {
            alert("Sore: " +playar.countCoints);
            }, this, 0, 0, 1, 0);
        //Ubgrades    
          this.stats = game.add.button(currentGame.world.width - 470,
            50, "upgrades", () => {
            alert("Click");
            }, this, 0, 0, 1, 0);
      

        //Clock
        this.clock = currentGame.add.sprite(50, 50, 'clock');
        let countCoinStyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.countCoin = currentGame.add.text(120, 80, playar.countCoints, countCoinStyle);

        //  conveyor
        this.conveyor = currentGame.add.sprite(currentGame.world.centerX - 900, currentGame.world.centerY + 100, 'conveyor');
        currentGame.physics.enable(this.conveyor, Phaser.Physics.ARCADE);
        this.conveyor.body.immovable = true;
        this.conveyor.body.setSize(1200, 50, 50, 50);

        //CachPoint
        let graphics = game.add.graphics(game.world.centerX, game.world.centerY);
        this.catchPoint = graphics.lineStyle(8, 0xffd900).drawEllipse(100, 100, 200, 60).generateTexture();
        graphics.kill(currentGame);

        this.catchPoint = game.add.sprite(900, 600, this.catchPoint);
        currentGame.physics.enable(this.catchPoint, Phaser.Physics.ARCADE);
        this.catchPoint.enableBody = true;


        //toilet 
        this.toilet = currentGame.add.sprite(currentGame.world.width - 360, currentGame.world.height - 450, 'toilet');
        currentGame.physics.enable(this.toilet, Phaser.Physics.ARCADE);
        this.toilet.enableBody = true;
        this.toilet.body.setSize(900, 50, 50, 225);
        //toilet coints
        this.toiletCoin = currentGame.add.sprite(currentGame.world.width - 220, currentGame.world.height - 550, 'clock');
        let countToiletCoinStyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.toiletCoinCount = currentGame.add.text(currentGame.world.width - 170, currentGame.world.height - 520, playar.toiletCoints, countToiletCoinStyle);

        //coins
        this.coins = currentGame.add.group();
        currentGame.physics.enable(this.coins, Phaser.Physics.ARCADE);
        this.coinsTimer = game.time.create(false);
        this.coinsTimer.loop(2000, this.CreateCoints, this);
        this.coinsTimer.start();

        //videoCard
        this.videoCard = currentGame.add.sprite(90, 250, 'videoCard');
        let factorStyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.factor = currentGame.add.text(310, 335, "X " + playar.gameFactor, countCoinStyle);

        //KnifeSwitch
        this.knifeSwitch = currentGame.add.button(currentGame.world.centerX - 100, currentGame.world.centerY + 200, "CatchButton", this.TryCatch, this, 0, 0, 1, 0);


        this.autoSaveTimer = game.time.create(false);
        this.autoSaveTimer.loop(5000, () => {
            ///////TODO: SAVE GAME  HERE!
            localStorage.setItem("gamesave", JSON.stringify(playar));
        }, this);
        this.autoSaveTimer.start();
    }



    this.CreateCoints = function() {
        this.coins.enableBody = true;
        let coin = this.coins.create(250, 300, 'coin');
        coin.body.gravity.y = 55;
        coin.body.bounce.y = 0.2 + Math.random() * 0.2;
        coin.body.velocity.x = 150;
    }


    this.TryCatch = function() {
        currentGame.physics.arcade.overlap(this.catchPoint, this.coins, (catchPoint, coin) => {
            this.DeleteCoin(catchPoint, coin);
            playar.countCoints += 1 * playar.gameFactor;
            this.countCoin.text = playar.countCoints;

            playar.catchStrick++;

            if (playar.catchStrick >= 10) {
                playar.gameFactor++;
                this.factor.text = "X " + playar.gameFactor;
                playar.catchStrick = 1;
            }

        }, null, this);
    }

    this.DeleteCoin = function(obj, coin) {;
        coin.kill(currentGame);
    }
}
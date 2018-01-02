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
    this.coins = new Coins();

    this.toilet;
    this.toiletCoin;
    this.toiletCoinCount //text.

    this.autoSaveTimer;

    var self = this;


    this.CreateGame = function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.background = game.add.tileSprite(0, 0, 1920, 1080, 'bg');


        //Menu
        this.menu = game.add.button(game.world.width - 260,
            170, "menu", () => {
                ///////TODO: SAVE GAME  HERE!
                localStorage.setItem("gamesave", JSON.stringify(playar));
                game.state.start('mainMenu', true);
            }, this, 0, 0, 1, 0);

        //Stats     
        this.stats = game.add.button(game.world.width - 470,
            170, "stats", () => {
                alert("Nickname:" + playar.nickname + "\nSore: " + playar.countCoints);
            }, this, 0, 0, 1, 0);
        //Ubgrades    
        this.upgrades = game.add.button(game.world.width - 470,
            50, "upgrades", () => {
                alert("upgrades Lavel " + (++this.coins.Lavel));
                this.coins.ubgrade();
                game.world.bringToTop(this.videoCard);
                game.world.bringToTop(this.factor);

            }, this, 0, 0, 1, 0);


        //Clock
        this.clock = game.add.sprite(50, 50, 'clock');
        let countCoinStyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.countCoin = game.add.text(120, 80, playar.countCoints, countCoinStyle);

        //  conveyorNOT locked
        this.conveyor = game.add.sprite(game.world.centerX - 900, game.world.centerY + 100, 'conveyor');
        game.physics.enable(this.conveyor, Phaser.Physics.ARCADE);
        this.conveyor.body.immovable = true;
        this.conveyor.body.setSize(1200, 50, 50, 50);

        //CachPoint
        let graphics = game.add.graphics(game.world.centerX, game.world.centerY);
        this.catchPoint = graphics.lineStyle(8, 0xffd900).drawEllipse(100, 100, 200, 60).generateTexture();
        graphics.kill(game);

        this.catchPoint = game.add.sprite(900, 600, this.catchPoint);
        game.physics.enable(this.catchPoint, Phaser.Physics.ARCADE);
        this.catchPoint.enableBody = true;
         this.catchPoint.body.setSize(410, 300, 0, -100);

        //toilet 
        this.toilet = game.add.sprite(game.world.width - 360, game.world.height - 450, 'toilet');
        game.physics.enable(this.toilet, Phaser.Physics.ARCADE);
        this.toilet.enableBody = true;
        this.toilet.body.setSize(900, 50, 50, 225);
        //toilet coints
        this.toiletCoin = game.add.sprite(game.world.width - 220, game.world.height - 550, 'clock');
        let countToiletCoinStyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.toiletCoinCount = game.add.text(game.world.width - 170, game.world.height - 520, playar.toiletCoints, countToiletCoinStyle);

        //coins
        this.coins.Lavel0();


        //videoCard
        this.videoCard = game.add.sprite(90, 250, 'videoCard');

        let factorStyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.factor = game.add.text(310, 335, "X " + playar.gameFactor, countCoinStyle);

        //KnifeSwitch
        this.knifeSwitch = game.add.button(game.world.centerX - 100, game.world.centerY + 200, "CatchButton", this.TryCatch, this, 0, 0, 1, 0);


        this.autoSaveTimer = game.time.create(false);
        this.autoSaveTimer.loop(5000, () => {
            ///////TODO: SAVE GAME  HERE!
            localStorage.setItem("gamesave", JSON.stringify(playar));
        }, this);
        this.autoSaveTimer.start();
    }

    this.TryCatch = function() {
        game.physics.arcade.overlap(this.catchPoint, this.coins.coins, (catchPoint, coin) => {
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
        coin.kill(game);
    }
}
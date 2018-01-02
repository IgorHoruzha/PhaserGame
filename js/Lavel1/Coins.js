function Coins() {

    this.coins;
    this.coinsTimer; //timer create coins.
    this.Lavel = 0;//TODO: start lavel 0.
    this.Lavel0 = function() {
        this.coins = game.add.group();
        game.physics.enable(this.coins, Phaser.Physics.ARCADE);

        this.coinsTimer = game.time.create(false);

        this.coinsTimer.loop(2000, this.CreateCoints, this);
        this.coinsTimer.start();
    }

    this.ubgrade = function() {
        if (this.Lavel >= 1) {
            //Clear field.
             this.coins.removeAll();           
            if (this.coinsTimer != null) {
                this.coinsTimer.stop();
                this.coinsTimer = null;
            }
            //
            this.coins = game.add.emitter(320, 340,1);
            game.physics.enable(this.coins, Phaser.Physics.ARCADE);
              this.coins.gravity= 55+ this.Lavel*10;
            this.coins.setXSpeed(100+this.Lavel*10, 200+this.Lavel*10);
            this.coins.makeParticles('coin', 0, 250, true, true);
            this.coins.bounce.setTo(0.2+this.Lavel%2/10, 0.6);

            this.coins.start(false, 10000, 1000-(this.Lavel*100));
        }

    }


    this.CreateCoints = function() {
        this.coins.enableBody = true;
        let coin = this.coins.create(250, 300, 'coin');
        
        coin.body.gravity.y = 55;
        coin.body.bounce.y = 0.2 + Math.random() * 0.2;
        coin.body.velocity.x = 150;
    }

    this.DeleteCoin = function(coin, obj) {;
        coin.kill(game);
    }
}
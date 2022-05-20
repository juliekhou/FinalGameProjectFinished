// To be implemented in Sprint 2
class Spawn extends Phaser.Scene {
    constructor() {
        super("Spawn");
    }

    preload() {
        // load background image
        this.load.image('playBackground', "./assets/playBackground.png");
        this.load.image('vampire', './assets/vampire.png');
        this.load.image('dots', './assets/dots.png');
    }

    create() {
        // load background
        this.background = this.add.tileSprite(0, 0, 1280, 960, 'playBackground').setOrigin(0, 0);

        // background obstacles 
        this.obstacle1 = this.physics.add.sprite(-30, 100, 'vampire').setScale(0.6).setOrigin(0, 0).setInteractive();
        this.obstacle1.flipX = true;

        this.obstacle2 = this.physics.add.sprite(800, 400, 'dots').setScale(0.5).setOrigin(0, 0).setInteractive();

        // from https://phaser.io/examples/v3/view/actions/place-on-triangle
        this.triangle = new Phaser.Geom.Triangle.BuildRight(1300, -10, -490, -610);

        // add menu text
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '50px',
            backgroundColor: '#315c2b',
            color: '#220a07',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, 60, 
            "Hider's Eyes Only", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 120, 
            "Choose where to hide at the start!", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 120, 
            "As soon as the you click, the game begins", menuConfig).setOrigin(0.5);

        this.input.on('pointerdown', (pointer) => {
            if(!(Phaser.Geom.Triangle.Contains(this.triangle, pointer.x, pointer.y) || this.obstacle1.getBounds().contains(pointer.x, pointer.y)
                    || this.obstacle2.getBounds().contains(pointer.x, pointer.y))){
                hiderX = pointer.x;
                hiderY = pointer.y;
                this.scene.start('Play');
            }
        });
    }


    update() {
        
    }

}



// Import Phaser library
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let stars;
let shark;
let cursors;
let score = 0;
let scoreText;
let bubbles;
let buttonio;



			function preload() {
				this.load.image('background', 'assets/background.png');
				this.load.image('player', 'assets/player.png');
				this.load.image('star', 'assets/star.png');
				this.load.image('shark', 'assets/shark.png');
				 this.load.image('bubble', 'assets/bubble.png');
				//sounds 
				this.load.audio('try', 'assets/sounds/tryagain.mp3');
			}

			function create() {
				// Add background
				this.add.image(400, 300, 'background');
				
				bubbles = this.physics.add.group({
				allowGravity: false
				
					// Add score text
				/*buttonio = this.add.text(160, 160, 'hellooo', {
					fontSize: '32px',
					fill: '#fff'
				});*/
				
			/*buttonio =	this.add.text(width / 2, height / 2 + 120, 'VISIT WEBSITE', {
    fontSize: '28px',
    backgroundColor: '#00aaff',
    color: '#ffffff',
    padding: { x: 20, y: 10 }
}).setOrigin(0.5).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
    window.open('https://www.example.com', '_blank');
});*/


				
				
				
				
			});

			this.time.addEvent({
				delay: 300, // ms
				loop: true,
				callback: () => {
					const x = Phaser.Math.Between(0, this.scale.width);
					const bubble = bubbles.create(x, this.scale.height + 20, 'bubble');

					bubble.setVelocityY(Phaser.Math.Between(-50, -120));
					bubble.setAlpha(0.7);
					bubble.setScale(Phaser.Math.FloatBetween(0.2, 0.5));
					bubble.setInteractive();
					bubble.setTint(Phaser.Display.Color.RandomRGB().color);
					
					bubble.on('pointerdown', () => {
				trySound.play();
				bubble.destroy()
			});
				}
			});

			this.physics.world.on('worldbounds', (body) => {
				body.gameObject.destroy();
			});
				
				const trySound = this.sound.add('try');

				// Add Pinkfong sprite
				player = this.physics.add.sprite(100, 300, 'player');
				player.setCollideWorldBounds(true);
				player.setScale(0.25)
			player.setFlipX(true);

			player.setInteractive();

			player.on('pointerdown', () => {
				trySound.play();
			});
				// Add stars group
				stars = this.physics.add.group({
					key: 'star',
					repeat: 3,
					setXY: { x: 12, y: 40, stepX: 70 }
				});

				
				
				stars.children.iterate(function (child) {
					child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
					child.setScale(0.25); // 50% size;
				});

				// Add shark
				shark = this.physics.add.sprite(700, 300, 'shark');
				shark.setCollideWorldBounds(true);
				shark.setVelocityY(200);
				shark.setBounce(1);
				shark.setScale(0.25); // 50% size;

				// Add score text
				scoreText = this.add.text(16, 16, 'Score: 0', {
					fontSize: '32px',
					fill: '#fff'
				});
				
				
				buttonio =	this.add.text(200, 200, 'VISIT WEBSITE', {
    fontSize: '28px',
    backgroundColor: '#00aaff',
    color: '#ffffff',
    padding: { x: 20, y: 10 }
}).setOrigin(0.5).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
    window.open('./scenes/cool/index.html', '_blank');
});

				// Enable keyboard input
				cursors = this.input.keyboard.createCursorKeys();

				// Collisions
				this.physics.add.overlap(player, stars, collectStar, null, this);
				this.physics.add.collider(player, shark, hitShark, null, this);
			}

			function update() {
				if (cursors.left.isDown) {
					player.setVelocityX(-160);
				} else if (cursors.right.isDown) {
					player.setVelocityX(160);
				} else {
					player.setVelocityX(0);
				}

				if (cursors.up.isDown) {
					player.setVelocityY(-160);
				} else if (cursors.down.isDown) {
					player.setVelocityY(160);
				} else {
					player.setVelocityY(0);
				}
			}

			function collectStar(player, star) {
				star.disableBody(true, true);
				score += 10;
				scoreText.setText('Score: ' + score);

				if (stars.countActive(true) === 0) {
					stars.children.iterate(function (child) {
						child.enableBody(true, child.x, 0, true, true);
					});
				}
			}

			function hitShark(player, shark) {
				this.physics.pause();
				player.setTint(0xff0000);
				player.anims.play('turn');
				scoreText.setText('Game Over!');
			}



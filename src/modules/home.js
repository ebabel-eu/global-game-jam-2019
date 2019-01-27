'use strict';

/**
 * `Home`
 * Home scene, for players who have nowhere better to go.
 */
class Home extends Phaser.Scene {
  constructor() {
    super('Home');
  }

  playGame() {
    this.scene.start('PlayGame');
  }

  tutorial() {
    this.scene.start('Tutorial');
  }

  create() {
    this.add.image(400, 300, 'home-background').setScrollFactor(0);

    const play = this.add.sprite(400, 240, 'play-button').setScale(0.8);
    play.setInteractive();

    const tutorial = this.add.sprite(400, 360, 'tutorial-button').setScale(0.8);
    tutorial.setInteractive();

    this.add.image(200, 390, 'home-foreground').setScrollFactor(0);

    this.input.on('pointerdown', (pointer, gameObjects) => {
      if (!gameObjects || !gameObjects.length || !gameObjects[0].texture || !gameObjects[0].texture.key) {
        return;
      }

      switch (gameObjects[0].texture.key) {
        case 'play-button':
          this.playGame();
          break;
        case 'tutorial-button':
          this.tutorial();
          break;
      }
    });
  }
}

export default Home;

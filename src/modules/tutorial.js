'use strict';

/**
 * `Tutorial`
 * Tutorial scene, for players who don't have a clue.
 */
class Tutorial extends Phaser.Scene {
  constructor() {
    super('Tutorial');
  }


  playGame() {
    this.sound.stopAll();
    this.scene.start('PlayGame');
  }

  create() {
    this.add.image(400, 300, 'tutorial-background').setScrollFactor(0);

    const play = this.add.sprite(200, 140 , 'play-button').setScale(0.8);
    play.setInteractive();

    this.input.on('pointerdown', (pointer, gameObjects) => {
      if (!gameObjects || !gameObjects.length || !gameObjects[0].texture || !gameObjects[0].texture.key) {
        return;
      }

      this.playGame();
    });
  }
}

export default Tutorial;

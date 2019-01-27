'use strict';

/**
 * `WinGame`
 * Win scene, for players who have cleared all the bad items.
 */
class WinGame extends Phaser.Scene {
  constructor() {
    super('WinGame');
  }

  goHome() {
    this.scene.start('Home');
  }

  reset() {
    this.scene.start('PlayGame');
  }

  create() {
    localStorage['reset'] = true;

    this.add.image(400, 300, 'win-screen').setScrollFactor(0);
    this.add.image(400, 300, 'goodend-menu').setScrollFactor(0);

    const home = this.add.sprite(400, 290, 'home-button').setScale(0.8);
    home.setInteractive();

    const reset = this.add.sprite(400, 360, 'reset-button').setScale(0.8);
    reset.setInteractive();

    this.input.on('pointerdown', (pointer, gameObjects) => {
      if (!gameObjects || !gameObjects.length || !gameObjects[0].texture || !gameObjects[0].texture.key) {
        return;
      }

      switch (gameObjects[0].texture.key) {
        case 'home-button':
          this.goHome();
          break;
        case 'reset-button':
          this.reset();
          break;
      }
    });
  }
}

export default WinGame;

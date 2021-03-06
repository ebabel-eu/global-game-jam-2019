'use strict';

/**
 * `LoseGame`
 * Lose scene, for players who have failed to beat the 10 seconds timer.
 */
class LoseGame extends Phaser.Scene {
  constructor() {
    super('LoseGame');

    this.EG = {
      music: null,
      bombSoundEffect: null,
    };
  }

  goHome() {
    this.sound.stopAll();
    this.scene.start('Home');
  }

  reset() {
    this.sound.stopAll();
    this.scene.start('PlayGame');
  }

  create() {
    this.EG.bombSoundEffect = this.sound.add('music-bomb');
    this.EG.music = this.sound.add('music-lose');

    this.EG.bombSoundEffect.play();
    this.EG.music.play();    

    localStorage['reset'] = true;

    this.add.image(400, 300, 'lose-screen').setScrollFactor(0);
    this.add.image(400, 300, 'badend-menu').setScrollFactor(0);

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

export default LoseGame;

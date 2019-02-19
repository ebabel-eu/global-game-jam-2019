'use strict';

import * as C from '../constants';

/**
 * `PlayGame`
 * Main Phaser scene to play the game.
 */
class PlayGame extends Phaser.Scene {
  constructor() {
    super('PlayGame');

    this.EG = {
      lastTap: null,

      // Pick a random number of dangerous items to throw away in the trashcan.
      maxBadItems: Phaser.Math.Between(1, 5),
      badItems: [],
      trashedBadItems: [],

      music: null,
    };
  }

  preload() {
    this.load.image('win-screen', 'assets/win-screen.jpg');
    this.load.image('lose-screen', 'assets/lose-screen.jpg');
    this.load.image('goodend-menu', 'assets/goodend-menu.png');
    this.load.image('badend-menu', 'assets/badend-menu.png');
    this.load.image('home-button', 'assets/home-button.png');
    this.load.image('reset-button', 'assets/reset-button.png');
  }

  timeIsUp() {
    this.stopMusic();
    this.scene.start('LoseGame');
  }

  stopMusic() {
    this.EG.music.stop();
  }

  create() {
    this.EG.music = this.sound.add('music-play');
    this.EG.music.play({
      loop: true,
    });

    if (localStorage['reset']) {
      this.EG.lastTap = null;
      this.EG.maxBadItems = Phaser.Math.Between(1, 5);
      this.EG.badItems = [];
      this.EG.trashedBadItems = [];
      localStorage.removeItem('reset');
    }

    const timer = this.time.addEvent({
      delay: C.maxTime,
      callback: this.timeIsUp,
      callbackScope: this,
    });

    this.add.image(C.gameWidth / 2, C.gameHeight / 2, 'background-room-1').setScrollFactor(0);

    const bad = ['bomb', 'heart', 'land-mine', 'sword', 'tommy-gun'];

    // Furnish the first room.
    window.EG.rooms[0].items.map(s => {
      const secret = bad[Phaser.Math.Between(0, bad.length - 1)];

      // If the sprite can hide a secret item, place that secret item first.
      if (s.secret && secret && this.EG.badItems.length <= this.EG.maxBadItems) {
        const secretItem = this.add.sprite(s.x, s.y, secret);
        this.EG.badItems.push(secret);
        secretItem.setInteractive();
        this.input.setDraggable(secretItem);
      }

      // Add the main item to the scene, unless this item can be switched.
      let sprite;
      if (s.switched && secret) {
        sprite = this.add.sprite(s.x, s.y, secret);
        this.EG.badItems.push(secret);
      } else {
        sprite = this.add.sprite(s.x, s.y, s.id);
      }
      
      // Make the item draggable if the current rooms says it is.
      if (s.drag) {
        sprite.setInteractive();
        this.input.setDraggable(sprite);
      }
    });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('dragend', (pointer, gameObject, dropped) => {
      if (C.debug) {
        console.log(gameObject.x, gameObject.y, gameObject.texture.key); /* eslint no-console: 0 no-unused-vars: 0 */
      }

      if (gameObject.x > 650 && gameObject.y > 400
          && ['bomb', 'heart', 'land-mine', 'sword', 'tommy-gun'].includes(gameObject.texture.key)) {
        gameObject.visible = false;

        this.EG.trashedBadItems.push(gameObject.texture.key);

        if (this.EG.trashedBadItems.length === this.EG.badItems.length) {
          this.stopMusic();
          this.scene.start('WinGame');
        }
      }
    });
  }
}

export default PlayGame;

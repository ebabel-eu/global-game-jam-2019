'use strict';

import * as C from '../constants';
import distance from '../utils/distance';

/**
 * `PlayGame`
 * Main Phaser scene to play the game.
 */
class PlayGame extends Phaser.Scene {
  constructor() {
    super('PlayGame');

    this.EG = {
      lastTap: null,

      // Pick a random number of safe and dangerous items to hide in the room.
      safeItems: Phaser.Math.Between(1, 2),
      dangerousItems: Phaser.Math.Between(1, 2),
    };
  }

  create() {
    this.add.image(C.gameWidth / 2, C.gameHeight / 2, 'background').setScrollFactor(0);

    this.input.on('pointerdown', this.onTap, this);


    window.EG.art.map(s => {
      const sprite = this.add.sprite(s.x, s.y, s.id).setInteractive();
      this.input.setDraggable(sprite);
      this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });
    });
  }

  onTap(pointer) {
    const isDoubleTap = (this.EG.lastTap && this.EG.lastTap.x === pointer.x && this.EG.lastTap.y === pointer.y
      && (Date.now() - this.EG.lastTap.tapTime) < 250);

    if (isDoubleTap) {
      this.addStamp(pointer.x, pointer.y);
    }

    this.EG.lastTap = { x: pointer.x, y: pointer.y, tapTime: Date.now() };
  }

  addStamp(x, y) {
    // Determine distance from center of the scene.
    const _distance = distance(x, y, C.gameWidth / 2, C.gameHeight / 2);
    let scale = _distance / 400;

    // todo: handle exceptions based on object laid in the scene.

    // todo: define the back wall of the room as an "object"
    scale = (scale < 0.3) ? 0.3 : scale;

    // todo: show the correct frame of the spritesheet based on location in the room.
    this.add.tileSprite(x, y, 100, 100, 'stamps').setScale(scale);
  }

  // Game loop function that gets called continuously unless a game over.
  update() {
  }

}

export default PlayGame;

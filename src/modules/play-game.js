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
    };
  }

  create() {
    this.add.image(C.gameWidth / 2, C.gameHeight / 2, 'background').setScrollFactor(0);

    this.input.on('pointerdown', this.onTap, this);

    window.EG.art.map(a => this.add.image(a.x, a.y, a.id).setScale(0.1));
  }

  onTap(pointer) {
    let isDoubleTap = false;

    if (this.EG.lastTap && this.EG.lastTap.x === pointer.x && this.EG.lastTap.y === pointer.y
        && (Date.now() - this.EG.lastTap.tapTime) < 250) {
      isDoubleTap = true;
    }

    if (isDoubleTap) {
      this.addStamp(pointer.x, pointer.y);
    }

    this.EG.lastTap = { x: pointer.x, y: pointer.y, tapTime: Date.now() };
  }

  addStamp(x, y) {
    const _distance = distance(x, y, C.gameWidth / 2, C.gameHeight / 2);

    let scale = _distance / 400;

    scale = (scale < 0.3) ? 0.3 : scale;

    // todo: handle exceptions based on object laid in the scene.

    // todo: define the back wall of the room as an "object"

    this.add.image(x, y, 'stamps', 1).setScale(scale);
  }

  // Game loop function that gets called continuously unless a game over.
  update() {
  }

}

export default PlayGame;

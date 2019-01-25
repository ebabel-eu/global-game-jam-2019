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
      perpective: null,
    };
  }

  create() {
    this.add.image(C.gameWidth / 2, C.gameHeight / 2, 'perspective').setScrollFactor(0);

    this.input.on('pointerdown', this.onTap, this);
  }

  onTap(pointer) {
    const _distance = distance(pointer.x, pointer.y, C.gameWidth / 2, C.gameHeight / 2);

    let scale = _distance / 400;

    scale = (scale < 0.3) ? 0.3 : scale;

    console.log(scale);

    this.add.image(pointer.x, pointer.y, 'stamps', 0).setScale(scale);
  }

  // Game loop function that gets called continuously unless a game over.
  update() {
  }

}

export default PlayGame;

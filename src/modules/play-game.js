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
    };
  }

  create() {
    this.add.image(C.gameWidth / 2, C.gameHeight / 2, 'background-room-1').setScrollFactor(0);

    this.input.on('pointerdown', this.onTap, this);

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
      const sprite = (s.switched && secret) ?
        this.add.sprite(s.x, s.y, secret)
        : this.add.sprite(s.x, s.y, s.id);
      
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
      }

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
    this.add.tileSprite(x, y, 100, 100, 'stamps');
  }

  // Game loop function that gets called continuously unless a game over.
  update() {
  }

}

export default PlayGame;

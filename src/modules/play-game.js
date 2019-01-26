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

      // Pick a random number of safe and dangerous items to hide in the room.
      maxGoodItems: Phaser.Math.Between(1, 3),
      maxBadItems: Phaser.Math.Between(1, 5),

      goodItems: [],
      badItems: [],
    };
  }

  // Return a randomly selected good or bad hidden item.
  getGoodOrBadSecret() {
    let goodPossible = (this.EG.goodItems.length < this.EG.maxGoodItems);
    let badPossible = (this.EG.badItems.length < this.EG.maxBadItems);

    // Neither good nor bad are possible.
    if (!goodPossible && !badPossible) {
      return null;
    }

    const good = ['chocolate-heart', 'teddy-bear', 'turtle'];
    const bad = ['bomb', 'heart', 'land-mine', 'sword', 'tommy-gun'];

    // Only good is possible.
    if (goodPossible) {
      const goodChoice = good[Phaser.Math.Between(0, good.length - 1)];
      this.EG.goodItems.push(goodChoice);
      return goodChoice;
    }

    //  Only bad is possible.
    if (badPossible) {
      const badChoice = bad[Phaser.Math.Between(0, bad.length - 1)];
      this.EG.badItems.push(badChoice);
      return badChoice;
    }

    return null;
  }

  onObjectClicked(pointer, gameObject) {
    if (!window.isDoubleTap) {
      return;
    }

    console.log(gameObject.texture.key);
  }

  create() {
    this.add.image(C.gameWidth / 2, C.gameHeight / 2, 'background-room-1').setScrollFactor(0);

    this.input.on('pointerdown', this.onTap, this);

    // Furnish the first room.
    window.EG.rooms[0].items.map(s => {
      const secret = this.getGoodOrBadSecret();

      // If the sprite can hide a secret item, place that secret item first.
      if (s.secret && secret) {
        const secretItem = this.add.sprite(s.x, s.y, secret);
        secretItem.setInteractive();
        this.input.on('gameobjectdown', this.onObjectClicked);
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

    if (C.debug) {
        /* eslint no-console: 0 no-unused-vars: 0 */
        this.input.on(
          'dragend',
          (pointer, gameObject, dropped) => console.log(gameObject.x, gameObject.y)
        );
    }
  }

  onTap(pointer) {
    const isDoubleTap = (this.EG.lastTap && this.EG.lastTap.x === pointer.x && this.EG.lastTap.y === pointer.y
      && (Date.now() - this.EG.lastTap.tapTime) < 250);

    window.isDoubleTap = isDoubleTap;

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

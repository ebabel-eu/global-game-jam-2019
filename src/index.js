'use strict';

import * as C from './constants';
import resizeGame from './utils/resize-game';
import debounce from './utils/debounce';
import BootGame from './modules/boot-game';
import PlayGame from './modules/play-game';

// The whole game is enclosed in an anonymous function that runs once all code is loaded.
window.addEventListener('load', () => {
  // Phaser configuration.
  const config = {
    type: Phaser.AUTO,
    width: C.gameWidth,
    height: C.gameHeight,
    backgroundColor: 0xffffff,
    physics: {
      default: 'matter',
    },
    scene: [
      BootGame,
      PlayGame,
    ],
  };

  // Phaser main game object.
  const game = new Phaser.Game(config);

  // Get focus in case the game is in an iframe.
  window.focus();

  // Handle resizing the whole game while preserving aspect ratio.
  resizeGame(game);
  window.addEventListener('resize', debounce(() => {
    resizeGame(game);
  }, C.debounceDelay));
});

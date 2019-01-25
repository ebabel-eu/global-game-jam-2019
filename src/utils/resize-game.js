'use strict';


/**
 * `resizeGame`
 * Handle resizing the whole game while preserving aspect ratio.
 * @param {Object} game Phaser game object. 
 */
const resizeGame = (game) => {
  const canvas = document.querySelector('body > canvas');
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowRatio = windowWidth / windowHeight;
  const gameRatio = game.config.width / game.config.height;

  if (windowRatio < gameRatio) {
    canvas.style.width = `${windowWidth}px`;
    canvas.style.height = `${(windowWidth / gameRatio)}px`;
  } else {
    canvas.style.width = `${(windowHeight * gameRatio)}px`;
    canvas.style.height = `${windowHeight}px`;
  }
};

export default resizeGame;

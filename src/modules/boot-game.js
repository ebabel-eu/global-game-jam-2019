'use strict';

/**
 * `BootGame`
 * First Phaser scene, to preload all assets.
 */
class BootGame extends Phaser.Scene {
  constructor() {
    super('BootGame');

    // Add drag to an item to make it draggable.
    const drag = true;

    // Add secret to an item to let it hide other items (safe or dangerous).
    const secret = true;

    // Some items, like the light bulb, can be switched with a secret item instead.
    const switched = true;

    window.EG = {
      art: [
        'carpet',
        'bomb', 'heart', 'land-mine', 'sword', 'tommy-gun',
        'chocolate-heart', 'teddy-bear', 'turtle',
        'couch', 'couch-pillow', 'pillow', 'pillow-2',
        'desk', 'light-bulb', 'lamp-shade',
        'painting-of-pilgrims', 'painting-of-gorge',
        'plant-pot', 'plant', 'piranha-plant',
        'trashcan',
        'goodend-menu', 'home-button', 'reset-button',
      ],
      rooms: [
        {
          description: 'first room',

          items: [
            {id: 'carpet', x: 402, y: 448},

            {id: 'trashcan', x: 711, y: 488},

            {id: 'couch', x: 416, y: 379},
            {id: 'couch-pillow', x: 417, y: 393},
            {id: 'pillow', x: 364, y: 307, drag, secret},
            {id: 'pillow-2', x: 473, y: 317, drag, secret},

            {id: 'plant-pot', x: 672, y: 335},

            {id: 'painting-of-gorge', x: 83, y: 191, drag, secret},

            {id: 'plant', x: 678, y: 249, drag, secret},

            {id: 'desk', x: 92, y: 407, drag},
            {id: 'light-bulb', x: 103, y: 304, drag, switched},
            {id: 'lamp-shade', x: 100, y: 271, drag},
          ],
        },
      ],
    };
  }

  // Phaser function to preload all assets.
  preload() {
    // Graphics.
    this.load.image('background-room-1', 'assets/background-room-1.png');
    this.load.spritesheet('stamps', 'assets/stamps.png', { frameWidth: 500, frameHeight: 100 });

    // Load all art graphics.
    window.EG.art.map(a => this.load.image(a, `assets/${a}.png`));

    // Audio.
    // todo: preload audio files.
  }

  // Phaser function, here used to activate the play button once the preload has completed its work.
  create() {
    document.getElementById('play-button').addEventListener('click', (e) => {
      e.preventDefault();

      // Hide the loading screen when the player clicks on the enabled Play button.
      document.getElementById('loading').style.display = 'none';

      // Display the canvas.
      document.querySelector('body > canvas').style.display = 'block';

      this.scene.start('PlayGame');
    });

    // Game has finished loading all assets, so it's possible to start playing.
    document.getElementById('play-button').disabled = false;
    document.getElementById('loading-animation').style.display = 'none';
  }
}

export default BootGame;

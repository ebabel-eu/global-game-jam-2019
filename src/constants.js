const debug = (localStorage['debug'] === 'true') ? true : false;

module.exports = {
  debug,

  gameWidth: 800,
  gameHeight: 600,
  gravity: 300,

  // World bounds can be greater than canvas gameWidth and gameHeight,
  // so the camera can move to new areas beyond the initial screen area.
  worldBoundsWidth: 800,
  worldBoundsHeight: 600,
};

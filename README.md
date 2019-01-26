# global-game-jam-2019
Game for Global Game Jam 2019

### Requirements
We need [Node.js](https://nodejs.org) to install and run scripts.

## Install and run
Run next commands in your terminal:

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies.|
| `npm test` | Lint the source code and run all automated tests.|
| `npm run build` | One-off build of the game.|
| `npm run watch` | Continuously build the game during development.|
| `npm start` | Build bundle and run game on localhost:8080. <br> Press `Ctrl + c` to kill **http-server** process. |

Browse to http://localhost:8080 to play the game.

## Deploy to Firebase
```
npm install -g firebase-tools
firebase login
firebase use --add [name of your Firebase app]
firebase deploy --only hosting
```

## Test localhost on a touch device
- [Check your local IP](https://www.whatismyip.com/) on your network (it should start with 192.168.).
- Put your touch device on the same network as your development machine (same Wifi for eample).
- Add the port :8080 to the IP.
- You should now be able to test the game running on your machine with your touch device.

## Switch the debug mode on or off
By default, debug mode is off. To switch it on, run in Javascript console of your browser:
```
localStorage['debug'] = true;
```

## Shared assets

https://drive.google.com/drive/folders/1_4c_L--_dbe9DUkPZQk9u6bk12nrYvul

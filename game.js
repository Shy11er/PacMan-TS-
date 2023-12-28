const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const block_size = 40;
const directions = {
  RIGHT: "RIGHT",
  LEFT: "LEFT",
  UP: "UP",
  DOWN: "DOWN",
};
const FPS = 30;
const wallSpaceWidth = block_size / 2;
const wallOffset = (block_size - wallSpaceWidth) / 2;

const createRect = (x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

let map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
  [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const pacman = new Pacman(10 * block_size + wallOffset, 21 * block_size + wallOffset, 20, 20, 40);

class Game {
  drawWalls = () => {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] == 1) {
          createRect(
            j * block_size,
            i * block_size,
            block_size,
            block_size,
            "#342DCA"
          );
          createRect(
            j * block_size + wallOffset,
            i * block_size + wallOffset,
            block_size - 2 * wallOffset,
            block_size - 2 * wallOffset,
            "black"
          );
        }

        if (j > 0 && map[i][j - 1] == 1) {
          createRect(
            j * block_size,
            i * block_size + wallOffset,
            wallSpaceWidth + wallOffset,
            wallSpaceWidth,
            "black"
          );
        }
        if (j < map[0].length - 1 && map[i][j + 1] == 1) {
          createRect(
            j * block_size + wallOffset,
            i * block_size + wallOffset,
            wallSpaceWidth + wallOffset,
            wallSpaceWidth,
            "black"
          );
        }

        if (i > 0 && map[i - 1][j] == 1) {
          createRect(
            j * block_size + wallOffset,
            i * block_size,
            wallSpaceWidth,
            wallSpaceWidth + wallOffset,
            "black"
          );
        }
        if (i < map.length - 1 && map[i + 1][j] == 1) {
          createRect(
            j * block_size + wallOffset,
            i * block_size + wallOffset,
            wallSpaceWidth,
            wallSpaceWidth + wallOffset,
            "black"
          );
        }
      }
    }
  };

  drawFood = () => {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] == 2) {
          createRect(
            j * block_size + block_size / 3,
            i * block_size + block_size / 3,
            block_size / 3,
            block_size / 3,
            "orange"
          );
        }
      }
    }
  };

  update = () => {
    this.draw();
    pacman.update();
  };

  draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createRect(ctx, 0, 0, canvas.width, canvas.height);
    this.drawWalls();
    this.drawFood();
  };
}

const game = new Game();

const gameInterval = setInterval(() => game.update(), 1000 / FPS);

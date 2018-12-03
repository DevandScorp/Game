import Sprite from './sprite';

export default class FightInterface {
  constructor(canvas, ctx, resources) {
    this.resources = resources;
    this.canvas = canvas;
    this.ctx = ctx;
    this.bulletSpeed = 500;
    this.bullets = [];
    this.enemy = FightInterface.getEnemySprites();
    this.player = {
      pos: [0, 0],
      sprite: new Sprite('img/knights.png', [0, 0], [256, 256], 10, [0, 1, 2, 3, 4, 5, 6]),
    };
  }

  static getEnemySprites() {
    const orkBody = {
      pos: [0, 0],
      sprite: new Sprite('img/ork_sprite.png', [220 * FightInterface.getRandomInt(0, 3), 935], [220, 240]),
    };
    const leftLeg = {
      pos: [0, 0],
      sprite: new Sprite('img/ork_sprite.png', [85 * FightInterface.getRandomInt(0, 3), 0], [85, 120]),
    };
    const rightLeg = {
      pos: [0, 0],
      sprite: new Sprite('img/ork_sprite.png', [85 * FightInterface.getRandomInt(0, 3), 120], [85, 120]),
    };
    const rightHand = {
      pos: [0, 0],
      sprite: new Sprite('img/ork_sprite.png', [219 * FightInterface.getRandomInt(0, 3), 240], [219, 282]),
    };
    const leftHand = {
      pos: [0, 0],
      sprite: new Sprite('img/ork_sprite.png', [165 * FightInterface.getRandomInt(0, 3), 720], [165, 210]),
    };
    const head = {
      pos: [0, 0],
      sprite: new Sprite('img/ork_sprite.png', [220 * FightInterface.getRandomInt(0, 3), 525], [220, 195]),
    };
    return [rightLeg, leftLeg, rightHand, orkBody, head, leftHand];
  }

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  makeShot() {
    const x = this.player.pos[0] + this.player.sprite.size[0] / 2;
    const y = this.player.pos[1];

    this.player.sprite = new Sprite('img/knights_attack.png', [0, 0], [256, 256], 15, [0, 1, 2, 3, 4, 5]);
    setTimeout(() => {
      this.player.sprite = new Sprite('img/knights.png', [0, 0], [256, 256], 10, [0, 1, 2, 3, 4, 5]);
      this.bullets.push({
        pos: [x, y],
        sprite: new Sprite('img/fire.png', [0, 0], [256, 256], 10, [0, 1, 2, 3, 4, 5]),
      });
    }, 300);
  }

  updateEntities(dt) {
    this.player.sprite.update(dt);

    this.enemy.forEach(a => a.sprite.update(dt));

    for (let i = 0; i < this.bullets.length; i += 1) {
      this.bullets[i].pos[0] += this.bulletSpeed * dt;
      this.bullets[i].sprite.update(dt);
      if (this.bullets[i].pos[0] >= this.enemy[2].pos[0]) {
        this.bullets.splice(i, 1);
        i -= 1;
      }
    }
  }

  renderEntity(entity) {
    this.ctx.save();
    this.ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(this.ctx, this.resources);
    this.ctx.restore();
  }

  render() {
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderEntity(this.player);
    this.renderEntities(this.enemy);
    this.renderEntities(this.bullets);
  }

  renderEntities(list) {
    for (let i = 0; i < list.length; i += 1) {
      this.renderEntity(list[i]);
    }
  }

  reset() {
    this.bullets = [];
    this.player.pos = [0, this.canvas.height / 2 - this.player.sprite.size[0] / 2];
    this.enemy.splice(0, this.enemy.length);
    this.enemy.push(...FightInterface.getEnemySprites());
    const bodySizeX = this.enemy[3].sprite.size[0];
    const bodySizeY = this.enemy[3].sprite.size[1];
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    this.enemy[3].pos = [canvasWidth - bodySizeX - 200, canvasHeight / 2 - bodySizeY / 2];
    this.enemy[1].pos = [canvasWidth - bodySizeX - 180, canvasHeight / 2 - bodySizeY / 2 + 180];
    this.enemy[0].pos = [canvasWidth - bodySizeX - 90, canvasHeight / 2 - bodySizeY / 2 + 180];
    this.enemy[2].pos = [canvasWidth - bodySizeX - 360, canvasHeight / 2 - bodySizeY / 2 + 20];
    this.enemy[5].pos = [canvasWidth - bodySizeX - 45, canvasHeight / 2 - bodySizeY / 2 + 40];
    this.enemy[4].pos = [canvasWidth - bodySizeX - 210, canvasHeight / 2 - bodySizeY / 2 - 80];
  }
}

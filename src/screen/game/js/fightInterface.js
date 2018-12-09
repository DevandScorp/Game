/* eslint-disable no-undef */
/* eslint-disable no-alert */
import Sprite from './sprite';
import makeASound from './musicHandler';
import moveHealth from './changeHealthBar';

export default class FightInterface {
  constructor(canvas, ctx, resources) {
    this.resources = resources;
    this.canvas = canvas;
    this.ctx = ctx;
    this.bulletSpeed = 500;
    this.bullets = [];
    this.enemy = FightInterface.getEnemySprites();
    this.isDamaged = false;
    this.isHealed = false;

    this.player = {
      sprite: new Sprite('img/knight.png', [0, 0], [256, 256], 10, [0, 1, 2, 3, 4, 5, 6]),
    };
    this.player.pos = [25, this.canvas.height / 2 - this.player.sprite.size[0] / 2];
    this.damage = {
      pos: [25, this.canvas.height / 2 - this.player.sprite.size[0] / 2],
      sprite: new Sprite('img/explosion.png', [0, 0], [256, 256], 15, [0, 1, 2, 3, 4, 5, 6]),
    };
    this.heal = {
      pos: [25, this.canvas.height / 2 - this.player.sprite.size[0] / 2],
      sprite: new Sprite('img/heal.png', [0, 0], [256, 256], 10, [0, 1, 2, 3, 4, 5, 6]),
    };
    this.orkHealth = 100;
    this.heroHealth = 100;
    this.heroClassElement = document.querySelector('.heroLife');
    this.orkClassElement = document.querySelector('.orkLife');
  }

  static getEnemySprites() {
    const orkSpriteLocation = 'img/orkSprite.png';
    const orkBody = {
      pos: [0, 0],
      sprite:
          new Sprite(orkSpriteLocation, [220 * FightInterface.getRandomInt(0, 3), 935], [220, 240]),
    };
    const leftLeg = {
      pos: [0, 0],
      sprite:
          new Sprite(orkSpriteLocation, [85 * FightInterface.getRandomInt(0, 3), 0], [85, 120]),
    };
    const rightLeg = {
      pos: [0, 0],
      sprite:
          new Sprite(orkSpriteLocation, [85 * FightInterface.getRandomInt(0, 3), 120], [85, 120]),
    };
    const rightHand = {
      pos: [0, 0],
      sprite:
          new Sprite(orkSpriteLocation, [219 * FightInterface.getRandomInt(0, 3), 240], [219, 282]),
    };
    const leftHand = {
      pos: [0, 0],
      sprite:
          new Sprite(orkSpriteLocation, [165 * FightInterface.getRandomInt(0, 3), 720], [165, 210]),
    };
    const head = {
      pos: [0, 0],
      sprite:
          new Sprite(orkSpriteLocation, [220 * FightInterface.getRandomInt(0, 3), 525], [220, 195]),
    };
    return [rightLeg, leftLeg, rightHand, orkBody, head, leftHand];
  }

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  makeShot() {
    const x = this.player.pos[0] + this.player.sprite.size[0] / 2;
    const y = this.player.pos[1];

    this.player.sprite = new Sprite('img/knightAttack.png', [0, 0], [256, 256], 15, [0, 1, 2, 3, 4, 5]);
    setTimeout(() => {
      this.player.sprite = new Sprite('img/knight.png', [0, 0], [256, 256], 10, [0, 1, 2, 3, 4, 5]);
      this.bullets.push({
        pos: [x, y],
        sprite: new Sprite('img/fire.png', [0, 0], [256, 256], 10, [0, 1, 2, 3, 4, 5]),
      });
    }, 300);
    makeASound('../game/sounds/iceball.wav');
  }

  attackHero() {
    this.heroHealth -= 25;
    console.log(this.heroHealth);
    moveHealth(this.heroClassElement, this.heroHealth);
    this.isDamaged = true;
    this.player.sprite = new Sprite('img/damage.png', [0, 0], [256, 256], 15, [0, 1, 2, 3, 4, 5]);
    setTimeout(() => {
      this.player.sprite = new Sprite('img/knight.png', [0, 0], [256, 256], 10, [0, 1, 2, 3, 4, 5]);
      this.isDamaged = false;
    }, 300);
    makeASound('../game/sounds/qubodup-BangShort.ogg');
  }

  healHero() {
    if (this.heroHealth !== 100) {
      this.heroHealth += 25;
      moveHealth(this.heroClassElement, this.heroHealth);
      console.log(this.heroHealth);
    }
    this.isHealed = true;
    setTimeout(() => {
      this.isHealed = false;
    }, 1000);
    makeASound('../game/sounds/blessing.ogg');
  }

  updateEntities(dt) {
    this.player.sprite.update(dt);

    this.enemy.forEach(a => a.sprite.update(dt));

    this.heal.sprite.update(dt);
    this.damage.sprite.update(dt);

    for (let i = 0; i < this.bullets.length; i += 1) {
      this.bullets[i].pos[0] += this.bulletSpeed * dt;
      this.bullets[i].sprite.update(dt);
      if (this.bullets[i].pos[0] >= this.enemy[2].pos[0]) {
        this.orkHealth -= 25;
        console.log(this.orkHealth);
        moveHealth(this.orkClassElement, this.orkHealth);
        this.bullets.splice(i, 1);
        i -= 1;
      }
    }
    if (!this.heroHealth) {
      alert('Lose');
      this.reset();
    }
    if (!this.orkHealth) {
      alert('Win');
      this.reset();
    }
  }

  renderEntity(entity) {
    this.ctx.save();
    this.ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(this.ctx, this.resources);
    this.ctx.restore();
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderEntity(this.player);
    if (this.isDamaged) {
      this.renderEntity(this.damage);
    }
    if (this.isHealed) {
      this.renderEntity(this.heal);
    }
    this.renderEntities(this.enemy);
    this.renderEntities(this.bullets);
  }

  renderEntities(list) {
    for (let i = 0; i < list.length; i += 1) {
      this.renderEntity(list[i]);
    }
  }

  reset() {
    this.heroHealth = 100;
    this.orkHealth = 100;

    this.bullets = [];

    this.player.pos = [25, this.canvas.height / 2 - this.player.sprite.size[0] / 2];
    this.damage.pos = [25, this.canvas.height / 2 - this.player.sprite.size[0] / 2];
    this.heal.pos = [25, this.canvas.height / 2 - this.player.sprite.size[0] / 2];

    this.enemy.splice(0, this.enemy.length);
    this.enemy.push(...FightInterface.getEnemySprites());

    const bodySizeX = this.enemy[3].sprite.size[0];
    const bodySizeY = this.enemy[3].sprite.size[1];
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;

    this.orkClassElement.style.width = '50%';
    this.orkClassElement.innerHTML = '100%';
    this.heroClassElement.style.width = '50%';
    this.heroClassElement.innerHTML = '100%';

    this.enemy[3].pos = [canvasWidth - bodySizeX - 200, canvasHeight / 2 - bodySizeY / 2];
    this.enemy[1].pos = [canvasWidth - bodySizeX - 180, canvasHeight / 2 - bodySizeY / 2 + 180];
    this.enemy[0].pos = [canvasWidth - bodySizeX - 90, canvasHeight / 2 - bodySizeY / 2 + 180];
    this.enemy[2].pos = [canvasWidth - bodySizeX - 360, canvasHeight / 2 - bodySizeY / 2 + 20];
    this.enemy[5].pos = [canvasWidth - bodySizeX - 45, canvasHeight / 2 - bodySizeY / 2 + 40];
    this.enemy[4].pos = [canvasWidth - bodySizeX - 210, canvasHeight / 2 - bodySizeY / 2 - 80];
  }
}

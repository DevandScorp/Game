export default class Sprite {
  constructor(url, pos, size, speed, frames, dir, once) {
    this.pos = pos;
    this.size = size;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this.index = 0;
    this.url = url;
    this.dir = dir || 'horizontal';
    this.once = once;
  }

  update(dt) {
    this.index += this.speed * dt;
  }

  render(tx, resources) {
    let frame;

    if (this.speed > 0) {
      const max = this.frames.length;
      const idx = Math.floor(this.index);
      frame = this.frames[idx % max];

      if (this.once && idx >= max) {
        this.done = true;
        return;
      }
    } else {
      frame = 0;
    }
    let x = this.pos[0];
    x += frame * this.size[0];
    tx.drawImage(resources.get(this.url),
      x, this.pos[1],
      this.size[0], this.size[1],
      0, 0,
      this.size[0], this.size[1]);
  }
}

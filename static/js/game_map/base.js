import { GAME_OBJ } from '../game_object/base.js';
import { Controller } from '../controller/base.js';
class GAME_MAP extends GAME_OBJ {
  constructor(root) {
    super();
    this.root = root;
    this.$canvas = $('<canvas tabindex=0 width="1600" height="800"></canvas>');
    this.ctx = this.$canvas[0].getContext('2d');
    this.root.$id.append(this.$canvas);
    this.$canvas.focus();
    this.Controller = new Controller(this.$canvas);
    this.root.$id.append($(`<div class="head">
    <div class="player1-hp"><div><div></div></div></div>
    <div class="timer">180</div>
    <div class="player2-hp"><div><div></div></div></div>
  </div>`));
    this.time_left = 91000;
    this.$timer = this.root.$id.find('.timer');

  }
  start() {

  }
  update() {
    this.time_left -= this.timedelta;
    if (this.time_left <= 0) {
      this.time_left = 0;
      let [a, b] = this.root.players;
      if (a.status !== 6 && b.status !== 6) {
        a.status = b.status = 6;
        a.vx = b.vx = 0;
        a.frame_current_cnt = b.frame_current_cnt = 0;
      }

    }
    this.$timer.text(parseInt(this.time_left / 1000));
    this.render();
  }

  render() {
    //初期背景渲染测试
    // this.ctx.fillStyle = 'blue';
    // this.ctx.fillRect(0, 0, this.$canvas.width(), this.$canvas.height());
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

  }
}

export {
  GAME_MAP,
}
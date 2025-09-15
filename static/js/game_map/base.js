import { GAME_OBJ } from '/static/js/game_object/base.js';
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
    <div class="timer">60</div>
    <div class="player2-hp"><div><div></div></div></div>
  </div>`));


  }
  start() {

  }
  update() {
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
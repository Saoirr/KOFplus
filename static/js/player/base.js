import { GAME_OBJ } from "../game_object/base.js";

class player extends GAME_OBJ {
  constructor(root, info) {
    super();
    this.root = root;//root本身即KOF类的基类，root为了索引map类或者其他类
    this.p_Id = info.p_Id;
    this.x = info.x;
    this.y = info.y;
    this.width = info.width;
    this.height = info.height;
    this.vx = 0;
    this.vy = 0;
    this.color = info.color;

    this.speedx = 500;//水平速度
    this.speedy = 1500;//跳起初始速度
    this.gravity = 50;
    this.direction = 1;//正方向是1（一开始都朝向右边），  反方向则是-1;
    this.ctx = this.root.game_map.ctx;
    this.status = 3;//状态机，0：站立不动，1：向前（移动），2：后退（2也是1的一种，只是方向不同），3：跳起，4：攻击，5：被打，6：死亡
    this.pressed_keys = this.root.game_map.Controller.pressed_keys;
    this.frame_current_cnt = 0;//帧编号
    this.animations = new Map();
  }

  start() {

  }
  update() {
    this.update_controller();
    this.update_move();
    this.update_direction();
    this.update_attack();
    this.render();
  }

  render() {
    //矩形渲染
    // this.ctx.fillStyle = this.color; 
    // this.ctx.fillRect(this.x, this.y, this.width, this.height);

    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    //以下渲染拳头方块
    if (this.p_Id === 1) {//kyo
      if (this.direction > 0) {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(this.x + 240, this.y + 30, 30, 30);
      }
      else {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(this.x - 240 + this.width - 30, this.y + 30, 30, 30);
      }
    }


    else {//Mai
      if (this.direction > 0) {//正方向
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(this.x + 240 + this.width - 30, this.y + 30, 30, 30);
      }
      else {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(this.x - 240, this.y + 30, 30, 30);
      }
    }


    let status = this.status;

    if (this.status === 1 && this.direction * this.vx < 0) status = 2;//特判后退为2

    let obj = this.animations.get(status);//map字典查状态，obj当前状态获得的x.gif
    if (obj && obj.loading) {
      if (this.direction > 0) {
        let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
        let img = obj.gif.frames[k].image;
        this.ctx.drawImage(img, this.x, this.y + obj.offset_y, img.width * obj.scale, img.height * obj.scale);
      }
      else {
        this.ctx.save();
        this.ctx.scale(-1, 1);
        this.ctx.translate(-this.root.game_map.$canvas.width(), 0);

        let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
        let img = obj.gif.frames[k].image;
        this.ctx.drawImage(img, this.root.game_map.$canvas.width() - this.x - this.width, this.y + obj.offset_y, img.width * obj.scale, img.height * obj.scale);

        this.ctx.restore();
      }
    }

    if (status === 4) {
      if (this.frame_current_cnt === obj.frame_rate * (obj.frame_cnt - 1)) {//播放完一周期动画，刚好卡在最后一帧
        console.log("Attack animation finished, resetting status to 0"); // 调试信息
        this.status = 0;
        //this.frame_current_cnt = 0;
      }
    }
    this.frame_current_cnt++;//帧数编号加一


  }

  update_attack() {
    if (this.p_Id === 2) {//Mai
      if (this.status === 4 && this.frame_current_cnt === 70) {
        this.status = 0;
        let me = this, you = this.root.players[3 - me.p_Id - 1];
        let r1;//拳头矩形
        if (me.direction > 0) {//this.x + 240 + this.width - 30, this.y + 30, 30, 30
          r1 = {
            x1: me.x + 240 + this.width - 30,
            y1: me.y + 30,
            x2: me.x + 240 + this.width - 30 + 30,
            y2: me.y + 30 + 30,
          };
        }
        else {
          r1 = {//this.x - 240, this.y + 30, 30, 30
            x1: me.x + 240,
            y1: me.y + 30,
            x2: me.x + 240 + 30,
            y2: me.y + 30 + 30,
          };
        }
        let r2//身体矩形


      }
    }

    else {//kyo
      if (this.status === 4 && this.frame_current_cnt === 35) {
        this.status = 0;
        let me = this, you = this.root.players[3 - me.p_Id - 1];
        let r1;
        if (me.direction > 0) {//this.x + 240, this.y + 30, 30, 30
          r1 = {
            x1: me.x + 240,
            y1: me.y + 30,
            x2: me.x + 240 + 30,
            y2: me.y + 30 + 30,
          };
        }
        else {
          r1 = {//this.x - 240 + this.width - 30, this.y + 30, 30, 30
            x1: me.x - 240 + this.width - 30,
            y1: me.this.y + 30,
            x2: me.x - 240 + this.width - 30 + 30,
            y2: me.this.y + 30 + 30,
          };
        }
        let r2//身体矩形


      }
    }

  }

  update_direction() {
    let players = this.root.players;
    if (players[0] && players[1]) {
      let me = this, you = players[3 - me.p_Id - 1];
      if (me.x < you.x) me.direction = 1;
      else me.direction = -1;
    }
  }


  update_move() {
    if (this.status === 3) this.vy += this.gravity;
    this.x += this.vx * this.timedelta / 1000;
    this.y += this.vy * this.timedelta / 1000;
    if (this.y > 500) {
      this.y = 500;
      this.vy = 0;
      this.status = 0;
    }

    if (this.x < 0) {
      this.x = 0;
    }
    else if ((this.x + this.width) > this.root.game_map.$canvas.width()) {
      this.x = this.root.game_map.$canvas.width() - this.width;
    }
  }

  update_controller() {//操作函数
    let w, a, d, g;
    if (this.p_Id === 1) {
      w = this.pressed_keys.has("w");//跳跃
      a = this.pressed_keys.has("a");
      d = this.pressed_keys.has("d");
      g = this.pressed_keys.has("g");//攻击
    }

    else {
      w = this.pressed_keys.has("ArrowUp");
      a = this.pressed_keys.has("ArrowLeft");
      d = this.pressed_keys.has("ArrowRight");
      g = this.pressed_keys.has("6") || this.pressed_keys.has("Numpad6");
    }

    if (this.status === 0 || this.status === 1 || this.status === 2) {
      if (g) {
        console.log("Attack triggered, status set to 4"); // 调试信息
        this.status = 4;
        this.vx = 0;
        this.frame_current_cnt = 0;//从第0帧开始渲染
      }
      else if (w) {//这里一定要else if 因为渲染时一次性判别的，if跳到else，这g情况的status=4就被=0覆盖了
        if (d) {
          this.vx = this.speedx;
        }
        else if (a) {
          this.vx = -this.speedx;
        }
        else {
          this.vx = 0;
        }
        this.vy = -this.speedy;
        this.status = 3;
        this.frame_current_cnt = 0;//从第0帧开始渲染
      }
      else if (d) {
        this.vx = this.speedx;
        this.status = 1;
      }
      else if (a) {
        this.vx = -this.speedx;
        this.status = 1;
      }
      else {
        this.vx = 0;
        this.status = 0;
      }
    }

    if (this.status === 3) {
      if (d) {
        this.vx = this.speedx;
      }
      else if (a) {
        this.vx = -this.speedx;
      }
      // else {
      //   this.vx = 0;
      // }//这里注释掉是因为能在跳跃时保持之前按的水平速度惯性

    }

  }



}



export {
  player,
}

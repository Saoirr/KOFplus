
let obj_vector = [];

class GAME_OBJ {
  constructor() {
    obj_vector.push(this);
    this.timedelta = 0;
    this.has_call_start = false;
  }

  start() {//初始执行一次


  }

  update() {//第一帧过后的每帧执行函数

  }

  destroy() {//删除当前对象
    for (let i in obj_vector) {
      if (this == obj_vector[i]) {
        obj_vector.splice(i, 1);
        break;
      }
    }
  }

}

let last_timestamp;

let GAME_OBJ_FRAME = (timeStamp) => {
  for (let e of obj_vector) {
    if (!e.has_call_start) {
      e.start();
      e.has_call_start = true;  
    }
    else {
      e.timedelta = timeStamp - last_timestamp;
      e.update();
    }
  }
  last_timestamp = timeStamp;

  requestAnimationFrame(GAME_OBJ_FRAME);
};
requestAnimationFrame(GAME_OBJ_FRAME);

export {
  GAME_OBJ,
}
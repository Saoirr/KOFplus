class Controller {
  constructor($canvas) {
    this.pressed_keys = new Set();
    this.$canvas = $canvas;
    this.start();
  }

  start() {
    let outer = this;
    this.$canvas.keydown((e) => {
      console.log('Key pressed:', e.key); // 调试信息
      outer.pressed_keys.add(e.key);
    });
    
    this.$canvas.keyup((e) => {
      console.log('Key released:', e.key); // 调试信息
      outer.pressed_keys.delete(e.key);
    });
  }
}

export {
  Controller,
}
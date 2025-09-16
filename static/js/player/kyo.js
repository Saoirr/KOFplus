import { player } from "./base.js";
import { GIF } from "../utils/gif.js";
class kyo extends player {
  constructor(root, info) {
    super(root, info);
    this.init_animations();
  }

  init_animations() {
    let outer = this;
    let offsets = [-22, -50, -50, -170, -22, 0, 0, -22];
    for (let i = 0; i < 8; i++) {
      let gif = GIF();
      gif.load(`./static/img/player/kyo/${i}.gif`);
      this.animations.set(i, {
        gif: gif,
        frame_cnt: 0,//总图片
        frame_rate: 7,//每等7帧过度一帧
        offset_y: offsets[i],//偏移量
        loading: false,//是否加载完成
        scale: 2.5,//放大倍数
      });
      gif.onload = () => {
        let obj = outer.animations.get(i);
        obj.frame_cnt = gif.frames.length;
        obj.loading = true;
        if (i === 3) obj.frame_rate = 9;
      }
    }
  }


}


export {
  kyo,
}
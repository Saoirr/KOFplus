

import { player } from '/static/js/player/base.js';
import { GAME_MAP } from '/static/js/game_map/base.js';
import { kyo } from './player/kyo.js';
import { Mai } from './player/Mai.js';
class KOF {
  constructor(id) {
    this.$id = $(`#${id}`);//该属性用于筛选div

    this.game_map = new GAME_MAP(this);// 使用该类去创建map类
    this.players =
      [
        new kyo(this, {
          p_Id: 1,
          x: 400,
          y: 0,
          width: 140,
          height: 250,
          color: 'black',
        }),

        new Mai(this, {
          p_Id: 2,
          x: 1200,
          y: 0,
          width: 140,
          height: 250,
          color: 'green',
        }),
      ];
  }
}

export {
  KOF,
}
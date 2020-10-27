import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 音频对象
    musicAudio: null,
    // 视频对象
    musicVideo: null,

    // 临时歌曲列表
    songList: [{
        name: '来たれわが街へ～夢見るわが街～酒場のポルカ～来たれわが街へ',
        singer: '椙山浩一 / 東京都交響楽団'
      },
      {
        name: '青柠',
        singer: '徐秉龙 / 桃十五'
      },
      {
        name: '天の祈り',
        singer: '椙山浩一 / 東京都交響楽団'
      },
      {
        name: '爱要坦荡荡',
        singer: '萧潇'
      },
      {
        name: '小星星',
        singer: '汪苏泷'
      }
    ]
  },
  mutations: {
    // 更新vuex中state数据
    _update(state, {
      data
    }) {
      if (typeof data.key === 'string') {
        state[data.key] = data.value;
      } else {
        let keyt = undefined;

        for (let i = 0; i < data.key.length - 1; i++) {
          if (keyt === undefined) {
            keyt = state[data.key[i]]
          } else {
            keyt = keyt[i]
          }
        }
        keyt[data.key[data.key.length - 1]] = data.value;
      }
    }
  },
  actions: {},
  modules: {}
})
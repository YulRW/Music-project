import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 音频对象
    musicAudio: null,
    // 视频对象
    musicVideo: null,

    // 歌曲列表
    songList: []
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
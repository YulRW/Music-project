import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 全局状态
    status:{
      currentMusicOpen:false,
      currentMusicListOpen:false,
      currentSinger:false,
      currentMV :false
    },
    // 音频对象
    musicAudio: null,
    // 视频对象
    musicVideo: null,

    // 歌曲列表
    songList: [],

    // 登录状态
    isLogin: false,

    // 用户数据对象
    userInfo: {},

    // 主题
    theme: 'default',
    // 主题数据
    themeData: [{

    }],
    // 全局快捷消息弹窗
    showSnackbar: null,

    //用户“喜欢”歌单
    myLoveList: [],

    // 用户所有歌单
    mySongList: [],

    // 当前歌曲
    currentMusic:null,

    // 播放状态
    isPlay:false,

    // 当前歌单
    currentMusicList:null,

    // 当前歌单中歌曲的index
    curPlayerIndex:0,

    // 当前歌手信息
    currentSinger:null,

    //当前播放的MV
    curPlayerMV: null
  },
  mutations: {
    // 更新vuex中state数据
    _update(state, {
      data
    }) {
      if (typeof data.key === 'string') {
        console.log('*************');
        console.log(data.key);
        console.log(data.value);
        state[data.key] = data.value;
        console.log(state[data.key]);
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
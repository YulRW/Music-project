import store from '../store'
import yyHot from './yyHot'

/**
 * 切换歌曲
 * @param {Array} arr 歌曲列表
 * 
 * return：undefined
 */
const changeMusic = function (arr) {
    yyHot.update('songList', arr)
}

export default {
    changeMusic,
}
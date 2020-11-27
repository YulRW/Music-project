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

/**
 * 长度(秒)至时间格式转换
 * @param {Array} length 歌曲时间长度(s)
 * 
 * return：返回时间格式
 */
const numberToTime = function (length) {
    let min = parseInt(length / 60);
    let s = length % 60;
    if (s.toString().length == 1) {
        s = "0" + s;
    }
    return `${min}:${s}`;
}




export default {
    changeMusic,
    numberToTime,
}
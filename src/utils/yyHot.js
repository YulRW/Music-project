import store from '../store'

/**
 * 更新vuex中的数据
 * @param {String} key 键
 * @param {String} value 值
 * 
 * return：undefined
 */
const update = function (key, value) {
    store.commit({
        type: "_update",
        data: {
            key,
            value,
        },
    });
}

export default {
    update,
}
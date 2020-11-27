import Vue from 'vue';
import Vuetify from 'vuetify/lib';

// 预定义的 material 色彩
import colors from 'vuetify/lib/util/colors'
//引入vuetify样式
// import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#f90'  //#FA7268
            },
            dark: {
                primary: '#654EA3', //紫
                secondary:'#1e1f23',//灰(页面主背景)
                tertiary:'#17181d',//黑(侧边栏)
                quaternary:'#26272c',//灰-2(页面块背景)
            }
            // 19:#FA7268
            // 18:#654EA3
        },
        dark: false,
    },
});
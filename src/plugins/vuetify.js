import Vue from 'vue';
import Vuetify from 'vuetify/lib';

// 预定义的 material 色彩
import colors from 'vuetify/lib/util/colors'
//引入vuetify样式
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.purple
                
            }
        },
        dark: false,
    },
});
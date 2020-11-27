<template>
    <v-card>
        <v-list>
            <v-list-item link>
                <v-list-item-title>主题颜色</v-list-item-title>

                <v-list-action>
                    <v-menu :close-on-content-click="false" offset-y>
                        <!-- 开启菜单按钮 -->
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on">
                                <v-icon color="primary"
                                    >mdi-heart</v-icon
                                ></v-btn
                            >
                        </template>

                        <!-- 取色器 -->
                        <yy-color-picker
                            @change="changeColor"
                        ></yy-color-picker>
                    </v-menu>
                </v-list-action>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
import yyColorPicker from "@/components/yy-cpns/yy-color-picker";
export default {
    data() {
        return {};
    },
    methods: {
        // 颜色选择器-主题颜色
        changeColor(val) {
            this.$vuetify.theme.themes.dark.primary = val;
        },
    },
    computed: {},
    components: {
        yyColorPicker,
    },
};
</script>

<style>
</style>
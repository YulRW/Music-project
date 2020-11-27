<template>
    <v-card>
        <!-- 
            dot-size：画布点大小
            show-swatches：显示色板
            flat：移除海拔
         -->
        <v-color-picker
            :dot-size="$props.dotSize||20"
            :value="$vuetify.theme.themes.light.primary"
            flat
            show-swatches
            v-bind="$props"
            @input="CPN_change"
        ></v-color-picker>

        <v-card-actions>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props:{
        'dot-size':{

        }
    },
    methods:{
        CPN_change(val){
            this.$emit('change',val.slice(0,7))
        }
    },
    created() {},
    mounted() {
    },
};
</script>

<style scoped>
</style>
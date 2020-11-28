<template>
    <v-card>
        <!-- 顶部操作栏 -->
        <v-toolbar dark color="primary" dense class="rounded-0">
            <v-icon class="mx-4" large>mdi-video-box</v-icon>

            <v-toolbar-title>{{
                '当前MV'
            }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark text @click="$emit('input', false)">返回</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-container>
            <v-row></v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {};
</script>

<style>
</style>
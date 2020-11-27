<template>
    <v-toolbar-title class="mr-12 align-center">
        <template v-if="$store.state.theme === 'default'"
            ><span class="title">智鲨音乐</span></template
        >
        <template v-else-if="$store.state.theme === 'pStation'"
            ><div class="d-inline-block font-weight-black px-1">智鲨</div>

            <div
                class="d-inline-block black--text font-weight-black px-1 py-1 p-title rounded"
                
            >
                音乐
            </div></template
        >
        <template></template>
    </v-toolbar-title>
</template>

<script>
export default {};
</script>

<style scoped>
.p-title{
    background-color: #f90;

}

</style>
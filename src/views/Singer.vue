<template>
    <v-container fluid width="100%">
        <v-row>
            <v-col cols="12">
                <v-subheader class="white--text text-h5"
                    >探索新歌手</v-subheader
                >
                <v-card
                    class="d-inline-block secondary ml-3 mr-8 elevation-0"
                    v-for="item in newSinger"
                    :key="item.name"
                    link
                >
                    <v-container class="py-0">
                        <v-row>
                            <v-img
                                height="180"
                                width="180"
                                :src="item.picSrc"
                                class="rounded-lg d-block"
                            ></v-img>
                        </v-row>
                        <v-row class="pl-1 pt-2">
                            <div class="white--text d-block">
                                {{ item.name }}
                            </div>
                        </v-row>
                        <v-row class="pl-1">
                            <div class="grey--text d-block">
                                {{ item.song }}
                            </div>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="justify-space-between">
            <v-col cols="7"
                ><v-subheader class="white--text text-h5">热门</v-subheader>

                <v-list>
                    <v-list-item
                        v-for="item in popularSinger"
                        :key="item"
                        class="quaternary rounded ml-3 mb-3"
                        dense
                        style="height: 50px"
                        link
                    >
                        <v-list-item-avatar rounded>
                            <v-img :src="item.src"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content class="ml-2">
                            <v-list-item-title>{{ item.NO }}</v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-content class="mr-10" style="flex-grow: 8">
                            <v-list-item-title>{{
                                item.name
                            }}</v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-content class="ml-10 text-right">
                            <v-list-item-title>{{
                                item.length
                            }}</v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action link>
                            <v-list-item-icon class="mx-auto align-center">
                                <v-btn icon>
                                    <v-icon>mdi-dots-horizontal</v-icon>
                                </v-btn>
                            </v-list-item-icon>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-col>
            <v-col cols="5" class="">
                <v-subheader class="white--text text-h5 pl-1">氛围</v-subheader>
                <v-row>
                    <v-col cols="6">
                        <v-card
                            height="197px"
                            class="quaternary justify-center align-center d-flex"
                            link
                        >
                            <h1>古典</h1>
                        </v-card>
                    </v-col>
                    <v-col cols="6">
                        <v-card
                            height="197px"
                            class="quaternary justify-center align-center d-flex"
                            link
                        >
                            <h1>流行</h1>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-card
                            height="197px"
                            class="quaternary justify-center align-center d-flex"
                            link
                        >
                            <h1>西方</h1>
                        </v-card>
                    </v-col>
                    <v-col cols="6">
                        <v-card
                            height="197px"
                            class="quaternary justify-center align-center d-flex"
                            link
                        >
                            <h1>阿萨德</h1>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => {
        return {
            newSinger: [
                {
                    picSrc: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
                    name: "Zak Abel",
                    song: "love song",
                },
                {
                    picSrc: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
                    name: "YulRW",
                    song: "love song",
                },
                {
                    picSrc: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
                    name: "Pjuan",
                    song: "love song",
                },
                {
                    picSrc: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
                    name: "Linlt",
                    song: "love song",
                },
                {
                    picSrc: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
                    name: "KKKKKK",
                    song: "love song",
                },
                {
                    picSrc: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
                    name: "Zak Abel",
                    song: "love song",
                },
                {
                    picSrc: "https://cdn.vuetifyjs.com/images/cards/store.jpg",
                    name: "Zak Abel",
                    song: "love song",
                },
            ],
            popularSinger: [
                {
                    src: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    NO: "1",
                    length: "3:23",
                    name: "Zak Abel",
                },
                {
                    src: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    NO: "2",
                    length: "3:23",
                    name: "Zak Abel",
                },
                {
                    src: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    NO: "3",
                    length: "3:23",
                    name: "Zak Abel",
                },
                {
                    src: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    NO: "4",
                    length: "3:23",
                    name: "Zak Abel",
                },
                {
                    src: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    NO: "5",
                    length: "3:23",
                    name: "Zak Abel",
                },
                {
                    src: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    NO: "6",
                    length: "3:23",
                    name: "Zak Abel",
                },
                {
                    src: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    NO: "7",
                    length: "3:23",
                    name: "Zak Abel",
                },
            ],
        };
    },
};
</script>

<style>
</style>
<template>
    <div>
        <v-card tile>
            <!-- 音乐进度条 -->
            <v-slider
                v-model="curSlider"
                class="music-player-slider"
                dense
                height="3"
                max="1000"
                min="0"
                track-color="primary darken-2"
                thumb-color="primary lighten-1"
                @mousedown="sliderMousedown"
                @end="sliderEnd"
                @mouseup="sliderMouseup"
            >
                <!-- thumb-label -->
                <!-- <template v-slot:thumb-label="{ value }" v-if="!audio">
                    {{
                        musicProgress(value)
                    }}
                </template> -->
            </v-slider>

            <v-list>
                <v-list-item>
                    <!-- 收藏 -->
                    <v-list-item-icon>
                        <v-btn icon>
                            <v-icon color="red">mdi-heart</v-icon>
                        </v-btn>
                    </v-list-item-icon>
                    <!-- 歌名 歌手名 -->
                    <v-list-item-content v-if="playerList.length !== 0">
                        <v-list-item-title>{{
                            playerList[curPlayerIndex].songName
                        }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                            playerList[curPlayerIndex].tsinger.singerName
                        }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-spacer></v-spacer>

                    <v-list-item-icon class="mr-4">
                        <v-btn icon>
                            <v-icon>mdi-volume-high</v-icon>
                        </v-btn>
                    </v-list-item-icon>

                    <v-list-item-icon class="mr-4">
                        <v-btn icon>
                            <v-icon>mdi-format-list-bulleted</v-icon>
                        </v-btn>
                    </v-list-item-icon>

                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-list-item-icon
                                class="mr-16"
                                v-bind="attrs"
                                v-on="on"
                                @click="handlePlayerModeChange"
                            >
                                <v-btn icon>
                                    <v-icon>{{
                                        playerModeData[playerMode].icon
                                    }}</v-icon>
                                </v-btn>
                            </v-list-item-icon>
                        </template>
                        <span
                            >当前播放状态：{{
                                playerModeData[playerMode].type
                            }}</span
                        >
                    </v-tooltip>

                    <!-- 上一首 -->
                    <v-list-item-icon>
                        <v-btn icon>
                            <v-icon>mdi-rewind</v-icon>
                        </v-btn>
                    </v-list-item-icon>

                    <!-- 播放 -->
                    <v-list-item-icon
                        class="mx-5"
                        @click="pause"
                        v-if="!paused"
                    >
                        <v-btn icon>
                            <v-icon large>mdi-pause</v-icon>
                        </v-btn>
                    </v-list-item-icon>

                    <!-- 暂停 -->
                    <v-list-item-icon class="mx-5" @click="play" v-else>
                        <v-btn icon>
                            <v-icon large>mdi-play</v-icon>
                        </v-btn>
                    </v-list-item-icon>

                    <!-- 下一首 -->
                    <v-list-item-icon class="ml-0 mr-3">
                        <v-btn icon>
                            <v-icon>mdi-fast-forward</v-icon>
                        </v-btn>
                    </v-list-item-icon>
                </v-list-item>
            </v-list>
        </v-card>

        <!-- 原生音频标签 -->
        <audio id="Audio"></audio>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            // 音频对象
            audio: null,

            // 默认歌曲
            defaultMusicSrc: {
                musicUrl:
                    "/来たれわが街へ～夢見るわが街～酒場のポルカ～来たれわが街へ.mp3",
                songImg:
                    "http://47.115.72.55:8888/group1/M00/00/00/rBePbV-j9K2AXKgIAAbSNc7Kb1g207.jpg",
                songName:
                    "来たれわが街へ～夢見るわが街～酒場のポルカ～来たれわが街へ",
                tsinger: {
                    singerName: "椙山浩一",
                },
            },

            // 是否暂停
            paused: true,

            // 当前进度条进度
            curSlider: 0,

            // 是否是音乐进度条同步状态
            syncStatus: true,

            // 进度条定时器
            progressTimer: null,

            // 当前播放模式（单曲循环-0、列表循环-1、列表随机-2）
            playerMode: 0,

            // 播放模式数据
            playerModeData: [
                {
                    icon: "mdi-sync",
                    type: "单曲循环",
                },
                {
                    icon: "mdi-playlist-play",
                    type: "列表循环",
                },
                {
                    icon: "mdi-shuffle",
                    type: "列表随机",
                },
            ],

            // 当前播放歌曲
            curPlayerIndex: 0,

            // 歌曲播放列表
            playerList:[]
        };
    },
    props:{
        songList:{
            type:Array
        }
    },
    methods: {
        // 播放
        play() {
            this.paused = false;
            this.audio.play();
            this.syncStatus = true;
            this.syncProgress();
        },
        // 暂停
        pause() {
            this.paused = true;
            this.syncStatus = false;
            this.audio.pause();
        },
        // 进步条同步
        syncProgress() {
            if (!this.syncStatus) {
                clearTimeout(this.progressTimer);
                return;
            }
            let tTime = this.audio.duration;
            let cTime = this.audio.currentTime;

            this.curSlider = parseInt(1000 * (cTime / tTime));

            this.progressTimer = setTimeout(this.syncProgress, 100);
        },
        // 鼠标按下（在滑动块）
        sliderMousedown() {
            this.syncStatus = false;
        },
        sliderEnd(e) {
            this.syncStatus = true;
            this.curSlider = e;
            let tTime = this.audio.duration;
            this.audio.currentTime = parseInt((e * tTime) / 1000);
            this.play();
        },
        sliderMouseup() {
            setTimeout(() => {
                this.syncStatus = true;
                let tTime = this.audio.duration;
                this.audio.currentTime = parseInt(
                    (this.curSlider * tTime) / 1000
                );
                this.play();
            }, 0);
        },
        // numberToTime(length) {
        //     let min = parseInt(length / 60);
        //     let s = length % 60;
        //     if (s.length === 1) {
        //         s = "0" + s;
        //     }
        //     return `${min}:${s}`;
        // },
        // 歌曲播放模式切换
        handlePlayerModeChange() {
            this.playerMode++;
            if (this.playerMode > this.playerModeData.length - 1) {
                this.playerMode = 0;
            }
        },
    },
    computed: {
        // musicProgress(val) {
        //     return `${this.numberToTime(
        //         parseInt(val / 10)
        //     )} / ${this.numberToTime(this.audio.duration)}`;
        // },
    },
    created() {
        this.$nextTick(() => {
            /**
             * 音频初始化
             */

            // 获取音频对象并写入data
            let audio = document.getElementById("Audio");
            this.audio = audio;

            // 默认播放歌曲
            this.playerList.push(this.defaultMusicSrc);
            audio.src = this.playerList[0].musicUrl;

            /**
             * 挂载监听
             */
            this.audio.durationchange = (e) => {
                console.log("时常", e);
            };

            this.audio.onended = (e) => {
                switch (this.playerMode) {
                    // 单曲循环
                    case 0:
                        audio.src = this.playerList[
                            this.curPlayerIndex
                        ].musicUrl;
                        this.play()
                        break;
                    // 列表循环
                    case 1:
                        this.curPlayerIndex++;
                        if (this.curPlayerIndex > this.playerList.length - 1) {
                            this.curPlayerIndex = 0;
                        }
                        audio.src = this.playerList[
                            this.curPlayerIndex
                        ].musicUrl;
                        this.play()
                        break;
                    // 列表随机
                    case 2:
                        this.curPlayerIndex++;
                        if (this.curPlayerIndex > this.playerList.length - 1) {
                            this.curPlayerIndex = 0;
                        }
                        audio.src = this.playerList[
                            this.curPlayerIndex
                        ].musicUrl;
                        this.play()
                        break;
                    default:
                        break;
                }
            };
        });
    },
    watch:{
        songList(newVal,oldVal){
            console.log(newVal,'333');
            this.playerList = newVal
            this.audio.src = this.playerList[0].musicUrl
            this.curPlayerIndex = 0
            this.play()
        }
    }
};
</script>

<style>
</style>
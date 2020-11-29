<template>
    <div class="yy-music-player">
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
                    <v-list-item-content
                        @click="
                            $yyHot.update(['status', 'currentMusicOpen'], true)
                        "
                        v-if="playerList.length !== 0"
                    >
                        <v-list-item-title>{{
                            playerList[curPlayerIndex].songName
                        }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                            playerList[curPlayerIndex].tsinger.singerName
                        }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-spacer></v-spacer>

                    <!-- 
                        扩展功能
                     -->
                    <!-- 播放MV -->
                    <v-alert
                        text
                        type="warning"
                        v-if="tipNoneMV"
                    >当前歌曲没有MV</v-alert>
                    <v-list-item-icon class="mx-5" @click="playMV">
                        <v-btn icon>
                            MV
                        </v-btn>
                    </v-list-item-icon>         

                    <!-- 音量 -->
                    <v-menu offset-y top open-on-hover>
                        <template v-slot:activator="{ on, attrs }">
                            <v-list-item-icon
                                class="mr-4"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-btn icon @click="handleVolumeType">
                                    <template v-if="isVolumeOn">
                                        <v-icon>{{ volumeIcon }}</v-icon>
                                    </template>

                                    <v-icon v-else>mdi-volume-off</v-icon>
                                </v-btn>
                            </v-list-item-icon>
                        </template>
                        <v-slider
                            v-model="volume"
                            @input="handleVolume"
                            vertical
                            class="my-4 volume-slider-class"
                        ></v-slider>
                    </v-menu>

                    <!-- 展现歌单 -->

                    <v-menu offset-y top :close-on-content-click="false">
                        <template v-slot:activator="{ on, attrs }">
                            <v-list-item-icon
                                class="mr-4"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-btn icon>
                                    <v-icon>mdi-format-list-bulleted</v-icon>
                                </v-btn>
                            </v-list-item-icon>
                        </template>
                        <v-card min-width="344" max-width="344">
                            <v-list dense>
                                <v-list-item
                                    dense
                                    two-line
                                    v-for="(item, index) in playerList"
                                    :key="index"
                                    link
                                    @click="changeList(index)"
                                >
                                    <!-- icon -->
                                    <v-list-item-action>
                                        <v-btn icon>
                                            <v-icon
                                                v-if="
                                                    !(curPlayerIndex === index)
                                                "
                                            >
                                                mdi-play-outline
                                            </v-icon>

                                            <v-icon v-else
                                                >mdi-play-circle-outline</v-icon
                                            >
                                        </v-btn>
                                    </v-list-item-action>

                                    <!-- 内容 -->
                                    <v-list-item-content>
                                        <v-list-item-title>{{
                                            item.songName
                                        }}</v-list-item-title>
                                        <v-list-item-subtitle>{{
                                            item.tsinger.singerName
                                        }}</v-list-item-subtitle>
                                    </v-list-item-content>

                                    <v-list-item-action>
                                        <v-btn icon>
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                    </v-list-item-action>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-menu>

                    <!-- 歌曲模式 -->
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
                    <v-list-item-icon @click="pre()">
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
                    <v-list-item-icon class="ml-0 mr-3" @click="next()">
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
            publicPath: process.env.BASE_URL,
            // 音频对象
            audio: null,

            // 默认歌曲
            defaultMusicSrc: {
                musicUrl: `${process.env.BASE_URL}来たれわが街へ～夢見るわが街～酒場のポルカ～来たれわが街へ.mp3`,
                songImg:
                    "http://47.115.72.55:8888/group1/M00/00/00/rBePbV-j9K2AXKgIAAbSNc7Kb1g207.jpg",
                songName:
                    "来たれわが街へ～夢見るわが街～酒場のポルカ～来たれわが街へ",
                tsinger: {
                    singerName: "椙山浩一",
                },
            },

            //音量
            volume: 50,

            // 音量开关
            isVolumeOn: true,

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
            playerList: [],

            //是否有MV可以播放
            tipNoneMV: false,
        };
    },
    props: {
        songList: {
            type: Array,
        },
    },
    methods: {
        //播放录音
        playMV() {
            // if(!this.playerList.length ) {
            //     this.$yyHot.update('currentSinger',this.defaultMusicSrc)
            // } else {
            //     this.$yyHot.update('currentSinger',this.defaultMusicSrc)
            // }
            this.tipNoneMV = false
            if(this.playerList.length && this.playerList[this.curPlayerIndex].mvUrl) {
                this.$yyHot.update(['status','currentMV'],true)

                //暂停播放
                this.pause() 
            }else {
                this.tipNoneMV = true
                setTimeout(()=>{
                this.tipNoneMV = false
                },1000)
            }
        },
        // 播放
        play() {
            if(this.$store.state.curPlayerMV) {
                console.log(this.$store.state.curPlayerMV);
                this.$store.state.curPlayerMV.pause()
            }
            this.paused = false;
            this.audio.play();
            this.syncStatus = true;
            this.$store.state.isPlay = true;
            this.syncProgress();
        },
        // 暂停
        pause() {
            this.paused = true;
            this.syncStatus = false;
            this.$store.state.isPlay = false;
            this.audio.pause();
        },
        // 上一首
        pre() {
            if (this.curPlayerIndex - 1 < 0) {
                this.curPlayerIndex = this.playerList.length - 1;
            } else {
                this.curPlayerIndex--;
            }
        },
        // 下一首
        next() {
            if (this.curPlayerIndex + 1 > this.playerList.length - 1) {
                this.curPlayerIndex = 0;
            } else {
                this.curPlayerIndex++;
            }
        },
        // 进步条同步
        syncProgress() {
            // console.log('定时器');
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
        // 歌曲播放模式切换
        handlePlayerModeChange() {
            this.playerMode++;
            if (this.playerMode > this.playerModeData.length - 1) {
                this.playerMode = 0;
            }
        },
        // 同步音量
        handleVolume() {
            this.audio.volume = this.volume / 100;
        },
        // 音量模式
        handleVolumeType() {
            this.isVolumeOn = !this.isVolumeOn;
            if (this.isVolumeOn) {
                this.handleVolume();
            } else {
                this.audio.volume = 0;
            }
        },
        changeList(index) {
            if (this.curPlayerIndex === index) {
                return;
            }
            this.curPlayerIndex = index;
            this.pause();
            this.audio.src = this.playerList[index].musicUrl;
            clearTimeout(this.progressTimer);
            this.play();
        },
    },
    computed: {
        // musicProgress(val) {
        //     return `${this.numberToTime(
        //         parseInt(val / 10)
        //     )} / ${this.numberToTime(this.audio.duration)}`;
        // }
        /**
         * 音量icon选择
         */
        volumeIcon() {
            switch (true) {
                case this.volume < 33:
                    return "mdi-volume-low";
                case !!(this.volume >= 33 && this.volume < 66):
                    return "mdi-volume-medium";
                case this.volume >= 66:
                    return "mdi-volume-high";
            }
        },
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
            clearTimeout(this.progressTimer);

            // 初始化音量
            this.volume = this.audio.volume * 100;

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
                        clearTimeout(this.progressTimer);
                        this.play();
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
                        clearTimeout(this.progressTimer);
                        this.play();
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
                        clearTimeout(this.progressTimer);
                        this.play();
                        break;
                    default:
                        break;
                }
            };
        });
    },
    watch: {
        songList(newVal, oldVal) {
            this.playerList = newVal;
            this.audio.src = this.playerList[0].musicUrl;
            clearTimeout(this.progressTimer);
            this.curPlayerIndex = 0;
            // this.$store.state.currentMusic = this.playerList[
            //     this.curPlayerIndex
            // ];
            this.$yyHot.update("currentMusic",this.playerList[this.curPlayerIndex])

            this.play();
        },
        curPlayerIndex(newVal, oldVal) {
            if (this.playerList.length === 1) {
                this.$yyHot.update("showSnackbar", {
                    type: "info",
                    text: "目前该播放列表只有一首歌曲",
                });
                newVal = 0;
            }

            this.pause();
            this.audio.src = this.playerList[newVal].musicUrl;
            clearTimeout(this.progressTimer);
            this.play();
            // this.$store.state.currentMusic = this.playerList[newVal];
            this.$yyHot.update("currentMusic",this.playerList[newVal])

        },
        "$store.state.curPlayerIndex": function (newVal, oldVal) {
            this.changeList(newVal);
        },
    },
};
</script>

<style>
.volume-slider-class .v-input__slot .v-slider--vertical {
    min-height: 80px;
}

.music-player-slider .v-messages {
    min-height: 0px;
}
</style>

<style scoped>
</style>
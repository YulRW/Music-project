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
                <v-btn dark text @click="handleReturn">返回</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-container>
            <v-row>
                <!-- mv -->
                <div class="video-mv-box">
                    <video-player  class="video-player vjs-custom-skin"
                        ref="videoPlayer" 
                        :playsinline="true" 
                        :options="playerOptions"
                    ></video-player>                    
                </div>

            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            playerOptions : {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: "video/mp4",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                    src: this.$store.state.currentMusic.mvUrl //url地址
                }],
                poster: this.$store.state.currentMusic.songImg, //你的封面地址
                // width: document.documentElement.clientWidth, //播放器宽度
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true  //全屏按钮
                }
            }   
        }
    },
    methods: {
        handleReturn() {

            this.handlePauseMV()
            this.$emit('input', false)
        },
        handlePauseMV() {
            this.playerMV.pause()
        }
    },
    computed: {
        playerMV() {
            console.log('this.$ref.videoPlayer.player',this.$refs.videoPlayer.player);
            this.$yyHot.update('curPlayerMV',this.$refs.videoPlayer.player)
            return this.$refs.videoPlayer.player
        },
        currentMusic() {
            return this.$store.state.currentMusic
        }
    },
    watch: {
        currentMusic(oldV,newV) {
            console.log(this.playerMV);
            this.playerOptions['sources'][0]['src'] = newV.mvUrl
            this.playerOptions.poster = newV.songImg
        }
    },
};
</script>

<style>
    .video-mv-box {
        width: 600px;
        height: 500px;
        margin: 20vh auto;
    }
  .video-js .vjs-icon-placeholder {
    width: 80%;
    height: 80%;
    display: block;
  }
</style>
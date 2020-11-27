<template>
    <div class="music-box mt-4 ml-5" :class="isPlay ? 'mplaying' : ''">
        <img :src="$store.state.currentMusic.songImg" />
        <div class="mask">
            <!-- 暂停、播放按钮 -->
            <v-btn class="mplayer primary" icon>
                <v-icon>mdi-music</v-icon>
            </v-btn>
            <div class="m-circle m-progress">
                <svg width="326" height="326" viewBox="0,0,326,326">
                    <circle
                        cx="163"
                        cy="163"
                        r="159"
                        stroke-width="4"
                        stroke="rgba(101, 78, 163, 0.6)"
                        fill="rgba(0,0,0,.2)"
                    ></circle>
                    <circle
                        class="a"
                        cx="163"
                        cy="163"
                        r="159"
                        stroke-width="3"
                        fill="none"
                        stroke="rgba(101, 78, 163, 1)"
                        stroke-dasharray="0 999"
                        transform="matrix(0,-1,1,0,0,326)"
                    ></circle>
                </svg>
            </div>
            <!-- <div class="m_time">
                <span class="mplayer_curtime primary--text">00:00</span>
                <span class="m-join">/</span>
                <span class="mplayer_durtime primary--text">00:00</span>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        isPlay: {
            type: Boolean,
            default: false,
        },
    },
    methods: {},
    computed: {},
};
</script>

<style scoped>
.music-box {
    width: 500px;
    height: 500px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    display: block;
}

.music-box img {
    width: 100%;
    border-radius: 50%;
    transition: all 0.36s ease;
    display: inline;
    animation: spin 46s infinite linear;
    animation-play-state: paused;
}

.music-box .mask {
    width: 316px;
    height: 316px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
}

.mplayer {
    position: absolute;
    width: 60px;
    height: 60px;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 2;
    cursor: pointer;
}

.fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transform: translate(0, 0);
    line-height: 10px;
}

.loadingSvg circle {
    r: 14;
    stroke: rgba(0, 0, 0, 0.7);
    stroke-dasharray: 87;
    stroke-dashoffset: 87;
    cx: 25;
    cy: 25;
    stroke-width: 2;
    fill: none;
}

.m-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 326px;
    height: 326px;
}

.m_time span {
    display: block;
    text-align: center;
}

.m_time .mplayer_curtime {
    padding-top: 42px;
    font-size: 34px;
    color: #e1be78;
}

.m_time .m-join {
    display: none;
}

.mplaying img {
    animation-play-state: running;
}

img {
    animation: spin 46s infinite linear;
    animation-play-state: paused;
}

.mplaying .loadingSvg circle {
    transition: 2s;
    stroke-dasharray: 87;
    stroke-dashoffset: 87;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes svgLoading {
    0% {
        stroke-dashoffset: 2;
    }

    100% {
        stroke-dashoffset: -39;
    }
}
</style>
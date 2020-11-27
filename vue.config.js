// const { resolve } = require("core-js/fn/promise");
// const { config } = require("vue/types/umd");

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: './',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '智鲨音乐'
        return args
      })
  },
}
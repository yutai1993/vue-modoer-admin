const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // runtimeCompiler: true, /* 运行时构建 */
  css: {
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: '@import "@/assets/css/index.scss";'
      }
    }
  },
  chainWebpack: config => {
    // GraphQL Loader
    config.module
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/svg')) // 在原有的svg规则上排除 这个目录
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'https://api-hmugo-web.itheima.net', // 当有/ajax 开头的请求路径 就会转发到 target
    //     //   ws: true, //WebSocket 使用
    //     changeOrigin: true,
    //     // pathRewrite: {
    //     //   '^/api': ''
    //     // }
    //   },
    //   '/foo': {
    //     target: '<other_url>'
    //   }
    // }
  }

}

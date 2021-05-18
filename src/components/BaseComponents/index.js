import Vue from 'vue'
import BaseIconSvg from './BaseIcon-svg'
/* 注册全局组件 */
Vue.component('BaseIconSvg', BaseIconSvg)

/* 自动导入所有 svg文件 */
const req = require.context('@/assets/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

/*
  使用本组件 首先下载
  $ npm install svg-sprite-loader --save

 vue.config.js 配置

  chainWebpack: config => {
    // GraphQL Loader
    config.module
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/svg'))
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

* */

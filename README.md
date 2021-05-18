# vue2-modoer-admin-components

### vue version
```
vue版本: vue2
```



### Echarts 组件

```
组件数据做了拆分 然后聚合 方便操作 方便阅读理解 只做了折线图的 

    <echart class="modoer-echarts" :Echarts="Echarts | filterEchart(EchratIndex)" v-model="EchratIndex"></echart>

```

**传入的数据格式示例**

```
 Echarts: [
          {
            title:'近一周注册量', // title
            xAxis: {
              type: 'weeks', // x轴
              interval: 0  // 间隔
            },
            series: [
              {
                name: '注册', // 图形名字 在提示框显示的名字
                type: 'line', // 图形类型
                arrValue: [20, 66, 40, 5, 40, 66, 20],
                //  fillColor: 'rgba(23,38,243,0.5)', // 填充色 不传不填充
                pointColor: 'rgba(23,38,243)', // 点颜色
                lineColor: '#253A5D' // 线颜色
              }
            ]
          },
        ],
        EchratIndex: 0  // 这里控制点击切换
```



### svg组件

```
  使用本组件 首先下载
  $ npm install svg-sprite-loader --save
  
 vue.config.js 配置

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
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
```

**使用**

```
<BaseIconSvg icon-class="kehu"></BaseIconSvg>
传入文件的名字
```

#### svgo 去除svg文件的无用信息

```
$ npm install svgo@1.2.0

配置执行命令
    "svgo": "svgo -f src/assets/svg --config=src/components/BaseComponents/svgo.yml",

svgo.yml 为配置文件
```


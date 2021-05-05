<template>
  <div id="main" style="width: 100%; height: 600px">

  </div>
</template>

<script>

  export default {
    name: 'Home',
    components: {},
    data() {
      return {
        myChart: null,
        seriesData: [820, 932, 901, 934, 1290, 1330, 1320, 1786]
      }
    },

    watch: {
      /* 监听数组变化 进行重绘 */
      seriesData(){
        this.setOptions()
      }
    },

    mounted() {

      // 监听页面变化 重置图表尺寸
      addEventListener('resize', this.resizeInnerWidth)
      // 接下来的使用就跟之前一样，初始化图表，设置配置项
      this.myChart = this.$Echarts.init(document.getElementById('main'));
      this.setOptions()
    },

    methods: {
      setOptions(){
        this.myChart.setOption({
          title: {
            show: true,
            text: '一周访问量',
            left: 'center'
          },
          grid: {left: '7%', top: '7%', right: '3%', bottom: '7%'},
          xAxis: {
            type: 'category',
            splitLine: {
              show: true
            },
            data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
            splitArea:{
              show: true,
              areaStyle: {
                color: ['rgba(250,250,250,0.3)','rgba(233,238,243,0.3)']
              }
            }
          },
          yAxis: {
            type: 'value',
            splitArea:{
              show: true,
              areaStyle: {
                color: ['rgba(250,250,250,0.3)','rgba(233,238,243,0.3)']
              }
            }
          },
          tooltip: {
            show: true,
            trigger: 'axis', // 提示框触发方式
            axisPointer:{
              label:{
                show: true
              },
            },
            backgroundColor: 'rgba(50,50,50,0.7)', // 提示框背景
            borderColor: '#ccc', // 提示窗边框颜色
            textStyle: { // 提示窗文字颜色
              color: '#fff'
            },
            formatter: '浏览人数: {c0}人' // 提示框内容模板
          },
          series: [{ // 折线图
            data: this.seriesData,
            type: 'line',
            smooth: true
          }]
        })
      },
      resizeInnerWidth(){
        this.myChart.resize()
      }
    },

    beforeDestroy() {
      /* 组件销毁之前 卸载监听事件 */
      removeEventListener('resize', this.this.resizeInnerWidth)
    }

  }
</script>

<style lang="scss">

</style>

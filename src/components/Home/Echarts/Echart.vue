<template>
  <div id="main"
       :style="{ width: '100%', height: '600px', backgroundColor: 'rgb(255, 255, 255,.5)','box-shadow': '4px 4px 40px rgba(0,0,0,.05)'}"></div>
</template>

<script>
  import echartsTitle from './Echarts-title'
  import echartsGrid from './Echarts-grid'
  import echartsXAxis from "./Echarts-xAxis";
  import echartsYAxis from './Echarts-yAxis'
  import eachartsToolTip from "./Echarts-tooltip";
  import echartsSeries from './Echarts-series'

  export default {
    name: "Echart",
    props: {
      Echarts: {
        type: Object,
        default: () => {}
      },
      value: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        myChart: null,
        timeId: null
      }
    },

    watch: {
      value(data){
        this.myChart.clear()
        this.filterInterval()
        this.initCharts();
      }
    },

    mounted() {

      // 监听页面变化 重置图表尺寸
      addEventListener('resize', this.resizeInnerWidth)
      // 接下来的使用就跟之前一样，初始化图表，设置配置项
      this.myChart = this.$Echarts.init(document.getElementById('main'));
      this.filterInterval()
      this.initCharts();
      this.$nextTick(() => {
        this.myChart.resize()
      })
    },


    methods: {
      // 配置项
      initCharts() {
        this.myChart.setOption({
          title: echartsTitle(this.Echarts.title),
          /* 边框 */
          grid: echartsGrid(),
          /* x轴 weeks星期  date时间  0 显示所有标签*/
          xAxis: echartsXAxis(this.Echarts.xAxis.type, this.Echarts.xAxis.interval),
          /* y 轴*/
          yAxis: echartsYAxis(),
          /* 提示框 */
          tooltip: eachartsToolTip(),
          /* 系列图 折线图等 配置 */
          series: echartsSeries(this.Echarts.series)
        })
      },

      /* 自动调整 */
      resizeInnerWidth() {
        this.filterInterval()
        this.timeId = setTimeout(()=>{
          this.myChart.resize()
          clearTimeout(this.timeId)
        },200)

      },
      /* 获取body的宽度 number */
      getInnerWidth() {
        const {body} = document;
        let rect = body.getBoundingClientRect();
        return Math.floor(rect.width)
      },

      filterInterval(){
        if (this.getInnerWidth() <= 750 && this.Echarts.xAxis.type === 'date') {
          this.Echarts.xAxis.interval = 6
        }
      }


    },

    beforeDestroy() {
      /* 组件销毁之前 卸载监听事件 */
      removeEventListener('resize', this.resizeInnerWidth)
    }
  }
</script>

<style>

</style>

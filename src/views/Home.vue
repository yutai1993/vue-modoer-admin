<template>
  <div>
    <el-row :gutter="10">
      <el-col :md="6" :sm="12" :xs="12"><div class="svg-icon-item" @click="toggleEchartsHandle(0)">
        <BaseIconSvg icon-class="kehu"></BaseIconSvg>
        <div class="svg-icon-item-loginUp">
          <p>注册量</p><p>1468</p>
        </div>
      </div></el-col>
      <el-col :md="6" :sm="12" :xs="12"><div class="svg-icon-item" @click="toggleEchartsHandle(1)">
        <BaseIconSvg icon-class="kehu"></BaseIconSvg>
        <div class="svg-icon-item-loginUp">
          <p>点评量</p><p>1468</p>
        </div>
      </div></el-col>
      <el-col :md="6" :sm="12" :xs="12"><div class="svg-icon-item" @click="toggleEchartsHandle(2)">
        <BaseIconSvg icon-class="kehu"></BaseIconSvg>
        <div class="svg-icon-item-loginUp">
          <p>新增主题</p><p>1468</p>
        </div>
      </div></el-col>
      <el-col :md="6" :sm="12" :xs="12"><div class="svg-icon-item" @click="toggleEchartsHandle(3)">
        <BaseIconSvg icon-class="fangwen"></BaseIconSvg>
        <div class="svg-icon-item-loginUp">
          <p>浏览量</p><p>3568</p>
        </div>
      </div></el-col>
    </el-row>
    <echart class="modoer-echarts" :Echarts="Echarts | filterEchart(EchratIndex)" v-model="EchratIndex"></echart>
  </div>
</template>

<script>
import Echart from '../components/Home/Echarts/Echart'
export default {
  name: 'Home',
  components: { Echart },
  data () {
    return {
      Echarts: [
        {
          title: '近一周注册量', // title
          xAxis: {
            type: 'weeks', // x轴
            interval: 0 // 间隔
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
        {
          title: '近一周点评量',
          xAxis: {
            type: 'weeks',
            interval: 0
          },
          series: [
            {
              name: '点评',
              type: 'line',
              arrValue: [20, 96, 40, 9, 30, 66, 20],
              //  fillColor: 'rgba(23,38,243,0.5)',
              pointColor: 'rgba(123,38,243)',
              lineColor: '#253A5D'
            }
          ]
        },
        {
          title: '近一周新增主题',
          xAxis: {
            type: 'weeks',
            interval: 0
          },
          series: [
            {
              name: '主题',
              type: 'line',
              arrValue: [380, 606, 400, 58, 42, 60, 27],
              //  fillColor: 'rgba(23,38,243,0.5)',
              pointColor: 'rgba(223,378,23)',
              lineColor: '#253A5D'
            }
          ]
        },
        {
          title: '今日浏览量',
          xAxis: {
            type: 'date',
            interval: 2
          },
          series: [
            {
              name: 'pv',
              type: 'line',
              arrValue: [20, 32, 90, 700, 1609, 37, 132, 136, 132, 136,
                20, 32, 90, 100, 1809, 37, 132, 136, 132, 136, 20, 32,
                908, 100, 1609, 37, 152, 1936, 132, 136, 20, 320, 90, 100, 1609, 37],
              fillColor: 'rgba(233,38,243,0.5)',
              pointColor: 'rgba(233,38,243)',
              lineColor: '#253A5D'
            },
            {
              name: 'uv',
              type: 'line',
              arrValue: [79, 3, 90, 10, 109, 37, 12, 36, 320, 363, 200, 322, 190, 100, 109, 370, 13, 1306, 132, 136, 20, 32, 90, 100, 109, 37, 332, 136, 532, 136, 560, 32, 210, 100, 109, 37],
              fillColor: 'rgba(23,38,243,0.5)',
              pointColor: 'rgba(23,38,243)',
              lineColor: '#253A5D'
            }
          ]
        }
      ],
      EchratIndex: 0
    }
  },

  methods: {

    toggleEchartsHandle (index) {
      this.EchratIndex = index
    }

  },

  filters: {

    filterEchart (ArrData, EchratIndex) {
      return ArrData[EchratIndex]
    }
  }

}
</script>

<style lang="scss">
  .svg-icon-item{
    min-height: 80px;
    margin-bottom: 10px;
    background-color: white;
  }

  .svg-icon-item{
    display: flex;
    cursor: pointer;
    background-color: #fafafa;
    box-shadow: 4px 4px 40px rgba(0,0,0,.05);
    justify-content: space-between;

    .svg-icon{
      padding: 10px;
      color: #40c9c6;
      font-size: 80px;
    }

    .svg-icon-item-loginUp{
      width: 80px;
      font-size: 18px;
      font-weight: 600;
      display: flex;
      color: #999;
      flex-direction: column;
      justify-content: center;

      p:nth-child(2){
        font-weight: 600;
        font-size: 25px;
        color: #666;
      }
    }
  }
  .svg-icon-item:hover .svg-icon{
    background-color: #40c9c6;
    color: #fff;
  }

  .svg-icon-item:nth-child(2){
    .svg-icon{
      color: #34bfa3;
    }
  }
  .svg-icon-item:nth-child(2):hover .svg-icon{
    background-color: #34bfa3;
    color: #fff;
  }

  .modoer-echarts{
    overflow: hidden;
  }
</style>

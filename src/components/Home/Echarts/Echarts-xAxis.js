
const XAxis = {
  type: 'category',
  splitLine: {
    show: true
  },
  data: '',
  axisLabel: { // 间隔显示标签
    interval: ''
  },
  splitArea: { // 分割线
    show: true,
    areaStyle: {
      color: ['rgba(250,250,250,0.3)', 'rgba(233,238,243,0.3)'],
      opacity: 0.5
    }
  },
  axisTick: { // 刻度
    show: true,
    alignWithLabel: true // 对齐
  },
  boundaryGap: false // 线条不留白
}

/**
 *  传入 需要显示的文字类型(date时间、weeks星期) 与间隔
 * @param type
 * @param interval
 * @returns {{axisLabel: {interval: string}, data: string, splitArea: {areaStyle: {color: [string, string], opacity: number}, show: boolean}, splitLine: {show: boolean}, axisTick: {show: boolean, alignWithLabel: boolean}, type: string, boundaryGap: boolean}}
 */
export default function echartsXAxis (type, interval) {
  if (type === 'weeks') {
    XAxis.data = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
  } else if (type === 'date') {
    XAxis.data = ['6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '900', '9:30',
      '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
      '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30']
  }
  /* X 轴标签间隔 */
  XAxis.axisLabel.interval = parseInt(interval)
  return XAxis
}

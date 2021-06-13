const YAxis = {
  type: 'value',
  // 分割线
  splitArea: {
    show: true,
    areaStyle: {
      color: ['rgba(250,250,250,0.3)', 'rgba(233,238,243,0.3)'],
      opacity: 0.5
    }
  }
}

export default function echartsYAxis () {
  return YAxis
}

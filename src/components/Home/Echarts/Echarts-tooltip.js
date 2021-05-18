let tooltip = {
  show: true,
  trigger: 'axis', // 提示框触发方式  虚线
  axisPointer:{ // 坐标轴指示器配置项。
    label:{
      show: true
    },
  },
  backgroundColor: 'rgba(50,50,50,0.7)', // 提示框背景
  borderColor: '#ccc', // 提示窗边框颜色
  textStyle: { // 提示窗文字颜色
    color: '#fff'
  },
  //formatter: '注册人数: {c0}人' // 提示框内容模板
};


export default function eachartsToolTip() {
  return tooltip
}

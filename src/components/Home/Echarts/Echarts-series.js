
/*
传入的数据示例
let ogj = [{
  name: 'k',   提示框需要的名字
  type: 'line',  哪种图形 折线图 饼图等
  arrValue: '',    点数据
  pointColor: '',  点的颜色
  lineColor: '',  线的颜色
  fillColor: ''  填充的颜色
}]
 */

/**
 *  系列图必须是数组 所需字段   name: 'k',  type: 'line',  arrValue: '',  pointColor: '', lineColor: '',  fillColor: ''
 * @param seriesArr
 * @returns {[]}
 */
export default function echartsSeries(seriesArr = []) {
  let arrSeries = [];
  seriesArr.forEach((item, index) => {
    let seriesObj = { // 折线图
      name: '',
      data: '',
      type: '',
      smooth: true,
      itemStyle: {
       color: '', //改变折线点的颜色
      },
      lineStyle: {
        color: '' //改变折线颜色
      }
    };
    seriesObj.name = item.name,
    seriesObj.type = item.type,
    seriesObj.data = item.arrValue
    if (item.fillColor){
      seriesObj.areaStyle = {}
      seriesObj.areaStyle.color = item.fillColor
    }
    seriesObj.itemStyle.color = item.pointColor
    seriesObj.lineStyle.color = item.lineColor

    arrSeries.push(seriesObj)

  });
  return arrSeries
}

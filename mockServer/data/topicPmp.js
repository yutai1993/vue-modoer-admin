const Mock = require('mockjs')

const Random = Mock.Random

let data = Mock.mock({
  "topicList|60-200": [
    {
      id: '@id()', // 主题id
      c_pv: '@natural(0, 888)', // 浏览量
      c_degree:'@natural(1, 5)', // 推荐度
      c_reviewNumber: '@natural(0, 66)', // 点评数量
      c_imgNumber: '@natural(1, 8)', // 图片数量
      c_msgNumber: '@natural(0, 99)', // 留言数量
      c_date: '@date()', // 创建时间
      c_topicCategory: '@cword(3,5)', // 主题分类
      c_dataStatus: '@natural(0, 1)', // 数据状态
      c_cover: () => Random.image('80x60', '#FF6600'), // 封面链接
      c_grade: '', // 主题等级
      c_topicStyle: '', // 主题风格
      c_topicAdmin: 'admin', // 管理员
      c_category: '@cword(3)', // 分类
      c_topicName: '@cword(3,5)', // 名称
      c_subclass: '@cword(3,5)', // 子名称
      c_map: '116.40400，39.91500', // 地图坐标
      c_regional: '@province()', // 地区
      c_city: '@city()', // 城市
      c_synopsis: '@csentence()', // 简介
      c_site: '@county(true)', // 地址
      c_business: '@natural(0, 1)', // 营业状态
      c_contact: '17600000000', // 联系电话
      c_letter: '@cparagraph(10, 99)',  // 富文本
    }
  ]
})


module.exports = data.topicList

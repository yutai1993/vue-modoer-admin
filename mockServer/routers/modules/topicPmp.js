const express = require('express')
const router = express.Router()

let topicList = require('../../data/topicPmp')


// 获取主题
router.get('/api/topicList', (req, res) => {
  let body = req.query
  let pagenum = parseInt(body.pagenum) || 1 // 当前页码
  let pagesize = parseInt(body.pagesize) || 20 // 每页条数

  let skip = (pagenum - 1) * pagesize // 跳过的条数
  let limit = skip + pagesize // 获取的条数
  let total = topicList.length // 总条数
  let total_pages = Math.ceil(total / pagesize) // 最大页码

  let newTopicList = topicList.slice(skip, limit)

  var newArray2 = [];
  for (var i = 0; i < newTopicList.length; i++) {
    var newObject = {};
    newObject.id = newTopicList[i].id; // 浏览量
    newObject.c_pv = newTopicList[i].c_pv; // 浏览量
    newObject.c_degree = newTopicList[i].c_degree; // 推荐度
    newObject.c_reviewNumber = newTopicList[i].c_reviewNumber; // 推荐度
    newObject.c_reviewNumber = newTopicList[i].c_reviewNumber; // 点评数量
    newObject.c_imgNumber = newTopicList[i].c_imgNumber; // 图片数量
    newObject.c_msgNumber = newTopicList[i].c_msgNumber; // 留言数量
    newObject.c_date = newTopicList[i].c_date; // 创建时间
    newObject.c_topicCategory = newTopicList[i].c_topicCategory; // 一级分类
    newObject.c_category = newTopicList[i].c_category; // 二级分类
    newObject.c_topicName = newTopicList[i].c_topicName; // 主题名称
    newObject.c_subclass = newTopicList[i].c_subclass; // 主题子名称
    newObject.c_regional = newTopicList[i].c_regional; // 地区
    newObject.c_city = newTopicList[i].c_city; // 城市
    newObject.c_cover = newTopicList[i].c_cover; // 图片连接
    newObject.c_grade = newTopicList[i].c_grade; // 主题等级
    newObject.c_dataStatus = newTopicList[i].c_dataStatus; // 主题状态

    newArray2.push(newObject);
  }

  return res.status(200).json({
    code: 200,
    msg: 'ok',
    data: {
      pagenum, // 当前页码
      pagesize, // 每页条数
      total, // 总条数
      total_pages, // 最大页码
      newArray2
    }
  })
})


// 修改 浏览量 推荐 [{id:000, c_pv:00, c_degree:9}]
router.put('/api/topicList', (req, res) => {
  const body = req.body
  let arr = body.arr
  arr.forEach((item, index) => {
    let id = item.id
    let pv = item.c_pv
    let degree = item.c_degree
    let topicitem = topicList.find(value => value.id === id)
    // 修改
    topicitem.c_pv = pv
    topicitem.c_degree = degree
  })

  setTimeout(() => {
    return res.status(200).json({
      code: 200,
      msg: 'ok',
    })
  },2000)
})

// 删除  ['222', '222'] id数组
router.delete('/api/topicList', (req, res) => {
  const body = req.body
  let idArr = body.arr
  idArr.forEach((item, index) => {
    let id = item[index]

    let topicIndex = topicList.findIndex(value => value.id === id)
    // 删除
    topicList.splice(topicIndex, 1)
  })

  setTimeout(() => {
    return res.status(200).json({
      code: 200,
      msg: 'ok',
    })
  },2000)

})

module.exports = router

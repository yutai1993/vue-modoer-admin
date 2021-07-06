const express = require('express')
const router = express.Router()
const Mock = require('mockjs')

let Random = Mock.Random;

let ReviewAudit = [
  {
    id: Random.id(),
    status: 1, // 状态 1 未审核
    comprehensive: 0, // 综合评价
    rateData1: 4,
    rateData2: 3,
    rateData3: 2,
    rate:Random.integer(1, 5), // 评分
    topicName: Random.ctitle(5), // 主题名字
    topicNameURL: 'http://www.baidu.com',
    date: Random.date(), // 点评时间
    name: Random.cname(), // 点评名字
    address: Random.cparagraph() // 点评内容
  },{
    id: Random.id(),
    status: 1, // 状态   1未审核
    comprehensive: 0, // 综合评价
    rateData1: 4,
    rateData2: 3,
    rateData3: 2,
    rate:Random.integer(1, 5), // 评分
    topicName: Random.ctitle(5), // 主题名字
    topicNameURL: 'http://mockjs.com/',
    date: Random.date(), // 点评时间
    name: Random.cname(), // 点评名字
    address: Random.cparagraph() // 点评内容
  },

]

router.get('/api/ReviewAudit', (req, res) => {
  let arr = ReviewAudit.filter(value => value.status === 1)
  return res.status(200).json({
    data: arr,
    code: 200,
    msg: 'ok',
  })
})

router.post('/api/addReviewAudit', (req, res) => {
  const body = req.body
  let r = body.ReviewAudit
  r.id = Random.id()
  ReviewAudit.push(r)
  return res.status(200).json({
    data: ReviewAudit,
    code: 200,
    msg: '添加成功',
  })

})

router.post('/api/ReviewAudit', (req, res) => {
  const body = req.body
  let id = body.id
  let status = body.status
  let itemObj = ReviewAudit.find(value => value.id === id)
  // 修改状态
  itemObj.status = status
  return res.status(200).json({
    code: 200,
    msg: '修改状态成功',
  })
})

router.put('/api/ReviewAudit', (req, res) => {
  const body = req.body
  let r = body.editor
  let id = body.id
  let rItem = ReviewAudit.find(value => value.id === id)
 Object.assign(rItem, r)
  return res.status(200).json({
    code: 200,
    msg: '修改成功',
  })

})

/* 删除单个 */
router.delete('/api/ReviewAudit', (req, res) => {
  const body = req.query
  let id = body.id
  let index = ReviewAudit.findIndex(value => value.id === id)
  ReviewAudit.splice(index,1)
  return res.status(200).json({
    code: 200,
    msg: '删除成功',
  })
})

module.exports = router

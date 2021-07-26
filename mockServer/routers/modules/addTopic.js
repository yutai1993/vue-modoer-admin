const express = require('express')
const router = express.Router()

let topicData = require('../../data/topic')


// 获取主题模型
router.get('/api/topicModel', (req, res) => {
     return  res.status(200).json({
        code: 200,
        msg: 'ok',
        data: topicData.topicModel
      })
})

// 获取主题字段
router.get('/api/topicField', (req, res) => {
  return  res.status(200).json({
    code: 200,
    msg: 'ok',
    data: topicData.topicField
  })
})

// 获取主题分类
router.get('/api/topicCategory', (req, res) => {
  return  res.status(200).json({
    code: 200,
    msg: 'ok',
    data: {
      topicCategory1: topicData.topicCategory1,
      topicCategory2: topicData.topicCategory2,
    }
  })
})

// 获取主题等级
router.get('/api/topicGrade', (req, res) => {
  return  res.status(200).json({
    code: 200,
    msg: 'ok',
    data: topicData.topicGrade
  })
})

// 获取主题风格
router.get('/api/topicStyle', (req, res) => {
  return  res.status(200).json({
    code: 200,
    msg: 'ok',
    data: topicData.topicStyle
  })
})



router.post('/api/addTopic', (req, res) => {

})
module.exports = router

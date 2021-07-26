const express = require('express')
const router = express.Router()

let topicList = require('../../data/topicPmp')

router.get('/api/topiceditor', (req, res) => {
  const body = req.query
  let id = body.id
  let item = topicList.find(value => value.id === id)

  if(!item){
    return res.status(200).json({
      code: 200,
      msg: '没找到ID为：'+ id + '的数据',
    })
  }

  return res.status(200).json({
    code: 200,
    msg: 'ok',
    data: item
  })
})

module.exports = router

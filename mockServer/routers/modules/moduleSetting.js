const express = require('express')
const router = express.Router();
const setting = require('../../data/moduleSetting')

router.get('/api/moduleSetting', (req, res) => {
  return res.status(200).json({
    data: setting,
    code: 200,
    msg: 'ok',
  })
})

router.put('/api/rec/moduleSetting', (req, res) => {
  let body = req.body
  let type = body.type
  let data = body.data

  if (type === 'first') {
    setting.firstOptions = data
  }else if (type === 'second') {
    setting.secondOptions = data
  }

  return res.status(200).json({
    code: 200,
    msg: '修改成功',
  })

})


module.exports = router

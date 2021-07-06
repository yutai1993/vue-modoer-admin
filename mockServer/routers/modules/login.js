const express = require('express')
const router = express.Router();
const login = require('../../data/login')
const allRouters = require('../../data/allRouters')
const xiaoMingRouter = require('../../data/xiaoMing_router')


router.post("/api/login", (req, res) => {
  let body = req.body
  let name = body.name
  let tokenItem = login.arrToken.find(value => value.name === name)
  let Token;
  try {
    Token = tokenItem.token
  } catch (e) {
    return res.status(200).json({
      code: 1,
      msg: '名字不存在'
    })
  }

  if (!name) {
    return res.status(200).json({
      code: 1,
      msg: '名字不能为空'
    })
  }

  return res.status(200).json({
    name: name,
    token: Token,
    code: 200,
    msg: 'ok'
  })
})

router.get('/api/permission', (req, res) => {
  let body = req.query
  let token = body.user
  if (token === 'adminToken') {
    return res.status(200).json({
      code: 200,
      mas: '超级管理员',
      routers: allRouters
    })
  }else {
    return res.status(200).json({
      code: 200,
      mas: '普通管理员',
      routers: xiaoMingRouter
    })
  }

})


module.exports = router

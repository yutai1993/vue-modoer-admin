const express = require('express')
const router = express.Router()

const articleData = require('../../data/article')

/**

 articleList,
 articleCategory1,
 articleCategory2,
 articleCity,
 userAttribute

 */

// 获取一级分类
router.get('/api/articleCategory1', (req, res) => {

  return res.status(200).json({
    code: 200,
    msg: 'ok',
    data: {
      articleCategory1: articleData.articleCategory1
    }
  })

})

// 获取二级分类
router.get('/api/articleCategory2', (req, res) => {

  return res.status(200).json({
    code: 200,
    msg: 'ok',
    data: {
      articleCategory2: articleData.articleCategory2
    }
  })
})

// 获取城市
router.get('/api/articleCity', (req, res) => {

  return res.status(200).json({
    code: 200,
    msg: 'ok',
    data: {
      articleCity: articleData.articleCity
    }
  })

})

// 自定义属性
router.get('/api/userAttribute', (req, res) => {

  return res.status(200).json({
    code: 200,
    msg: 'ok',
    data: {
      userAttribute: articleData.userAttribute
    }
  })

})


// 文章管理  获取文章
router.get('/api/articleControl', (req, res) => {
  let body = req.query
  let pagenum = parseInt(body.pagenum) || 1 // 当前页码
  let pagesize = parseInt(body.pagesize) || 20 // 每页条数

  let articleList = articleData.articleList

  let skip = (pagenum - 1) * pagesize // 跳过的条数
  let limit = skip + pagesize // 获取的条数
  let total = articleList.length // 总条数
  let total_pages = Math.ceil(total / pagesize) // 最大页码

  let newarticleList = articleList.slice(skip, limit)


  let articleArr = []
  newarticleList.forEach((item, index) => {

    let category1,category2,city;
    articleData.articleCategory1.forEach((v, index) => {
      if (v.id === item.categoryActive1) {
        category1 = v.name
      }
    })

    articleData.articleCategory2.forEach((v, index) => {
      if (v.id === item.categoryActive2) {
        category2 = v.name
      }
    })

    articleData.articleCity.forEach((v, index) => {
      if (v.id === item.cityActive) {
        city = v.name
      }
    })

    let obj = {}
    obj.id = item.id
    obj.sort = item.sort
    obj.articleName = item.articleName
    obj.categoryActive1 = category1
    obj.categoryActive2 = category2
    obj.cityActive = city
    obj.adminName = item.adminName
    obj.pv = item.pv
    obj.reviewNumber = item.reviewNumber
    obj.attributeActive = item.attributeActive
    obj.digg = item.digg
    obj.status = item.status
    obj.date = item.date

    articleArr.push(obj)

  })

  return res.status(200).json({
    code: 200,
    msg: 'ok',
    data: {
      pagenum, // 当前页码
      pagesize, // 每页条数
      total, // 总条数
      total_pages, // 最大页码
      articleList: articleArr
    }
  })

})

// 修改 浏览量 推荐 [{id:000, sort:0, }]
router.put('/api/articleList', (req, res) => {
  const body = req.body
  let arr = body.arr
  arr.forEach((item, index) => {
    let id = item.id
    let sort = item.sort
    let articleitem = articleData.articleList.find(value => value.id === id)
    // 修改
    articleitem.sort = sort
  })

  setTimeout(() => {
    return res.status(200).json({
      code: 200,
      msg: 'ok',
    })
  },2000)
})

// 删除  ['222', '222'] id数组
router.delete('/api/articleList', (req, res) => {
  const body = req.body
  let idArr = body.arr
  idArr.forEach((item, index) => {
    let id = item[index]

    let list = articleData.articleList;
    let topicIndex = list.findIndex(value => value.id === id)
    // 删除
    list.splice(topicIndex, 1)
  })

  setTimeout(() => {
    return res.status(200).json({
      code: 200,
      msg: 'ok',
    })
  },2000)

})

router.get('/api/articleItem', (req, res) => {
  const body = req.query
  const id = body.id
  let { articleList } = articleData
  let item = articleList.find(value => value.id === id)
  if (item){
    return res.status(200).json({
      code: 200,
      msg: 'ok',
      data:{
        articleActive:item
      }
    })
  }else {
    return res.status(200).json({
      code: 1,
      msg: '不存在',
      data:{
        articleActive: {}
      }
    })
  }
})

module.exports = router

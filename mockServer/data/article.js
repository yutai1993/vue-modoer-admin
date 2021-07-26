const Mock = require('mockjs')

const Random = Mock.Random

// 文章数据
let data = Mock.mock({
  "articleList|60-200": [
    {
      id: '@id()', // 文章id
      sort: 0, // 排序
      pv: '@natural(0, 888)', // 浏览量
      reviewNumber: '@natural(0, 66)', // 点评数量
      articleName: '@csentence(5, 8)', // 文章名称
      categoryActive1: 1, // 文章一级分类
      categoryActive2: 1, // 文章二级分类
      "cityActive|1": [1,2,3,4], //  城市
      status: 0, // 审核文章状态
      evaluate: 0, // 关闭文章评论
      attributeActive: 1, // 自定义属性
      digg: '@natural(0, 888)', // 用户顶
      dialogImageUrl: Random.image('200x100', '#4A7BF7', 'Hello'), //封面连接
      topicName: '0', // 关联主题
      adminName: 'admin', // 文章作者
      source: 'admin', // 文章来源
      keyword: 'keyword', // 关键字
      date: '@date()', // 发布时间
      intro: '@csentence()', // 文章简介
      content: '@cparagraph(10, 99)',  // 富文本 文章内容
    }
  ]
})

// 一级分类
let articleCategory1 = [
  {
    id: 1,
    name: Random.cword(3,5),
  },
  {
    id: 2,
    name: Random.cword(3,5),
  },
  {
    id: 3,
    name: Random.cword(3,5),
  }
];

// 二级分类
let articleCategory2 = [
  {
    id: 1,
    uid: 1,
    name: Random.cword(3,5),
  },
  {
    id: 2,
    uid: 1,
    name: Random.cword(3,5),
  },
  {
    id: 3,
    uid: 3,
    name: Random.cword(3,5),
  },
  {
    id: 4,
    uid: 3,
    name: Random.cword(3,5),
  },
  {
    id: 5,
    uid: 2,
    name: Random.cword(3,5),
  },
  {
    id: 6,
    uid: 2,
    name: Random.cword(3,5),
  }
];


// 城市
let articleCity = [
  {
    id: 1,
    name: Random.city(),
  },
  {
    id: 2,
    name: Random.city(),
  },
  {
    id: 3,
    name: Random.city(),
  },
  {
    id: 4,
    name: Random.city(),
  }
];


// 自定义属性
let userAttribute = [
  {
    id: 1,
    name: Random.cword(3,5),
  },
  {
    id: 2,
    name: Random.cword(3,5),
  },
  {
    id: 3,
    name: Random.cword(3,5),
  },
  {
    id: 4,
    name: Random.cword(3,5),
  }
];

module.exports = {
  articleList: data.articleList,
  articleCategory1,
  articleCategory2,
  articleCity,
  userAttribute
}

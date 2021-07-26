const Mock = require('mockjs')

const Random = Mock.Random


// 一级分类
let topicCategory1 = [
  {
    id: 1,
    topicCategory2Id: 1,
    name: Random.cword(3,5),
  },
  {
    id: 2,
    topicCategory2Id: 2,
    name: Random.cword(3,5),
  },
  {
    id: 3,
    topicCategory2Id: 3,
    name: Random.cword(3,5),
  }
];

  // 二级分类
 let topicCategory2 = [
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

// 主题字段
let topicField = Mock.mock({
  c_topicCategory: '',
  c_dataSuatus: [],
  c_cover: '',
  c_grade: '',
  c_topicStyle: '',
  c_topicAdmin: '',
  c_category: '',
  c_topicName: '',
  c_subclass: '',
  c_map: '',
  c_regional: '',
  c_synopsis: '',
  c_site: '',
  c_business: [],
  c_contact: '',
  c_letter: '',
})

// 主题等级
let topicGrade = [
  {
    id: 1,
    name: Random.cword(3),
  },
  {
    id: 2,
    name: Random.cword(3),
  },
  {
    id: 3,
    name: Random.cword(3),
  },

];


// 主题等级
let topicStyle = [
  {
    id: 1,
    name: Random.cword(3),
  },
  {
    id: 2,
    name: Random.cword(3),
  },
  {
    id: 3,
    name: Random.cword(3),
  },

];

module.exports = {
  topicField, // 主题字段
  topicCategory1, // 一级分类
  topicCategory2, // 二级分类
  topicGrade,
  topicStyle,
}

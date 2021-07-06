const setting = {
  firstOptions:{
    options: [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }],
    value: '',
    radio: 0, /* 第二行单选 */
    input: '',
    options2: [{
      value: '1',
      label: '金币'
    }, {
      value: '2',
      label: '银币'
    }, {
      value: '3',
      label: '铜钱'
    }],
    value2: '',
    input1: 180,
    audit1: 0,
    audit2: 0,
    audit3: 0,
    audit4: 0,
    audit5: 0,
    audit6: 0,
    input2: 10,
    mini: 10,
    max: 50,
    audit7: 0,
    audit8: 0,
    audit9: 0,
    audit10: 0,
    audit11: 0,
    audit12: 0,
    audit13: 0,

  },
  secondOptions: {
    imgMini: 200,
    imgMax: 150,
    playerMini: 250,
    playerMax: 200,
    topicList: 20,
    remarkList: 20,
    validRemark: 0,
    rank:0,
    options: [{
      value: '0',
      label: '最新上传的图片'
    }, {
      value: '1',
      label: '自适应(无图时选最新)'
    }, {
      value: '2',
      label: '手动选择图片'
    }],
    value: '1',
    SlightlyList: 0,
    showQr: 0,
    showStatistics: 0,
  }
}

module.exports = setting

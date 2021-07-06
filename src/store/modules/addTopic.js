export default {
  namespaced: true,
  state: () => ({
    addTopicData: [],
    optionsActive: {}
  }),

  mutations:{
    ADDTOPICDATA(state, data){
      state.addTopicData = data
    },
    OPTIONSACTIVE(state, dataObj){
      state.optionsActive = dataObj
    }
  },

  actions:{

    fetchAddTopicData({commit}, payload){
      setTimeout(() => {
        let dataArr = [
          {
            name: '主题分类:',
            flag: 'select',
            fields: 'c_topicCategory',
            data: [
              {
                id: 1,
                label: '黄金糕1'
              }, {
                id: 2,
                label: '黄金糕2'
              }, {
                id: 3,
                label: '黄金糕3'
              }, {
                id: 4,
                label: '黄金糕4'
              }, {
                id: 5,
                label: '黄金糕5'
              },],
          }, {
            name: '数据状态:',
            flag: 'radio',
            fields: 'c_dataSuatus',
            data: [
              {
                id: 1,
                label: '黄金糕1'
              }, {
                id: 2,
                label: '黄金糕2'
              }, {
                id: 3,
                label: '黄金糕3'
              }, {
                id: 4,
                label: '黄金糕4'
              }, {
                id: 5,
                label: '黄金糕5'
              },],
          }, {
            name: '选择封面:',
            flag: 'upload',
            fields: 'c_cover',
          }, {
            name: '主题等级:',
            flag: 'select',
            fields: 'c_grade',
            data: [
              {
                id: 1,
                label: '黄金糕1'
              }, {
                id: 2,
                label: '黄金糕2'
              }, {
                id: 3,
                label: '黄金糕3'
              }, {
                id: 4,
                label: '黄金糕4'
              }, {
                id: 5,
                label: '黄金糕5'
              },],
          }, {
            name: '主题风格:',
            flag: 'select',
            fields: 'c_topicStyle',
            data: [
              {
                id: 1,
                label: '黄金糕1'
              }, {
                id: 2,
                label: '黄金糕2'
              }, {
                id: 3,
                label: '黄金糕3'
              }, {
                id: 4,
                label: '黄金糕4'
              }, {
                id: 5,
                label: '黄金糕5'
              },],
          }, {
            name: '管理员:',
            flag: 'input',
            fields: 'c_topicAdmin',
          }, {
            name: '分类:',
            flag: 'checkbox',
            fields: 'c_category',
            data: [
              {
                id: 1,
                label: '黄金糕1'
              }, {
                id: 2,
                label: '黄金糕2'
              }, {
                id: 3,
                label: '黄金糕3'
              }, {
                id: 4,
                label: '黄金糕4'
              }, {
                id: 5,
                label: '黄金糕5'
              },],
          }, {
            name: '名称:',
            flag: 'select',
            fields: 'c_topicName',
            data: [
              {
                id: 1,
                label: '黄金糕1'
              }, {
                id: 2,
                label: '黄金糕2'
              }, {
                id: 3,
                label: '黄金糕3'
              }, {
                id: 4,
                label: '黄金糕4'
              }, {
                id: 5,
                label: '黄金糕5'
              },],
          }, {
            name: '子名称:',
            flag: 'select',
            fields: 'c_subclass',
            data: [
              {
                id: 1,
                label: '黄金糕1'
              }, {
                id: 2,
                label: '黄金糕2'
              }, {
                id: 3,
                label: '黄金糕3'
              }, {
                id: 4,
                label: '黄金糕4'
              }, {
                id: 5,
                label: '黄金糕5'
              },],
          }, {
            name: '地图坐标:',
            flag: 'select',
            fields: 'c_map',
            data: [
              {
                id: 1,
                label: '黄金糕1'
              }, {
                id: 2,
                label: '黄金糕2'
              }, {
                id: 3,
                label: '黄金糕3'
              }, {
                id: 4,
                label: '黄金糕4'
              }, {
                id: 5,
                label: '黄金糕5'
              },],
          }, {
            name: '地区:',
            flag: 'select',
            fields: 'c_regional',
            data: [
              {
                id: 1,
                label: '黄金糕1'
              }, {
                id: 2,
                label: '黄金糕2'
              }, {
                id: 3,
                label: '黄金糕3'
              }, {
                id: 4,
                label: '黄金糕4'
              }, {
                id: 5,
                label: '黄金糕5'
              },],
          }, {
            name: '简介:',
            flag: 'select',
            fields: 'c_synopsis',
            data: [
              {
                id: 1,
                label: '黄金糕1'
              }, {
                id: 2,
                label: '黄金糕2'
              }, {
                id: 3,
                label: '黄金糕3'
              }, {
                id: 4,
                label: '黄金糕4'
              }, {
                id: 5,
                label: '黄金糕5'
              },],
          }, {
            name: '地址:',
            flag: 'input',
            fields: 'c_site',
          }, {
            name: '营业状态:',
            flag: 'radio',
            fields: 'c_business',
            data: [
              {
                id: 1,
                label: '黄金糕1'
              }, {
                id: 2,
                label: '黄金糕2'
              }, {
                id: 3,
                label: '黄金糕3'
              }, {
                id: 4,
                label: '黄金糕4'
              }, {
                id: 5,
                label: '黄金糕5'
              },],
          }, {
            name: '联系方式:',
            flag: 'input',
            fields: 'c_contact',
          }, {
            name: '详细介绍:',
            flag: 'textarea',
            fields: 'c_letter',
          },
        ]
        commit('ADDTOPICDATA', dataArr)
        let optionsActive = {}
        dataArr.forEach((item,index) => {
          if (item.flag === 'select'){
            optionsActive[item.fields] = ''
          }
          if (item.flag === 'input'){
            optionsActive[item.fields] = ''
          }
          if (item.flag === 'radio'){
            optionsActive[item.fields] = ''
          }
          if (item.flag === 'checkbox'){
            optionsActive[item.fields] = []
          }
        })
        commit('OPTIONSACTIVE',optionsActive)
      },2000)
    }
  },

  getters:{

  }
}

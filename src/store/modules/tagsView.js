import { getDefaultRouter } from '../../utils/utils'
import router from '../../router'
export default {
  namespaced: true,
  state () {
    return {
      tagActiveName: 'Home', // 当前选中 tag
      tags: [], // tags列表
      excludeKeepName: [] // 排除缓存组件名称
    }
  },
  mutations: {
    /* 默认 tag */
    TAGDEFAULT (state, router) {
      const RootRouter = router.options.routes.find(value => value.path === '')
      const tagDefault = RootRouter.redirect.name
      const tagObj = getDefaultRouter(RootRouter.children, tagDefault)
      const faltering = state.tags.some(item => item.name === tagObj.name)
      if (!faltering) {
        state.tags.unshift(tagObj)
      }
    },
    /* 选中 */
    TOGGLEVIEW (state, tagActiveName) {
      state.tagActiveName = tagActiveName
    },
    /* 删除 tag 清除缓存 */
    CLOSEVIEW (state, tagObj) {
      state.tags.splice(tagObj.index, 1)
      this.commit('tagsView/CLOSEEXCLUDEKEEPNAME', tagObj.name)
    },
    /* 添加 tag && 添加缓存 */
    ADDTAGVIEW (state, currentRoute) {
      const faltering = state.tags.some(item => item.name === currentRoute.name)
      if (!faltering) {
        this.commit('tagsView/ADDEXCLUDEKEEPNAME', currentRoute.name)
        let tagObj = {
          name: currentRoute.name,
          title: currentRoute.meta.title,
          fullPath: currentRoute.fullPath
        }
        // 有参数的情况
        let attribute = Object.keys(currentRoute.params)
        if(attribute.length){
          tagObj.title = currentRoute.meta.title+ '-' + currentRoute.params.id
          tagObj.params = {}
          Object.assign(tagObj.params, currentRoute.params)
        }
        state.tags.push(tagObj)
        this.commit('tagsView/TOGGLEVIEW', currentRoute.name)
      } else {
        // 有参数的情况
        let attribute = Object.keys(currentRoute.params)
        if(attribute.length){
          let Obj = state.tags.find(item => item.name === currentRoute.name)
          Obj.title = currentRoute.meta.title+ '-' + currentRoute.params.id
          Obj.fullPath = currentRoute.fullPath
          router.push({
            path: currentRoute.fullPath
          })
        }

        /* 选中 */
        this.commit('tagsView/TOGGLEVIEW', currentRoute.name)
      }
    },
    /* 添加缓存 */
    ADDEXCLUDEKEEPNAME (state, name) {
      const index = state.excludeKeepName.indexOf(name)
      if (index === -1) {
        state.excludeKeepName.push(name)
      }
    },
    /* 删除缓存 */
    CLOSEEXCLUDEKEEPNAME (state, name) {
      const index = state.excludeKeepName.indexOf(name)
      if (index !== -1) {
        state.excludeKeepName.splice(index, 1)
      }
    },
    /* 关闭其他 */
    CLOSEOTHERSTAGS (state, tag) {
      state.tags = state.tags.filter((item, index) => {
        if (item.affix || item.name === tag.name) {
          return item
        } else {
          state.excludeKeepName.splice(index, 1)
        }
      })
    },
    /* 关闭没有固钉的所有tag */
    CLOSEALLTAGS (state) {
      state.tags = state.tags.filter((item, index) => {
        if (item.affix) {
          return item
        } else {
          state.excludeKeepName.splice(index, 1)
        }
      })
    }
  },
  actions: {

  }
}

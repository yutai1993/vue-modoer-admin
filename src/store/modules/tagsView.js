import { getDefaultRouter } from "../../utils/utils";

export default {
  namespaced: true,
  state () {
    return {
      tagActiveName: 'Home', // 当前选中 tag
      tags: [], // tags列表
      excludeKeepName:[], // 排除缓存组件名称
    }
  },
  mutations:{
    /* 默认 tag */
    TAGDEFAULT(state){
      /* 依赖过滤后的路由列表 */
      let router = this.state.user.permissionList;
      let tagDefault = router.redirect.name;
      let tagObj = getDefaultRouter(router.children, tagDefault)
      let faltering = state.tags.some(item => item.name === tagObj.name);
      if (!faltering){
        state.tags.unshift(tagObj)
      }

    },
    /* 选中 */
    TOGGLEVIEW(state, tagActiveName){
      state.tagActiveName = tagActiveName
    },
    /* 删除 tag 清除缓存*/
    CLOSEVIEW(state, tagObj) {
      state.tags.splice(tagObj.index, 1)
      this.commit('tagsView/CLOSEEXCLUDEKEEPNAME', tagObj.name)
    },
    /* 添加 tag && 添加缓存 */
    ADDTAGVIEW(state, currentRoute){
      let faltering = state.tags.some(item => item.name === currentRoute.name)
      if(!faltering){
       this.commit('tagsView/ADDEXCLUDEKEEPNAME', currentRoute.name)
        state.tags.push({
          name: currentRoute.name,
          title: currentRoute.meta.title
        })
        this.commit('tagsView/TOGGLEVIEW', currentRoute.name)
      }else {
        this.commit('tagsView/TOGGLEVIEW', currentRoute.name)
      }
    },
    /* 添加缓存 */
    ADDEXCLUDEKEEPNAME(state, name){
      let index = state.excludeKeepName.indexOf(name);
      if (index === -1) {
        state.excludeKeepName.push(name)
      }
    },
    /* 删除缓存 */
    CLOSEEXCLUDEKEEPNAME(state, name){
      let index = state.excludeKeepName.indexOf(name);
      if (index !== -1) {
        state.excludeKeepName.splice(index, 1)
      }
    },
    /* 关闭其他 */
    CLOSEOTHERSTAGS(state, tag){
      state.tags = state.tags.filter((item, index)=>{
        if (item.affix || item.name === tag.name){
          return item
        } else {
          state.excludeKeepName.splice(index, 1)
        }
      })
    },
    /* 关闭没有固钉的所有tag */
    CLOSEALLTAGS(state){
      state.tags = state.tags.filter((item, index)=>{
        if (item.affix){
          return item
        } else {
          state.excludeKeepName.splice(index, 1)
        }
      })
    }
  },
  actions:{

  }
}

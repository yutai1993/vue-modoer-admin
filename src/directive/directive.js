import Vue from 'vue'
import router from '../router'

/**
 * 全局指令 如果当前路由不具备当前按钮的权限 禁用 或者 删除该按钮
 * 使用  v-permission="{action: 'add', effect: 'disabled'}"
 */
Vue.directive('permission', {
  // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  inserted: (el, binding) => {
    const rules = router.currentRoute.meta.rules || [];
    if (rules.length && rules.indexOf(binding.value.action) === -1) {
      if (binding.value.effect === 'disabled') {
        //  没有这个权限  添加禁用
        el.disabled = true
        el.classList.add('is-disabled')
      } else {
        el.parentNode.removeChild(el)
      }
    }
  }

})

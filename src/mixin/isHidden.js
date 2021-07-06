/*  是否在侧边栏显示 true不显示 */
export let mixinIsHidden = {
  methods: {
    isHidden(meta){
      if (meta.hidden) {
        return true
      }else {
        return false
      }
    },
  }
}


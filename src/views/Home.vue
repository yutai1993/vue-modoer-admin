<template>
  <div>
    <div id="mount-point">home
      <el-button v-permission="{action: 'add', effect: 'disabled'}" @click="addHandle" type="primary">添加按钮</el-button>
      <el-button type="warning">修改按钮</el-button>
      <el-button type="danger">删除按钮</el-button>
    </div>
    <div v-for="item in 50" :key="item">{{item}}修改后人推</div>
  </div>
</template>

<script>
import { add } from '../api/Home/Home'
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {

    }
  },

  mounted () {

  },

  methods: {
    // 点击添加的操作
    async addHandle () {
      const data = await add()
      if (data) {
        console.log(data)
      }
    }
  }

}
</script>

<style lang="scss">

</style>

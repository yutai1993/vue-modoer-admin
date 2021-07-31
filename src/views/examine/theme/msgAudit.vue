<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="themeAuditData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <template slot="empty">
        <BaseLoading v-if="emptyText"/>
        <p v-else>暂无数据</p>
      </template>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="topicName"
        label="主题名称"
        class-name="van-multi-ellipsis--l2">
      </el-table-column>
      <el-table-column
        label="留言会员"
        width="120">
        <template slot-scope="scope">{{ scope.row.category }}</template>
      </el-table-column>
      <el-table-column
        prop="topicName"
        label="留言内容"
        class-name="van-multi-ellipsis--l2">
      </el-table-column>
      <el-table-column
        label="留言时间"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        label="IP"
        width="120">
        <template slot-scope="scope">{{ scope.row.category }}</template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="themeAuditData.length" style="margin-top: 20px; text-align: center;">
      <el-button type="success">批量审核</el-button>
      <el-button type="danger">批量删除</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'msgAudit',
  data () {
    return {
      themeAuditData: [],
      multipleSelection: [],
      emptyText: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.emptyText = false
    }, 2000)
  },

  methods: {
    // 选中的
    handleSelectionChange (val) {
      this.multipleSelection = val
    },

    // 编辑
    handleEdit (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<template>
  <div class="modoer-table">
    <el-table
      ref="multipleTable"
      :data="ReviewAuditList"
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
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="作者"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="点评内容"
        class-name="van-multi-ellipsis--l2">
      </el-table-column>
      <el-table-column label="操作" width="210">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleSuccess(scope.$index, scope.row)">通过
          </el-button>
          <el-popconfirm
            title="这是一段内容确定删除吗？"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button
            size="mini"
            type="danger"
            slot="reference"
            >删除
          </el-button>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px; text-align: center;">
      <el-button type="success">批量审核</el-button>
      <el-button type="danger">批量删除</el-button>
    </div>
    <!--弹窗编辑-->
    <el-dialog title="编辑点评信息" :visible.sync="dialogTableVisible">
      <table class="table-body">
        <tbody>
        <tr>
          <td class="moduleSetting-left">
            主题名称
          </td>
          <td class="moduleSetting-right">
            <span class="topicNameURL" @click="open(ReviewItem.topicNameURL)">{{ReviewItem.topicName}}</span>
          </td>
        </tr>
        <tr>
          <td class="moduleSetting-left">
            点评会员
          </td>
          <td class="moduleSetting-right">
            <span>{{ReviewItem.name}}</span>
          </td>
        </tr>
        <tr>
          <td class="moduleSetting-left">
            状态
          </td>
          <td class="moduleSetting-right">
            <el-radio-group v-model="ReviewItem.status">
              <el-radio :label="0">已审核</el-radio>
              <el-radio :label="1">未审核</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td class="moduleSetting-left">
            综合评价
          </td>
          <td class="moduleSetting-right">
            <el-radio-group v-model="ReviewItem.comprehensive">
              <el-radio :label="0">好</el-radio>
              <el-radio :label="1">一般</el-radio>
              <el-radio :label="2">不好</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td class="moduleSetting-left">
            评价分数
          </td>
          <td class="moduleSetting-right">
            <div class="rate-box">环境：
              <el-rate
                v-model="ReviewItem.rateData1"
                show-text>
              </el-rate>
            </div>
            <div class="rate-box">服务：
              <el-rate
                v-model="ReviewItem.rateData2"
                show-text>
              </el-rate>
            </div>
            <div class="rate-box">性价比：
              <el-rate
                v-model="ReviewItem.rateData3"
                show-text>
              </el-rate>
            </div>
          </td>
        </tr>
        <tr>
          <td class="moduleSetting-left">
            点评内容
          </td>
          <td class="moduleSetting-right">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="ReviewItem.address">
            </el-input>
          </td>
        </tr>
        </tbody>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {isExternal} from '@/utils/utils'

  export default {
    name: 'comment',
    data() {
      return {
        multipleSelection: [], // 选中的
        dialogTableVisible: false, // 是否弹窗
      }
    },

    mounted() {
      this.getListData()
    },

    computed: {
      ...mapState('ReviewAudit', ['ReviewAuditList', 'ReviewItem', 'emptyText'])
    },

    methods: {

      getListData() {
        if (this.ReviewAuditList.length === 0) {
          this.$store.dispatch('ReviewAudit/getReview')
        }
      },

      // 编辑中的主题外联
      open(path) {
        if (isExternal(path)) {
          window.open(path)
        } else {
          this.$router.push({path})
        }

      },

      // 选中的
      handleSelectionChange(val) {
        this.multipleSelection = val
      },

      // 编辑
      handleEdit(index, row) {
        this.$store.dispatch('ReviewAudit/getReviewItem', row.id).then(()=> {
          this.dialogTableVisible = true
        })

      },

      // 修改
      submit() {
        let data = {
          ReviewItem:this.ReviewItem,
          id: this.ReviewItem.id
        }
        this.$store.dispatch('ReviewAudit/putReview', data).then(()=> {
          this.dialogTableVisible = false
        })
      },

      // 审核
      handleSuccess(index, row) {
        let data = {
          id: row.id,
          status: 0
        }
        this.$store.dispatch('ReviewAudit/postReview', data)
      },


      // 删除
      handleDelete(index, row) {
        this.$store.dispatch('ReviewAudit/deleteReview', row.id)
      },


    }
  }
</script>

<style lang="scss">
  .el-popconfirm__main{
    margin: 10px 0;
  }

  .modoer-table {
    background-color: rgba(255, 255, 255, 1);
    .topicNameURL{
      color: #2a6496;
      cursor: pointer;
    }
    .el-button+.el-button {
      margin-right: 10px;

    }

  }

  .van-multi-ellipsis--l2 > div {
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /*需要显示时文本行数*/
    overflow: hidden;
  }

  /* 编辑 弹出框 */
  .el-dialog {
    .el-dialog__body {
      padding-top: 0;
    }

    .table-body {
      width: 100%;

      .el-rate {
        display: inline-block;
        vertical-align: middle;
      }


      .el-textarea textarea {
        height: 150px;
      }


      td {
        border-bottom: 1px solid #ebeef5;
        vertical-align: middle;
        padding: 12px 0;
      }

      .moduleSetting-left {
        width: 150px;
      }
    }
  }

</style>

<template>
  <div class="topic">
    <div class="topic_pop">
      <div class="filter">
        <span>主题筛选</span>
      </div>
    </div>
    <div class="topic_pop_body_box">
      <table style="width: 100%">
        <tbody>
        <tr>
          <td class="bg">主题分类</td>
          <td>
            <el-select v-model="categoryActive" size="mini" placeholder="请选择">
              <el-option
                v-for="item in filter.category"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </td>
          <td class="bg">所属地区</td>
          <td>
            <el-select v-model="regionActive" size="mini" placeholder="请选择">
              <el-option
                v-for="item in filter.region"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="bg">主题关键字</td>
          <td>
            <div style="width: 200px">
              <el-input size="mini" v-model="keywordActive" placeholder="请输入内容"></el-input>
            </div>
          </td>
          <td class="bg">点评对象ID</td>
          <td>
            <div style="width: 200px">
              <el-input size="mini" v-model="reviewID" placeholder="请输入内容"></el-input>
            </div>
          </td>
        </tr>
        <tr>
          <td class="bg">主题创建者</td>
          <td>
            <div style="width: 200px">
              <el-input size="mini" v-model="creator" placeholder="请输入内容"></el-input>
            </div>
          </td>
          <td class="bg">主题管理员</td>
          <td>
            <div style="width: 200px">
              <el-input size="mini" v-model="topicAdmin" placeholder="请输入内容"></el-input>
            </div>
          </td>
        </tr>
        <tr>
          <td class="bg">发布时间</td>
          <td colspan="3">
            <el-date-picker
              size="mini"
              v-model="filter.datePicker"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <span style="font-size: 14px"> (YYYY-MM-DD)</span>
          </td>
        </tr>
        <tr>
          <td class="bg">结果排序</td>
          <td colspan="3">
            <el-select style="width: 100px" v-model="sortingActive" size="mini" placeholder="请选择">
              <el-option
                v-for="item in filter.sorting"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select style="width: 100px; margin: 0 5px" v-model="orderActive" size="mini" placeholder="请选择">
              <el-option
                v-for="item in filter.order"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select style="width: 100px" v-model="pagesize" size="mini" placeholder="请选择">
              <el-option
                v-for="item in filter.offset"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="topic_pop" style="margin-top: 15px">
      <div class="filter">
        <span>主题管理</span>
      </div>
    </div>
    <div class="topic_pop_body_box xHeidden">
      <el-table
        :data="topicList.newArray2"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <!-- 选择 -->
        <el-table-column
          fixed
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          label="封面"
          width="100">
          <template slot-scope="scope">
            <el-image :src="scope.row.c_cover" fit="contain" style="max-width: 80px; max-height: 60px">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          label="标题/分类/地区"
          width="220">
          <template slot-scope="scope">
            <div class="title">
              <p>{{scope.row.c_topicName}}({{scope.row.c_subclass}})</p>
              <p><span>{{scope.row.c_topicCategory}}</span> &raquo; <span>{{scope.row.c_category}}</span></p>
              <p><span>{{scope.row.c_regional}}</span> &raquo; <span>{{scope.row.c_city}}</span></p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="推荐度"
          width="120">
          <template slot-scope="scope">
            <el-input style="width: 60px" size="mini" v-model="scope.row.c_degree" placeholder="请输入内容"/>
          </template>
        </el-table-column>
        <el-table-column
          label="浏览量"
          width="120">
          <template slot-scope="scope">
            <el-input style="width: 60px" size="mini" v-model="scope.row.c_pv" placeholder="请输入内容"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="c_grade"
          label="等级"
          width="120">
        </el-table-column>
        <el-table-column
          prop="c_reviewNumber"
          label="点评"
          width="120">
        </el-table-column>
        <el-table-column
          prop="c_imgNumber"
          label="图片数量"
          width="120">
        </el-table-column>
        <el-table-column
          prop="c_msgNumber"
          label="留言量"
          width="120">
        </el-table-column>
        <el-table-column
          prop="c_date"
          label="添加时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="c_dataSuatus"
          label="状态"
          width="120">
          <template slot-scope="scope">
            <span class="center">{{scope.row.c_dataStatus | filterTopicStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="editorHandle(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页器 -->
    <div class="paging">
      <el-pagination
        layout="prev, pager, next"
        :page-size.sync="topicList.pagesize"
        :page-count="topicList.total_pages"
        :current-page.sync="topicList.pagenum"
        :total="topicList.total"
        @current-change="currentChangeHandle"
        @prev-click="prevClickHandle"
        @next-click="nextClickHandle">
      </el-pagination>
    </div>

    <!--操作按钮 -->
    <div class="Action">
      <el-button type="primary" size="small" @click="changeHandle">更新修改</el-button>
      <el-button type="primary" size="small" @click="deleteHandle">删除所选</el-button>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'topicPmp',
  data () {
    return {
      // 主题筛选 选中的
      categoryActive: '', // 主题分类选中的
      regionActive: '', // 选中的所属地区
      keywordActive: '', // 输入的关键字
      reviewID: '', // 输入的点评对象ID
      creator: '', // 主题创建者
      topicAdmin: '', // 主题管理员
      sortingActive: 1, // 选中的排序方式
      orderActive: 1, // 升序 | 降序
      pagesize: 20, // 每页条数
      multipleSelection: [], // 选中的主题对象数组

      // ==================主题筛选所需数据===============================
      filter: {
        category: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }
        ], // 主题分类
        region: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }
        ], // 所属地区
        datePicker: '', // 时间选择
        sorting: [
          {
            value: 1,
            label: '默认排序'
          }, {
            value: 2,
            label: '登记时间'
          }, {
            value: 3,
            label: '推荐度'
          }
        ], // 排序方式
        order: [
          {
            value: 1,
            label: '递减'
          }, {
            value: 2,
            label: '递增'
          }
        ], // 升序降序
        offset: [
          {
            value: 10,
            label: '10条'
          }, {
            value: 20,
            label: '20条'
          }
        ] // 每页条数
      },

      pagenum: 1 // 当前页码
    }
  },
  watch: {
    'topicList.pagenum' (v) {
      this.pagenum = v
    },
    'topicList.pagesize' (v) {
      this.pagesize = v
    }
  },
  computed: {
    ...mapState('tagsView', ['tags']),
    ...mapState('topicPmp', ['topicList'])
  },
  mounted () {
    this.getTopicList()
  },
  methods: {

    getTopicList () {
      this.$store.dispatch('topicPmp/fetchTopicList', {
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
    },

    // 修改 推荐度 浏览量
    changeHandle () {
      // 获取 每条数据的 id 推荐度 浏览量
      const { newArray2 } = this.topicList
      const arr = []
      for (let i = 0; i < newArray2.length; i++) {
        const r = {}
        r.id = newArray2[i].id
        r.c_pv = newArray2[i].c_pv
        r.c_degree = newArray2[i].c_degree
        arr.push(r)
      }
      const params = {
        data: {
          arr
        },
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }
      this.$store.dispatch('topicPmp/putTopicList', params)
    },

    // 删除选中的
    deleteHandle () {
      const s = this.multipleSelection
      if (s.length <= 0) {
        return
      }
      const arr = []
      for (let i = 0; i < s.length; i++) {
        arr.push(s[i].id)
      }

      const params = {
        data: {
          arr
        },
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }
      this.$store.dispatch('topicPmp/deleteTopicList', params)
    },

    // 当前页改变时触发
    currentChangeHandle () {
      this.$store.dispatch('topicPmp/fetchTopicList', {
        pagenum: this.topicList.pagenum,
        pagesize: this.topicList.pagesize
      })
    },

    // 用户点击上一页按钮改变当前页后触发
    prevClickHandle () {
      console.log('用户点击上一页按钮')
    },

    // 用户点击下一页按钮改变当前页后触发
    nextClickHandle () {
      console.log('用户点击下一页按钮')
    },

    // 选中的
    handleSelectionChange (val) {
      this.multipleSelection = val
    },

    // 查看
    handleClick (row) {
      console.log('查看ID', row.id)
    },
    // 编辑
    editorHandle (row) {
      console.log('编辑ID', row.id)
      const topiceditorIndex = this.tags.findIndex(value => value.name === 'topiceditor')
      const topiceditor = this.tags.find(value => value.name === 'topiceditor')
      /* 替换 tags 中 tag数据 */
      if (topiceditor && Object.keys(topiceditor.params).length) {
        topiceditor.params.id = row.id
        this.tags.splice(topiceditorIndex, 1, topiceditor)
      }
      this.$router.push(`/topic/topicProject/topiceditor/${row.id}`)
    }
  },

  filters: {

    filterTopicStatus (value) {
      if (value === 0) {
        return '正常'
      }
      if (value === 1) {
        return '回收站'
      }
      if (value === 2) {
        return '未审核'
      }
    }
  }
}
</script>

<style lang="scss">
  .topic {
    .filter {
      background-color: #4e5b6b;
      padding: 2px 0 2px 5px;

      span {
        font-size: 14px;
        color: white;
      }
    }

    .topic_pop_body_box {
      border: 1px solid #BBDCF1;
      overflow-x: auto;

      td {
        padding: 5px 4px;
        border-bottom: 1px solid #BBDCF1;
      }

      .bg {
        width: 100px;
        font-size: 12px;
        color: #333333;
        background-color: #F0F8FF;
      }

      .image-slot {
        text-align: center;
        line-height: 1.5;
      }

      .title {
        font-size: 12px;
      }
    }

    .paging {
      margin-top: 10px;
    }

    .Action {
      text-align: center;
    }

    /* 重构element 隐藏局部滚动条 主题表格 */
    .xHeidden {
      overflow: hidden;
    }

    .el-table--scrollable-x {
      margin-bottom: -17px;

    }
  }

</style>

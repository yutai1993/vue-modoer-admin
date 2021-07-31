<template>
  <div class="topic">
    <div class="topic_pop">
      <div class="filter">
        <span>文章筛选</span>
      </div>
    </div>
    <div class="topic_pop_body_box">
      <table style="width: 100%">
        <tbody>
        <tr>
          <td class="bg">文章分类</td>
          <td>
            <el-select v-model="category1Active" size="mini" style="width: 100px;" placeholder="请选择">
              <el-option
                v-for="item in articleCategory1"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="category2Active" size="mini" style="width: 100px; margin-left: 5px" placeholder="请选择">
              <el-option
                v-for="item in filterCategory2"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </td>
          <td class="bg">所属城市</td>
          <td>
            <el-select v-model="regionActive" size="mini" placeholder="请选择">
              <el-option
                v-for="item in articleCity"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="bg">文章标题</td>
          <td>
            <div style="width: 200px">
              <el-input size="mini" v-model="keywordActive" placeholder="请输入内容"></el-input>
            </div>
          </td>
          <td class="bg">主题SID</td>
          <td>
            <div style="width: 200px">
              <el-input size="mini" v-model="reviewID" placeholder="请输入内容"></el-input>
            </div>
          </td>
        </tr>
        <tr>
          <td class="bg">作者</td>
          <td>
            <div style="width: 200px">
              <el-input size="mini" v-model="creator" placeholder="请输入内容"></el-input>
            </div>
          </td>
          <td class="bg">att(自定义属性)</td>
          <td>
            <div style="width: 200px;display: inline-block">
              <el-input size="mini" v-model="userAttributeActive" placeholder="请输入内容"></el-input>
            </div>
            <el-select style="width: 100px; margin-left: 5px" v-model="userAttributeActive" size="mini" placeholder="请选择">
              <el-option
                v-for="item in userAttribute"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="bg">发布时间</td>
          <td colspan="3">
            <el-date-picker
              size="mini"
              v-model="datePicker"
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
            <el-button size="mini" style="margin-left: 5px" type="">筛选</el-button>
            <el-button size="mini" type="">发布文章</el-button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="topic_pop" style="margin-top: 15px">
      <div class="filter">
        <span>文章管理</span>
      </div>
    </div>
    <div class="topic_pop_body_box xHeidden">
      <el-table
        :data="articleData.articleList"
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
          label="排序"
          width="80">
          <template slot-scope="scope">
            <el-input style="width: 50px" size="mini" v-model="scope.row.sort" />
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="名称/分类"
          width="200">
          <template slot-scope="scope">
            <div class="title">
              <p style="color: #2a6496;cursor: pointer"> <strong>{{scope.row.articleName}}</strong> </p>
              <p><span>{{scope.row.categoryActive1}}</span> &raquo; <span>{{scope.row.categoryActive2}}</span></p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="cityActive"
          label="城市"
          width="100">
        </el-table-column>
        <el-table-column
          prop="adminName"
          label="作者"
          width="100">
        </el-table-column>
        <el-table-column
          prop="pv"
          label="浏览"
          width="120">
        </el-table-column>
        <el-table-column
          prop="reviewNumber"
          label="评论"
          width="120">
        </el-table-column>
        <el-table-column
          prop="attributeActive"
          label="att"
          width="120">
        </el-table-column>
        <el-table-column
          prop="digg"
          label="digg"
          width="120">
        </el-table-column>
        <el-table-column
          prop="date"
          label="发布时间"
          width="120">
        </el-table-column>
        <el-table-column
          label="状态"
          width="120">
          <template slot-scope="scope">
            <span class="center">{{scope.row.status | filterStatus }}</span>
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
        :page-size.sync="articleData.pagesize"
        :page-count="articleData.total_pages"
        :current-page.sync="articleData.pagenum"
        :total="articleData.total"
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
  name: 'regulator',
  data () {
    return {

      filterCategory2: [], // 过滤后的分类2

      category1Active: '', // 主题分类1选中的
      category2Active: '', // 主题分类2选中的
      userAttributeActive: '', // 自定义属性
      regionActive: '', // 选中的所属地区
      datePicker: '', // 时间选择
      keywordActive: '', // 输入的关键字
      reviewID: '', // 输入的点评对象ID
      creator: '', // 主题创建者
      topicAdmin: '', // 主题管理员
      sortingActive: 1, // 选中的排序方式
      orderActive: 1, // 升序 | 降序

      multipleSelection: [], // 选中的文章对象数组

      // 主题搜索过滤
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

      pagesize: 20, // 选中的每页条数
      pagenum: 1 // 当前页

    }
  },

  watch: {

    // 过滤出 二级分类所需数据
    category1Active: {
      handler (v) {
        this.filterCategory2 = this.articleCategory2.filter(value => value.uid === v)
        this.category2Active = ''
      }
    },

    'articleData.pagenum' (v) {
      this.pagenum = v
    },
    'articleData.pagesize' (v) {
      this.pagesize = v
    }

  },

  computed: {
    ...mapState('tagsView', ['tags']),
    ...mapState('article', ['articleData', 'articleCategory1', 'articleCategory2', 'userAttribute', 'articleCity'])
  },

  mounted () {
    this.init()
  },

  methods: {

    init () {
      // 获取主题数据
      this.$store.dispatch('article/fetchArticleList', {
        pagesize: this.pagesize,
        pagenum: this.pagenum
      })
      // 获取自定义属性
      this.$store.dispatch('article/fetchuserAttribute')
      // 获取 一级分类
      this.$store.dispatch('article/fetchArticleCategory1')
      // 获取二级分类
      this.$store.dispatch('article/fetchArticleCategory2')
      // 获取城市
      this.$store.dispatch('article/fetchArticleCity')
    },

    // 当前页改变时触发
    currentChangeHandle () {
      this.$store.dispatch('article/fetchArticleList', {
        pagesize: this.pagesize,
        pagenum: this.pagenum
      })
    },

    // 修改 推荐度 浏览量
    changeHandle () {
      // 获取 每条数据的 id 推荐度 浏览量
      const { articleList } = this.articleData
      const arr = []
      for (let i = 0; i < articleList.length; i++) {
        const r = {}
        r.id = articleList[i].id
        r.sort = articleList[i].sort
        arr.push(r)
      }
      const params = {
        data: {
          arr
        },
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }
      this.$store.dispatch('article/putArticleList', params)
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
      this.$store.dispatch('article/deleteArticleList', params)
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
      const articleeditorIndex = this.tags.findIndex(value => value.name === 'articleeditor')
      const articleeditor = this.tags.find(value => value.name === 'articleeditor')
      /* 替换 tags 中 tag数据 */
      if (articleeditor && Object.keys(articleeditor.params).length) {
        articleeditor.params.id = row.id
        this.tags.splice(articleeditorIndex, 1, articleeditor)
      }
      this.$router.push(`/articles/articleeditor/${row.id}`)
    }
  },

  filters: {
    filterStatus (value) {
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

  .topic{
    .filter{
      background-color: #4e5b6b;
      padding: 2px 0 2px 5px ;
      span {
        font-size: 14px;
        color: white;
      }
    }

    .topic_pop_body_box{
      border: 1px solid #BBDCF1;
      overflow-x: auto;
      td{
        font-size: 12px;
        padding: 5px 4px;
        border-bottom: 1px solid #BBDCF1;
      }
      .bg{
        width: 100px;
        font-size: 12px;
        color: #333333;
        background-color: #F0F8FF;
      }

    }

    .paging{
      margin-top: 10px;
    }
    .Action{
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

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
            <el-select style="width: 100px" v-model="offsetActive" size="mini" placeholder="请选择">
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
        :data="filter.topicListData"
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
          prop="cover"
          label="封面"
          width="150">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题/分类/地区"
          width="120">
        </el-table-column>
        <el-table-column
          prop="adj"
          label="推荐度"
          width="120">
        </el-table-column>
        <el-table-column
          prop="views"
          label="浏览量"
          width="120">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="等级"
          width="120">
        </el-table-column>
        <el-table-column
          prop="review"
          label="点评"
          width="120">
        </el-table-column>
        <el-table-column
          prop="imgNumber"
          label="图片数量"
          width="120">
        </el-table-column>
        <el-table-column
          prop="msgNumber"
          label="留言量"
          width="120">
        </el-table-column>
        <el-table-column
          prop="date"
          label="2012-03-02"
          width="120">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="120">
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
        :total="1000">
      </el-pagination>
    </div>

    <!--操作按钮 -->
    <div class="Action">
      <el-button type="primary" size="small" >更新修改</el-button>
      <el-button type="primary" size="small" >删除所选</el-button>
    </div>
  </div>

</template>

<script>
  import { mapState } from  'vuex'
  export default {
    name: "topicPmp",
    data() {
      return {
        categoryActive: '', // 主题分类选中的
        regionActive: '', // 选中的所属地区
        keywordActive: '', // 输入的关键字
        reviewID: '', // 输入的点评对象ID
        creator: '', // 主题创建者
        topicAdmin: '', // 主题管理员
        sortingActive: 1, // 选中的排序方式
        orderActive: 1, // 升序 | 降序
        offsetActive: 10, // 选中的每页条数
        multipleSelection: [], // 选中的主题对象数组
        filter:{
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
            },{
              value: 2,
              label: '登记时间'
            },{
              value: 3,
              label: '推荐度'
            },
          ], // 排序方式
          order: [
            {
              value: 1,
              label: '递减'
            },{
              value: 2,
              label: '递增'
            }
          ], // 升序降序
          offset:  [
            {
              value: 10,
              label: '10条'
            },{
              value: 20,
              label: '20条'
            }
          ], // 每页条数
          topicListData: [
            {
              id: 1,
              cover: '封面',
              title: '标题/分类/地区',
              adj: '推荐度',
              views: '浏览量',
              grade: '等级',
              review: '点评',
              imgNumber: '图片数量',
              msgNumber: '留言量',
              date: '2012-03-02',
              status: '状态'
            },
            {
              id: 2,
              cover: '封面',
              title: '标题/分类/地区',
              adj: '推荐度',
              views: '浏览量',
              grade: '等级',
              review: '点评',
              imgNumber: '图片数量',
              msgNumber: '留言量',
              date: '2012-03-02',
              status: '状态'
            },
            {
              id: 3,
              cover: '封面',
              title: '标题/分类/地区',
              adj: '推荐度',
              views: '浏览量',
              grade: '等级',
              review: '点评',
              imgNumber: '图片数量',
              msgNumber: '留言量',
              date: '2012-03-02',
              status: '状态'
            },
            {
              id: 4,
              cover: '封面',
              title: '标题/分类/地区',
              adj: '推荐度',
              views: '浏览量',
              grade: '等级',
              review: '点评',
              imgNumber: '图片数量',
              msgNumber: '留言量',
              date: '2012-03-02',
              status: '状态'
            },

          ] // 主题数据
        }
      }
    },
    computed: {
      ...mapState('tagsView', ['tags'])
    },
    methods: {
      // 选中的
      handleSelectionChange(val){
        this.multipleSelection = val
      },

      // 查看
      handleClick(row) {
        console.log('查看ID',row.id);
      },
      // 编辑
      editorHandle(row) {
        console.log('编辑ID',row.id)
        let topiceditorIndex = this.tags.findIndex(value => value.name === 'topiceditor')
        let topiceditor = this.tags.find(value => value.name === 'topiceditor')
        /* 替换 tags 中 tag数据*/
        if(topiceditor && Object.keys(topiceditor.params).length){
          topiceditor.params.id = row.id
          this.tags.splice(topiceditorIndex, 1, topiceditor)
        }
        this.$router.push(`/topic/topicProject/topiceditor/${row.id}`);
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
    .xHeidden{
      overflow: hidden;
    }

    .el-table--border{
      margin-bottom: -17px;
    }
    .el-table--scrollable-x .el-table__body-wrapper{
      overflow: scroll;
    }
  }


</style>

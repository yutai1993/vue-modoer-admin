<template>
  <div class="article">
    <div class="topic_pop">
      <div class="filter">
        <span>添加文章</span>
      </div>
    </div>

    <div class="topic_pop_body_box">
      <table style="width: 100%">
        <tbody>
        <tr>
          <td class="bg">文章名称:</td>
          <td>
            <el-input size="mini" v-model="articleOptions.articleName" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">文章分类:</td>
          <td>
            <el-input size="mini" v-model="articleOptions.articleName" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">关联城市:</td>
          <td>
            <el-input size="mini" v-model="articleOptions.articleName" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">审核文章状态:</td>
          <td>
            <el-input size="mini" v-model="articleOptions.articleName" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">关闭文章评论:</td>
          <td>
            <el-input size="mini" v-model="articleOptions.articleName" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">自定义属性:</td>
          <td>
            <el-input size="mini" v-model="articleOptions.articleName" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">封面:</td>
          <td>
            <el-input size="mini" v-model="articleOptions.articleName" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">文章名称:</td>
          <td>
            <el-input size="mini" v-model="articleOptions.articleName" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">关联主题:</td>
          <td>
            <el-input size="mini" v-model="articleOptions.articleName" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">文章作者:</td>
          <td>
            <el-input size="mini" v-model="articleOptions.articleName" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">文章名称:</td>
          <td>
            <el-input size="mini" v-model="articleOptions.articleName" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">文章来源:</td>
          <td>
            <el-input size="mini" v-model="articleOptions.articleName" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">关键字:</td>
          <td>
            <el-input size="mini" v-model="articleOptions.articleName" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">发布时间:</td>
          <td>
            <el-input size="mini" v-model="articleOptions.articleName" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">文章简介:</td>
          <td>
            <el-input size="mini" v-model="articleOptions.articleName" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">文章内容:</td>
          <td>
            <el-input size="mini" v-model="articleOptions.articleName" placeholder="请输入内容" />
          </td>
        </tr>



        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "addArticle",
    data(){
      return {
        articleOptions:{
          articleName: '',
        }
      }
    }
  }
</script>

<style lang="scss">
  .article {

    .topic_pop {
      background-color: #4e5b6b;
      padding: 2px 0 2px 5px;

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
        text-align: right;
        background-color: #F0F8FF;
      }
    }
  }

</style>

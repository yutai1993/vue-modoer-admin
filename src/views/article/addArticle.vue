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
            <el-input style="width: 300px" size="mini" v-model="articleActive.articleName" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">文章分类:</td>
          <td>
            <el-select size="mini" style="width: 90px" v-model="articleActive.categoryActive1" placeholder="请选择">
              <el-option
                v-for="item in articleCategory1"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select size="mini" style="width: 150px; margin-left: 15px" v-model="articleActive.categoryActive2" placeholder="请选择">
              <el-option
                v-for="item in filterCategory2"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="bg">关联城市:</td>
          <td>
            <el-select size="mini" style="width: 90px; " v-model="articleActive.cityActive" placeholder="请选择">
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
          <td class="bg">审核文章状态:</td>
          <td>
            <el-radio-group v-model="articleActive.status">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td class="bg">关闭文章评论:</td>
          <td>
            <el-radio-group v-model="articleActive.evaluate">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td class="bg">自定义属性:</td>
          <td>
            <el-input size="mini" style="width: 100px" v-model="articleActive.attributeActive" placeholder="请输入内容" />
            <el-select size="mini" style="width: 200px; margin-left: 10px" v-model="articleActive.attributeActive" placeholder="请选择">
              <el-option
                v-for="item in userAttribute"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <p style="font-size: 12px; color: #999; margin-top: 2px" >由 0-255 数字组成，本功能可实现选择性得在前台展示</p>
          </td>
        </tr>
        <tr>
          <td class="bg">封面:</td>
          <td>
            <el-upload
              class="avatar-uploader"
              action="/api/uploadImage"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="articleActive.dialogImageUrl" :src="articleActive.dialogImageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </td>
        </tr>
        <tr>
          <td class="bg">关联主题:</td>
          <td>
            <el-input size="mini" style="width: 200px" v-model="articleActive.topicName" placeholder="请输入内容" />
            <el-button size="mini" type="" style="margin-left: 5px;" >搜索</el-button>
            <p style="margin-top: 2px; font-size: 12px; color: #999">搜索主题关键字，选择文章相关联的主题，可多选</p>
          </td>
        </tr>
        <tr>
          <td class="bg">文章作者:</td>
          <td>
            <el-input size="mini" style="width: 200px" v-model="articleActive.adminName" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">文章来源:</td>
          <td>
            <el-input size="mini" style="width: 200px" v-model="articleActive.source" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">关键字:</td>
          <td>
            <el-input size="mini" style="width: 400px" v-model="articleActive.keyword" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">发布时间:</td>
          <td>
            <el-input size="mini" style="width: 200px" v-model="articleActive.date" placeholder="请输入内容" />
            <span style="margin-top: 2px; margin-left: 5px; font-size: 12px; color: #999">新建时留空标签当前时间</span>
          </td>
        </tr>
        <tr>
          <td class="bg">文章简介:</td>
          <td>
            <el-input size="mini" style="width: 300px"  v-model="articleActive.intro" placeholder="请输入内容" />
          </td>
        </tr>
        <tr>
          <td class="bg">文章内容:</td>
          <td>
            <div style="padding: 0 5px 0 0; width: 100%;">
              <markdown ref="mar"/>
            </div>
          </td>
        </tr>

        </tbody>
      </table>
    </div>

    <div class="submit">
      <el-button size="mini" type="primary" @click="submitHandle">提交</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'addArticle',
  data () {
    return {
      // 过滤后的二级分类
      filterCategory2: [],

      // 选中的
      articleActive: {
        articleName: '',
        categoryActive1: '',
        categoryActive2: '',
        cityActive: '',
        status: 0,
        evaluate: 0,
        attributeActive: '', // 自定义属性
        dialogImageUrl: '', // 封面连接
        topicName: '',
        adminName: '',
        source: '',
        keyword: '',
        date: '',
        intro: '',
        content: ''

      }

    }
  },

  watch: {

    // 过滤出 二级分类所需数据
    'articleActive.categoryActive1': {
      handler (v) {
        this.filterCategory2 = this.articleCategory2.filter(value => value.uid === v)
        this.categoryActive2 = ''
      }
    }
  },

  computed: {

    ...mapState('article', ['articleCategory1', 'articleCategory2', 'articleCity', 'userAttribute'])

  },

  mounted () {
    this.init()
  },

  methods: {

    // 获取数据
    init () {
      // 获取一级分类
      this.$store.dispatch('article/fetchArticleCategory1')
      // 获取二级分类
      this.$store.dispatch('article/fetchArticleCategory2')
      // 获取城市
      this.$store.dispatch('article/fetchArticleCity')
      // 获取自定义属性
      this.$store.dispatch('article/fetchuserAttribute')
    },

    // 提交
    submitHandle () {
      const markdownHtml = this.$refs.mar.getHtml()
      const markdownText = this.$refs.mar.getMarkdown()
      console.log(markdownHtml)
      console.log(markdownText)
    },

    //  以下为上传 事件
    handleAvatarSuccess (res, file) {
      this.articleActive.dialogImageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }

  },

  filters: {

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

    .submit {
      text-align: center;
      margin: 10px 0;
    }

    /* 以下为封面 */
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    /* 结束 */
  }

</style>

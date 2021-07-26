<template>
  <div class="editor">
    <div class="topic_pop">
      <div class="filter">
        <span>编辑主题(点评对象)</span>
      </div>
    </div>

    <div class="topic_pop_body_box">
      <table style="width: 100%">
        <tbody>
        <tr>
          <td class="bg">主题分类:</td>
          <td>
            <el-select v-model="topic.c_topicCategory" size="mini" placeholder="请选择"
                       @change="topicCategoryChangeHandle">
              <el-option
                v-for="item in topicCategory1"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="bg">数据状态:</td>
          <td>
            <el-radio-group v-model="topic.c_dataStatus">
              <el-radio :label="0">回收站</el-radio>
              <el-radio :label="1">未审核</el-radio>
              <el-radio :label="2">已审核</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td class="bg">选择封面:</td>
          <td>
            <el-upload
              class="avatar-uploader"
              action="/api/uploadImage"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="topic.c_cover" :src="topic.c_cover" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </td>
        </tr>
        <tr>
          <td class="bg">主题等级:</td>
          <td>
            <el-select v-model="topic.c_grade" size="mini" placeholder="请选择"
            >
              <el-option
                v-for="item in Grade"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>

          </td>
        </tr>
        <tr>
          <td class="bg">主题风格:</td>
          <td>
            <el-select v-model="topic.c_topicStyle" size="mini" placeholder="请选择"
            >
              <el-option
                v-for="item in TopicStyle"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="bg">管理员:</td>
          <td>
            <el-input v-model="topic.c_topicAdmin" size="mini" placeholder="请输入内容"></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg">分类:</td>
          <td>
            <el-select v-model="topic.c_category" size="mini" placeholder="请选择">
              <el-option
                v-for="item in topicCategory2Middle"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="bg">名称:</td>
          <td>
            <el-input v-model="topic.c_topicName" size="mini" placeholder="请输入内容"></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg">子名称:</td>
          <td>
            <el-input v-model="topic.c_subclass" size="mini" placeholder="请输入内容"></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg">地图坐标:</td>
          <td>
            <el-input v-model="topic.c_map" size="mini" placeholder="请输入内容"></el-input>
            &nbsp;&nbsp;<el-button size="mini" @click="dialogFormVisibleHandle">选择地图坐标点</el-button>
          </td>
        </tr>
        <tr>
          <td class="bg">地区:</td>
          <td>
            <el-select v-model="topic.c_regional" size="mini" placeholder="请选择">
              <el-option
                v-for="item in topicCategory2Middle"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            &nbsp;&nbsp;<el-select v-model="topic.c_city" size="mini" placeholder="请选择">
            <el-option
              v-for="item in topicCategory2Middle"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          </td>
        </tr>
        <tr>
          <td class="bg">简介:</td>
          <td>
            <el-input v-model="topic.c_synopsis" size="mini" placeholder="请输入内容"></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg">地址:</td>
          <td>
            <el-input v-model="topic.c_site" size="mini" placeholder="请输入内容"></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg">营业状态:</td>
          <td>
            <el-radio-group v-model="topic.c_business">
              <el-radio :label="0">营业中</el-radio>
              <el-radio :label="1">未营业</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td class="bg">联系方式:</td>
          <td>
            <el-input v-model="topic.c_contact" size="mini"  placeholder="请输入内容"></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg">详细介绍:</td>
          <td>
            <TEditor v-model="topic.c_letter"></TEditor>
          </td>
        </tr>


        </tbody>
      </table>
    </div>

    <div class="submit">
      <el-button size="mini" type="primary">提交</el-button>
    </div>

    <!-- 弹出框 -->
    <el-dialog title="选择坐标" :visible.sync="dialogFormVisible">
      <el-input size="mini" v-model="mapKey" placeholder="请输入关键字" v-on:keyup.native.enter="mapSearchSubmit"/>
      <BMap ref="BMap1"></BMap>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addMapMarkerHandle">创建标记</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="getMapMarkerPositionHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { getTopicItem } from "../../../../api/topiceditor";
  import BMap from "../../../../components/BaiduMap/BMap";
  export default {
    name: "topiceditor",
    components: {BMap},
    data(){
      return {
        topic: {},
        topicCategory2Middle: [], //  和一级分类关联的二级分类
        mapKey: '',
        dialogFormVisible: false, // 弹窗
      }
    },
    mounted() {
      console.log("编辑的主题ID==="+ this.$route.params.id)
      this.fetchTopicItem(this.$route.params.id)
      this.initTopic()
    },

    computed: {
      ...mapState('addTopic', ['topicCategory1', 'topicCategory2', 'Grade', 'TopicStyle']),

    },

    methods:{
      async fetchTopicItem(id){
        let result = await getTopicItem(id)
        if (result.code === 200) {
          console.log(result)
          this.topic = result.data
        }
      },


      handleAvatarSuccess(res, file) {
        this.topic.c_cover = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      initTopic(){
        // 获取分类
        this.$store.dispatch('addTopic/fetchTopicCategory')
        // 获取主题等级
        this.$store.dispatch('addTopic/fetchTopicGrade')
        // 获取主题等级
        this.$store.dispatch('addTopic/fetchTopicStyle')
      },


      // 主题分类改变 过滤出二级分类
      topicCategoryChangeHandle(value){
        let v = this.topicCategory1.find(value1 => value1.id === value)
        if(v.topicCategory2Id){
          this.topicCategory2Middle = this.topicCategory2.filter((value1, index) => value1.uid === v.topicCategory2Id)

        }
      },


      /* 弹窗 */
      dialogFormVisibleHandle(){
        this.dialogFormVisible = true

      },

      // 获取标记坐标
      getMapMarkerPositionHandle(){
        let point = this.$refs['BMap1'].getMapMarkerPosition()
        this.topic.c_map = point.lng.toFixed(5).toString().concat(',', point.lat.toFixed(5).toString())
        this.dialogFormVisible = false
      },

      // 创建地图标记
      addMapMarkerHandle(){
        // 清空所有标记
        this.$refs['BMap1'].mapMarkerClear()
        // 创建标记
        this.$refs['BMap1'].addMapMarker(this.$refs['BMap1'].getMapCenter())
      },

      //关键字检索
      mapSearchSubmit(e){
        let { mapKey } = this;
        if (!mapKey) return;
        this.$refs['BMap1'].mapLocalSearch(mapKey)
      }


    },
  }
</script>

<style lang="scss">

  .editor{

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
      .el-input{
        width: 200px;
      }

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

    }

    .submit {
      text-align: center;
      margin: 10px 0;
    }

  }

</style>

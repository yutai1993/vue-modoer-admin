<template>
  <div class="addtopic">
    <div class="topic_pop">
      <div class="filter">
        <span>添加主题(点评对象)</span>
      </div>
    </div>

    <div class="topic_pop_body_box">
      <table style="width: 100%">
        <tbody>
        <tr>
          <td class="bg">主题分类:</td>
          <td>
            <el-select v-model="topicOptions.c_topicCategory" size="mini" placeholder="请选择"
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
            <el-radio-group v-model="topicOptions.c_dataStatus">
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
              action="/api/uploadImage"
              :limit="1"
              list-type="picture-card"
              :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
              </div>
            </el-upload>
          </td>
        </tr>
        <tr>
          <td class="bg">主题等级:</td>
          <td>
            <el-select v-model="topicOptions.c_grade" size="mini" placeholder="请选择"
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
            <el-select v-model="topicOptions.c_topicStyle" size="mini" placeholder="请选择"
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
            <el-input v-model="topicOptions.c_topicAdmin" size="mini" placeholder="请输入内容"></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg">分类:</td>
          <td>
            <el-select v-model="topicOptions.c_category" size="mini" placeholder="请选择">
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
            <el-input v-model="topicOptions.c_topicName" size="mini" placeholder="请输入内容"></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg">子名称:</td>
          <td>
            <el-input v-model="topicOptions.c_subclass" size="mini" placeholder="请输入内容"></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg">地图坐标:</td>
          <td>
            <el-input v-model="topicOptions.c_map" size="mini" placeholder="请输入内容"></el-input>
            &nbsp;&nbsp;<el-button size="mini" @click="dialogFormVisibleHandle">选择地图坐标点</el-button>
          </td>
        </tr>
        <tr>
          <td class="bg">地区:</td>
          <td>
            <el-select v-model="topicOptions.c_regional" size="mini" placeholder="请选择">
              <el-option
                v-for="item in topicCategory2Middle"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            &nbsp;&nbsp;<el-select v-model="topicOptions.c_city" size="mini" placeholder="请选择">
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
            <el-input v-model="topicOptions.c_synopsis" size="mini" placeholder="请输入内容"></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg">地址:</td>
          <td>
            <el-input v-model="topicOptions.c_site" size="mini" placeholder="请输入内容"></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg">营业状态:</td>
          <td>
            <el-radio-group v-model="topicOptions.c_business">
              <el-radio :label="0">营业中</el-radio>
              <el-radio :label="1">未营业</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td class="bg">联系方式:</td>
          <td>
            <el-input v-model="topicOptions.c_contact" size="mini"  placeholder="请输入内容"></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg">详细介绍:</td>
          <td>
            <TEditor v-model="topicOptions.c_letter"></TEditor>
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
      <BMap ref="BMap"></BMap>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addMapMarkerHandle">创建标记</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="getMapMarkerPositionHandle">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BMap from "../../../../components/BaiduMap/BMap";

  export default {
    name: "addtopic",
    components: {BMap},
    data() {
      return {
        dialogVisible: false, // 上传
        disabled: false, // 上传
        topicCategory2Middle: [], //  和一级分类关联的二级分类
        mapKey: '',
        // 主题字段
        topicOptions: {
          c_topicCategory: '',
          c_dataSuatus: '',
          c_cover: '', // 封面链接
          c_grade: '',
          c_topicStyle: '',
          c_topicAdmin: '', // 管理员
          c_category: '',
          c_topicName: '', // 名称
          c_subclass: '',
          c_map: '', // 地图坐标
          c_regional: '',
          c_city: '',
          c_synopsis: '',
          c_site: '',
          c_business: '',
          c_contact: '',
          c_letter: ' tinymce编辑器',  // 富文本
        },

        dialogFormVisible: false, // 弹窗

      }
    },
    mounted() {
      this.initTopic()
    },

    computed: {
      ...mapState('addTopic', ['topicCategory1', 'topicCategory2', 'Grade', 'TopicStyle']),

    },

    methods: {

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

      //  以下为上传 事件
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.topicOptions.c_cover = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      },

      /* 弹窗 */
      dialogFormVisibleHandle(){
        this.dialogFormVisible = true

      },

      // 获取标记坐标
      getMapMarkerPositionHandle(){
        let point = this.$refs['BMap'].getMapMarkerPosition()
        this.topicOptions.c_map = point.lng.toFixed(5).toString().concat(',', point.lat.toFixed(5).toString())
        this.dialogFormVisible = false
      },

      // 创建地图标记
      addMapMarkerHandle(){
        // 清空所有标记
        this.$refs['BMap'].mapMarkerClear()
        // 创建标记
        this.$refs['BMap'].addMapMarker(this.$refs['BMap'].getMapCenter())
      },

      //关键字检索
      mapSearchSubmit(e){
        let { mapKey } = this;
        if (!mapKey) return;
        this.$refs['BMap'].mapLocalSearch(mapKey)
      }

    },
    filters: {}
  }
</script>

<style lang="scss">


  .addtopic {
    /* 页头 */
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
    }

    .submit {
      text-align: center;
      margin: 10px 0;
    }


  }
</style>

<template>
  <div class="addtopic">
    <div class="topic_pop">
      <div class="filter">
        <span>添加主题(点评对象)</span>
      </div>
    </div>

    <div style="border: 1px solid #BBDCF1">
      <el-table
        :data="addTopicData"
        :show-header="false"
        style="width: 100%">
        <template slot="empty">
          <BaseLoading v-if="emptyText"/>
          <p v-else>暂无数据</p>
        </template>
        <el-table-column
          prop="name"
          align="right"
          class-name="bg"
          width="100">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <!-- 下拉选择 -->
            <template v-if="scope.row.flag === 'select'">
              <el-select style="width: 100px" size="mini" v-model="optionsActive[scope.row.fields]" placeholder="请选择">
                <el-option
                  v-for="item in scope.row.data"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
            </template>
            <!-- 单行文本 -->
            <template v-else-if="scope.row.flag === 'input'">
              <el-input style="width: 200px" size="mini" v-model="optionsActive[scope.row.fields]"
                        placeholder="请输入内容"></el-input>
            </template>
            <!-- 单选 -->
            <template v-else-if="scope.row.flag === 'radio'">
              <el-radio-group v-model="optionsActive[scope.row.fields]">
                <template v-for="v in scope.row.data">
                  <el-radio :label="v.id" :key="v.id">{{v.label}}</el-radio>
                </template>
              </el-radio-group>
            </template>
            <!--复选框-->
            <template v-else-if="scope.row.flag === 'checkbox'">
              <el-checkbox-group v-model="optionsActive[scope.row.fields]">
                <template v-for="item in scope.row.data">
                  <el-checkbox :label="item.id" :key="item.id">{{item.label}}</el-checkbox>
                </template>

              </el-checkbox-group>
            </template>
            <!-- 上传 -->
            <template v-else-if="scope.row.flag === 'upload'">
              <el-upload
                action="#"
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
            </template>
            <!-- 富文本编辑器 -->
            <template v-else-if="scope.row.flag === 'textarea'">
              <TEditor ref="editor" v-model="value" />
            </template>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <div class="submit">
      <el-button size="mini" type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
  import { unicode2Ch, ch2Unicdoe } from '@/utils/utils'
  import {mapState} from 'vuex'

  export default {
    name: "addtopic",
    data() {
      return {
        emptyText: true,
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        value: ''
      }
    },
    mounted() {
      this.$store.dispatch('addTopic/fetchAddTopicData')
      console.log(ch2Unicdoe('标题'))
    },

    computed: {
      ...mapState('addTopic', ['addTopicData', 'optionsActive']),

    },

    methods: {
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
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

    .bg {
      width: 100px;
      text-align: right;
      color: #333333;
      background-color: #F0F8FF;
    }

    .submit {
      text-align: center;
      margin: 10px 0;
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

    /*========================*/
    .el-table .cell {
      line-height: 1.5;
    }

    .el-table td {
      font-size: 12px;
      border-bottom: 1px solid #BBDCF1;
    }

    .el-radio__label, .el-radio__inner {
      width: 12px;
      height: 12px;
      font-size: 12px;
    }

    .el-checkbox__label {
      font-size: 12px;
    }

    .el-checkbox__inner {
      width: 12px;
      height: 12px;
    }

    .el-table td, .el-table th {
      padding: 6px 0;
    }

    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: transparent;
    }

    .el-table--enable-row-hover .el-table__body tr:hover .bg {
      background-color: #F0F8FF;
    }

  }
</style>

<template>
  <div class="modoer-moduleSetting" >
    <div class="moduleSetting-header">主题&nbsp;模块设置</div>
    <BaseLoading v-if="loadingShow"></BaseLoading>
    <template v-else>
      <div class="moduleSetting-header_border" >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" >
          <el-tab-pane label="功能设置" name="first">
            <table class="modoer-moduleSetting-body">
              <tbody>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">默认主分类:</strong>
                  <p>
                    在首页或未指名主分类的情况下，默认显示哪个分类的内容；没有可分类时，请再网站管理页面，增加点评主分类

                  </p>
                </td>
                <td class="moduleSetting-right">
                  <el-select v-model="firstOptions.value" size="small" placeholder="请选择">
                    <el-option
                      v-for="item in firstOptions.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">启用主题二/三级域名或个性目录:</strong>
                  <p>本功能只能在二级，三级域名中使用，不能在二级目录里使用；同时您的服务器需要多域名的绑定（或泛解析）；</p>
                </td>
                <td class="moduleSetting-right">
                  <el-radio-group v-model="firstOptions.radio">
                    <el-radio :label="0">关闭</el-radio>
                    <el-radio :label="1">主题二/三级域名</el-radio>
                    <el-radio :label="2">个性目录</el-radio>
                    <el-radio :label="3">二者都需要</el-radio>
                  </el-radio-group>
                  <div class="color">打开本功能后，请确定data/config.php文件里$_G['cookiedomain']的值为一级域名（不包括www)，例如modoer.com，否则会员登录会失败；启用个性目录需要开启目录形式的URL改写功能，同时要配置data/rewrite_pathinfo.inc文件，具体设置请到官网查看。</div>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <div class="moduleSetting-padLeft">
                    <strong style="display: block">主题二/三级域名基准:</strong>
                    <p>设置二/三级域名的基准域名，例如想实现shopname.abc.com的二级域名，则基准为abc.com，如果想实现三级域名shopname.shop.abc.com，则基准为shop.abc.com</p>
                  </div>

                </td>
                <td class="moduleSetting-right">
                  <el-input style="width: 200px" size="small" v-model="firstOptions.input" placeholder="请输入基准域名"></el-input>
                  <p class="color">本功能只在开启了主题二/三级域名有效，如果开启多城市二级域名功能，请关闭本功能</p>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <div class="moduleSetting-padLeft">
                    <strong style="display: block">主题二/三级域名/个性目录保留项:</strong>
                    <p>
                      可以设置一些预留的名称，以免自己在今后需要使用时候造成访问冲突等问题,多个请用逗号","分隔，系统会禁止使用模块标识名作为域名/个性目录名称。
                    </p>
                  </div>

                </td>
                <td class="moduleSetting-right">
                  <el-input style="width: 300px" size="small" v-model="firstOptions.input" placeholder="预留的名称"></el-input>
                </td>
              </tr>
              <tr style="border-top: 2px solid #E4E7ED">
                <td class="moduleSetting-left">
                  <strong style="display: block">主题风格销售的积分类型:</strong>
                  <p>设置购买主题风格的积分类型，积分类型在会员模块中设置</p>
                </td>
                <td class="moduleSetting-right">
                  <el-select v-model="firstOptions.value2" size="small" placeholder="请选择">
                    <el-option
                      v-for="item in firstOptions.options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <div class="moduleSetting-padLeft">
                    <strong style="display: block">主题风格购买使用期限:</strong>
                    <p>
                      设置主题风格的使用期限，默认为 180 天
                    </p>
                  </div>

                </td>
                <td class="moduleSetting-right">
                  <el-input style="width: 80px; margin-right: 4px" size="small" v-model="firstOptions.input1" placeholder="天数"></el-input>天
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">表单验证码:</strong>
                  <p>
                    开启验证码可减少广告机提交信息，但是也会让会员感到繁琐
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <p>发布主题
                    <el-radio-group v-model="firstOptions.audit1">
                      <el-radio :label="0">是</el-radio>
                      <el-radio :label="1">否</el-radio>
                    </el-radio-group>
                  </p>
                  <p>发布点评(会员):
                    <el-radio-group v-model="firstOptions.audit2">
                      <el-radio :label="0">是</el-radio>
                      <el-radio :label="1">否</el-radio>
                    </el-radio-group>
                  </p>
                  <p>发布点评(游客):
                    <el-radio-group v-model="firstOptions.audit3">
                      <el-radio :label="0">是</el-radio>
                      <el-radio :label="1">否</el-radio>
                    </el-radio-group>
                  </p>
                  <p>发布留言:
                    <el-radio-group v-model="firstOptions.audit4">
                      <el-radio :label="0">是</el-radio>
                      <el-radio :label="1">否</el-radio>
                    </el-radio-group>
                  </p>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">添加主题使用无刷新提交:</strong>
                  <p>
                    前台在添加主题，提交表单时，使用无刷新机制提交，防止传统提交出错后，表单内数据需要重新填写。
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-radio-group v-model="firstOptions.audit5">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                  </el-radio-group>
                </td>
              </tr>
              <tr style="border-top: 2px solid #E4E7ED">
                <td class="moduleSetting-left">
                  <strong style="display: block">启用批量上传图片:</strong>
                  <p>
                    打开批量上传后，会员可以一次性最多上传多张图片
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-radio-group v-model="firstOptions.audit6">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">批量上传图片限制:</strong>
                  <p>
                    一次提交最多上传多少张图片，至多20张，至少2张，默认5张
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-input style="width: 50px" size="small" v-model="firstOptions.input2" placeholder="请输入基准域名"></el-input>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">留言内容字数限制:</strong>
                  <p>
                    定义留言内容的字符限制
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-input style="width: 50px" size="small" v-model="firstOptions.mini" placeholder="请输入基准域名"></el-input>
                  一
                  <el-input style="width: 50px" size="small" v-model="firstOptions.max" placeholder="请输入基准域名"></el-input>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">审核回应内容:</strong>
                  <p>
                    开启审核功能后，未审核的信息将暂时不在前台显示和操作。
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-radio-group v-model="firstOptions.audit7">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">兼容空格标签分隔符:</strong>
                  <p>
                    兼容1.x中使用空格分类符号，开启后可以使用空格来实现分隔标签. 注意:空格会切断英文短语的标签。
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-radio-group v-model="firstOptions.audit8">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">关闭搜索独条结果的跳转功能</strong>
                  <p>
                    当使用搜索主题功能时，如遇到只有1条结果时，程序自动会跳转到该条主题内容页，如果设置关闭，程序将不再跳转。
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-radio-group v-model="firstOptions.audit9">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">开启相册评论功能:</strong>
                  <p>
                    游客在浏览主题相册内容时，可以对相册进行评论留言。
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-radio-group v-model="firstOptions.audit10">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">异步加载淘宝客数据:</strong>
                  <p>
                    淘宝客数据为即时通过淘宝客API获取，网络问题会延长整个页面的加载速度或页面加载失败，影响用户体验，打开本功能后，将在页面加载完毕后再加载淘宝客数据，建议打开此功能；本功能能仅在使用淘宝客功能后有效。
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-radio-group v-model="firstOptions.audit11">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">手机Web启用附近主题功能:</strong>
                  <p style="color: #FF6600">
                    本功能需要使用MySQL存储过程，如果您的MySQL账号权限不足（不能创建存储过程）会导致启用失败。
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-radio-group v-model="firstOptions.audit12">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">删除的主题进入主题回收站:</strong>
                  <p>
                    后台删除的主题，自动进入主题回收站，不开启本功能，则直接从数据库内删除。
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-radio-group v-model="firstOptions.audit13">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                  </el-radio-group>
                </td>
              </tr>

              </tbody>
            </table>
          </el-tab-pane>
          <el-tab-pane label="显示设置" name="second">
            <table class="modoer-moduleSetting-body">
              <tbody>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">主题图片缩略图尺寸:</strong>
                  <p>
                    上传点评对象的图片，限制缩略图的最大尺寸，格式为：宽 x 高；默认：200 x 150
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-input style="width: 80px" size="small" v-model="secondOptions.imgMini" placeholder="请输入基准域名"></el-input>
                  X
                  <el-input style="width: 80px" size="small" v-model="secondOptions.imgMax" placeholder="请输入基准域名"></el-input>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">视频播放器尺寸:</strong>
                  <p>
                    在商铺页面显示视频的尺寸，格式为：宽 x 高；默认：250 x 200
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-input style="width: 80px" size="small" v-model="secondOptions.playerMini" placeholder="请输入基准域名"></el-input>
                  X
                  <el-input style="width: 80px" size="small" v-model="secondOptions.playerMax" placeholder="请输入基准域名"></el-input>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">列表页显示主题量:</strong>
                  <p>
                    列表页，搜索页面中每页显示点评对象数量
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-input style="width: 80px" size="small" v-model="secondOptions.topicList" placeholder="请输入数量"></el-input>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">内容页面显示点评数:</strong>
                  <p>
                    内容页面中每页显示点评数目
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-input style="width: 80px" size="small" v-model="secondOptions.remarkList" placeholder="请输入数量"></el-input>
                </td>
              </tr>
              <tr style="border-top: 2px solid #E4E7ED">
                <td class="moduleSetting-left">
                  <strong style="display: block">内容页面显示最有用好差评:</strong>
                  <p>
                    在内容页里显示出用户鲜花最多的好差评信息
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-radio-group v-model="secondOptions.validRemark">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">分类排序:</strong>
                  <p>
                    调整分类排列顺序方式
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-radio-group v-model="secondOptions.rank">
                    <el-radio :label="0">按分类中的数量</el-radio>
                    <el-radio :label="1">按分类顺序</el-radio>
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">主题封面设置:</strong>
                  <p>
                    点评对象的封面显示
                  </p>
                </td>
                <td class="moduleSetting-right">
                  <el-select v-model="secondOptions.value" size="small" placeholder="请选择">
                    <el-option
                      v-for="item in secondOptions.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </td>
              </tr>
              <tr style="border-top: 2px solid #E4E7ED">
                <td class="moduleSetting-left">
                  <strong style="display: block">内容页显示缩略图:</strong>
                  <p>
                    在内容页面显示主题的缩略图列表
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-radio-group v-model="secondOptions.SlightlyList">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">内容页显示二维码图片:</strong>
                  <p>
                    在主题的内容显示一个二维码，内容为当前页面的URL地址；
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-radio-group v-model="secondOptions.showQr">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td class="moduleSetting-left">
                  <strong style="display: block">关闭内容页的数据统计功能:</strong>
                  <p>
                    在主题内容页面，会显示当前主题的具体一些统计信息，使用功能后将关闭显示统计信息
                  </p>

                </td>
                <td class="moduleSetting-right">
                  <el-radio-group v-model="secondOptions.showStatistics">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                  </el-radio-group>
                </td>
              </tr>

              </tbody>
            </table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="submit">
        <el-button type="primary" size="small" @click="handleSubmit">提交</el-button>
      </div>
    </template>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "moduleSetting",
    data() {
      return {
        activeName: 'first', /* 标签页默认选中 */
        loadingShow: false
      };
    },
    mounted(){
      this.getModuleSetting()
    },
    computed:{
      ...mapState('moduleSetting',['firstOptions', 'secondOptions'])
    },
    methods: {
      getModuleSetting(){
        if(Object.keys(this.firstOptions).length === 0){
          this.loadingShow = true
          this.$store.dispatch('moduleSetting/REQ_MODULESETTING').then(()=>{
            this.loadingShow = false

          })
        }


      },

      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSubmit(){
        let parameter = {};
        if (this.activeName === 'first') {
          parameter.type = 'first'
          parameter.data = this.firstOptions
        }else if (this.activeName === 'second') {
          parameter.type = 'second'
          parameter.data = this.secondOptions
        }
        this.$store.dispatch('moduleSetting/DELIVER_MODULE_SETTING', parameter).then((data)=>{
          this.$message.success('修改成功')

        })

      }
    }
  }
</script>

<style lang="scss">
  .modoer-moduleSetting{
    .moduleSetting-header{
      font-size: 14px;
      background: #4e5b6b;
      padding: 2px 0;
      color: white;
    }
    .moduleSetting-header_border{
      border: 1px solid #E4E7ED;
      border-top: 0;
      .el-tab-pane{
        overflow-x: auto;
      }
      .el-tabs__nav {
        border-left: none;
      }
      .el-tabs__header {
        margin: 0;
      }

      .modoer-moduleSetting-body{
        width: 100%;
        .color{
          color: #FF6600;
          margin-top: 5px;
        }
        .el-radio__inner{
          width: 12px;
          height: 12px;
        }
        .el-radio__label{
          font-size: 12px;
        }
        td{
          strong{
            font-size: 14px;
            margin-bottom: 2px;
          }
          width: 50%;
          font-size: 12px;
          padding: 5px;
          border-top: 1px solid #E4E7ED;
          .moduleSetting-padLeft{
            padding-left: 20px;
          }
          p{
            font-size: 12px;
          }
        }
        .moduleSetting-left{
          background-color: #f1f3f7;
          vertical-align: top;
          p{
            color: #999999;
          }

        }
        .moduleSetting-right{
          padding-left: 5px;
        }

      }
    }
    .submit{
      text-align: center;
      margin-top: 15px;
    }
  }

</style>

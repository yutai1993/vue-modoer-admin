<template>
  <div class="auditIndex">
      <div class="audit_header">
        <span>审核信息</span>
      </div>
      <div class="body_box">
        <div class="header_link">
          <router-link :to="{name: 'themeAudit'}" active-class="active">主题审核</router-link>
          <router-link :to="{name: 'imgAudit'}" active-class="active">图片审核</router-link>
          <router-link :to="{name: 'msgAudit'}" active-class="active">留言审核</router-link>
        </div>
          <component :is="AssemblyName" ></component>
      </div>
  </div>
</template>

<script>
import themeAudit from './themeAudit'
import imgAudit from './imgAudit'
import msgAudit from './msgAudit'
export default {
  name: 'auditIndex',
  components: { themeAudit, imgAudit, msgAudit },
  data () {
    return {
      AssemblyArray: ['themeAudit', 'imgAudit', 'msgAudit'],
      AssemblyName: ''
    }
  },
  watch: {
    $route: {
      handler (newV, oldV) {
        if (this.AssemblyArray.includes(newV.name)) {
          this.AssemblyName = newV.name
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
  .audit_header{
    background-color: #4e5b6b;
    color: white;
    font-size: 14px;
  }
  .body_box{
    border: 1px solid #ccc;
    border-top: 0;
    padding-bottom: 40px;

  }
  .header_link{
    line-height: 1.5;
    position: relative;
  }
  .header_link:after{
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: #cccccc;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -1;

  }
  .header_link > a{
    display: inline-block;
    height: 100%;
    padding: 2px 8px;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    color: #000;

    &.active{
      background-color: white;
      color: #34bfa3;
      border-bottom: 0;
      padding-bottom: 3px;
    }
  }

</style>

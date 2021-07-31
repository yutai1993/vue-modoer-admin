<template>
  <div id="editor"></div>
</template>

<script>
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
import '@toast-ui/editor/dist/i18n/zh-cn';

export default {
  name: "markdown",
  components: {},
  props: {
    editorOptions: {
      type: Object,
      default: () => {
        return {
          height: '600px',  // 高度
          initialEditType: 'wysiwyg', // 模式 markdown | wysiwyg
          previewStyle: 'vertical', // 预览样式模式  tab | vertical
          usageStatistics: false, // 禁止收集主机信息
          language: 'zh-CN',
          toolbarItems: [
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['table', 'image', 'link'],
            ['code', 'codeblock']]
        }
      }
    },
    initialValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null
    }
  },

  watch: {
    // 初始数据Markdown内部非响应式， Markdown初始完成后 值不可改变
    // 赋值必须在初始化之前完成，否则重新初始化
    initialValue(v){
        if (this.editor) {
          this.editor.destroy()
        }
      this.initEditor()
    }
  },
  mounted() {
    this.initEditor()
  },
  methods: {
    // 初始化
    initEditor() {
      this.editor = new Editor({
        el: document.querySelector('#editor'),
        ...this.editorOptions,
        initialValue: this.initialValue
      });

    },
    // 获取 纯文本
    getMarkdown() {
      return this.editor.getMarkdown()
    },

    // 获取HTML版内容
    getHtml() {
      return this.editor.getHTML()
    },

    // 销毁 editor
    destroy() {
      this.editor.destroy()
    }
  },

  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy()
    }
  }
}
</script>

<style lang="scss">

</style>

<template>
  <div class="M-Tabs">
    <span class="M-Tabs_left el-icon-arrow-left" @click="tagsNextHandle"></span>
    <span class="M-Tabs_right el-icon-arrow-right" @click="tagsPrevHandle"></span>
    <div class="M-Tabs_centre">
      <div class="M-Tabs_Container" ref="tagsContainer">
        <div class="M-Tabs_scrollItems" ref="tagScrollItems" :style="'transform: translateX('+tagScroll+')'">
          <el-tag
            v-for="(tag, index) in tags"
            :key="tag.name"
            closable
            :type="tag.type"
            :class="[{'active': tagActiveName === tag.name, 'affix': tag.affix}]"
            @click="toggleHandle(tag.name)"
            @close="handleClose(tag, index)"
            @contextmenu.prevent.native="openMenu(tag, index, $event)">
            {{tag.title}}
          </el-tag>
        </div>

      </div>
    </div>

    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag,selectedTagIndex)">关闭</li>
      <li @click="closeOthersTags(selectedTag,selectedTagIndex)">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "tagsView",
    props: {

    },
    data() {
      return {
        tagScroll: 0,
        left: 0,
        top: 0,
        visible: false,
        selectedTag: '',
        selectedTagIndex: 0,
      };
    },
    watch:{
      // 路由变化后添加tag
      $route(){
        this.addTagView()
        /* 保持最新的tag显示 */
        this.tagsNextHandle()
      },
      visible(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    },
    mounted(){
      /* 默认tag */
      this.$store.commit('tagsView/TAGDEFAULT')
      /* 刷新时创建选中的tag view */
      this.$store.commit('tagsView/ADDTAGVIEW', this.$route)

    },
    computed:{
      ...mapState('tagsView', ['tagActiveName', 'tags'])
    },

    methods:{

      tagsNextHandle(){
        let tagsContainerWidth = Math.ceil(this.$refs.tagsContainer.getBoundingClientRect().width)
        let tagsScrollItemsWidth = Math.ceil(this.$refs.tagScrollItems.getBoundingClientRect().width)
        let currentTagScroll = Math.abs(parseInt(this.tagScroll))
        if (tagsScrollItemsWidth < tagsContainerWidth) return;
        // 剩余路程
        let left =  tagsScrollItemsWidth - tagsContainerWidth - currentTagScroll;
        if (Math.floor(left) === 0) return
        let x = left > tagsContainerWidth * 2 ? (currentTagScroll + tagsContainerWidth): (tagsScrollItemsWidth - tagsContainerWidth)
        this.tagScroll = -x + 'px';
      },

      tagsPrevHandle(){
        let tagsContainerWidth = Math.ceil(this.$refs.tagsContainer.getBoundingClientRect().width)
        let tagsScrollItemsWidth = Math.ceil(this.$refs.tagScrollItems.getBoundingClientRect().width)
        let currentTagScroll = parseInt(this.tagScroll)
        if (tagsScrollItemsWidth < tagsContainerWidth) return;
        if (currentTagScroll ===0 ) return
        let x1 = (currentTagScroll + tagsContainerWidth) > 0 ? 0 : (currentTagScroll + tagsContainerWidth)
        this.tagScroll = currentTagScroll <  0  ? x1 + "px": 0 + 'px'
      },

      /* 切换 */
      toggleHandle(name){
        this.$store.commit('tagsView/TOGGLEVIEW', name)
        this.$router.push({name})
      },
      /* 删除 */
      handleClose(tag, index){
        let tagObj = {
          name: tag.name,
          index
        }
        this.$store.commit('tagsView/CLOSEVIEW', tagObj)
        /* 判断要删除的是不是选中是 tag */
        if (tag.name === this.tagActiveName){
          /* 跳转到最后一个 */
          this.$router.push({name:this.tags[this.tags.length-1].name})
          /* 切换选中状态 */
          this.$store.commit('tagsView/TOGGLEVIEW', this.tags[this.tags.length-1].name)
        }
      },
      /* 添加 */
      addTagView(){
        this.$store.commit('tagsView/ADDTAGVIEW', this.$route)
      },
      /* 右键 */
      openMenu(tag, index, e){
        const menuMinWidth = 105
        const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
        const offsetTop = this.$el.getBoundingClientRect().top
        const offsetWidth = this.$el.offsetWidth // container width
        const maxLeft = offsetWidth - menuMinWidth // left boundary
        const left = e.clientX - offsetLeft + 15 // 15: margin right

        if (left > maxLeft) {
          this.left = maxLeft
        } else {
          this.left = left
        }

        this.top = e.clientY - offsetTop
        this.visible = true
        this.selectedTag = tag
        this.selectedTagIndex = index

      },
      /* 关闭 */
      closeSelectedTag(selectedTag, selectedTagIndex){
        this.handleClose(selectedTag, selectedTagIndex)
      },
      /* 关闭其他 */
      closeOthersTags(selectedTag, selectedTagIndex){
        this.$store.commit('tagsView/CLOSEOTHERSTAGS', selectedTag)
        /* 如果当前右键的tag 非选中状态 改为选中*/
        if (selectedTag.name !== this.tagActiveName.name){
          /* 跳转 */
          this.$router.push({name:selectedTag.name})
          /* 切换选中状态 */
          this.$store.commit('tagsView/TOGGLEVIEW', selectedTag.name)
        }

      },
      /* 关闭所有 */
      closeAllTags(selectedTag){
        console.log('关闭所有')
        this.$store.commit('tagsView/CLOSEALLTAGS')
        if (this.tags[this.tags.length-1].affix){
          /* 跳转到最后一个 */
          this.$router.push({name:this.tags[this.tags.length-1].name})
          /* 切换选中状态 */
          this.$store.commit('tagsView/TOGGLEVIEW', this.tags[this.tags.length-1].name)
        }

      },
      /* 判断固订 */
      isAffix(selectedTag){
        return selectedTag.affix
      },
      closeMenu() {
        this.visible = false
      },
    }
  }
</script>

<style lang="scss">

  .M-Tabs {
    height: 40px;
    background-color: white;
    line-height: 38px;
    position: relative;

    .M-Tabs_left, .M-Tabs_right {
      height: 40px;
      float: left;
      color: #909399;
      font-size: 20px;
      border-right: 1px solid;
      border-color: #ccc;
      line-height: 40px;
    }

    .M-Tabs_right {
      float: right;
      border-right: 0;
      border-left: 1px solid;
    }

    .M-Tabs_centre {
      padding: 0 20px;

      .M-Tabs_Container {
        overflow: hidden;

        .M-Tabs_scrollItems{
          white-space: nowrap;
          display: inline-block;
          transition: all .3s;
          .el-tag{
            background-color: white;
            border: 1px solid #d8dce5;
            margin: 0 3px;
            cursor: pointer;
            color: #495060;
            .el-icon-close{
              color: #566480;

            }
            .el-icon-close:hover {
              color: white;
              background-color: #4e5b6b;

            }

            &.active{
              background-color: #42b983;
              color: white;
              &::before{
                content: '';
                width: 8px;
                height: 8px;
                display: inline-block;
                background-color: white;
                border-radius: 50%;
                margin-right: 2px;
              }

            }
            &.affix{
              i {
                display: none;
              }
            }
          }
        }
      }

    }
    /* 右键 */
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 3000;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      li {
        margin: 0;
        padding: 0 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>

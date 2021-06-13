<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    mounted() {
      let beginTime = 0; //开始时间
      let differTime = 0; //时间差
      window.onunload = function() {
        differTime = new Date().getTime() - beginTime;
        if (differTime <= 5) {
          localStorage.removeItem('token');
          localStorage.removeItem('userRouters');
        } else {
          console.log("这是刷新");
        }
      };

      window.onbeforeunload = function() {
        beginTime = new Date().getTime();
      };
    }
  }
</script>

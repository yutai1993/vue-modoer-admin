<template>
  <div id="container"></div>
</template>

<script>

  export default {
    name: "BMap",

    data() {
      return {
        map: null,
        marker: null,
      }
    },
    mounted() {
      this.loadJScript(); // 异步加载地图

    },
    methods: {

      loadJScript() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://api.map.baidu.com/getscript?v=3.0&ak=SjHsc0XdfGB1hXWtjC0WrmwVI4paPDey';
        script.onload = () => {
          this.init()
        }
        document.body.appendChild(script);
      },

      // 初始化地图
      init() {
        this.map = new BMap.Map("container", {
          coordsType: 5 // coordsType指定输入输出的坐标类型，3为gcj02坐标，5为bd0ll坐标，默认为5。
                        // 指定完成后API将以指定的坐标类型处理您传入的坐标
        });          // 创建地图实例
        var point = new BMap.Point(116.40400, 39.91500);  // 创建点坐标
        this.map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

      },

      // 关键字检索
      mapLocalSearch(keyString){
       let { map} = this;
       if (map) {
         var local = new BMap.LocalSearch(map, {
           renderOptions:{map: map}
         });
         local.search(keyString);
       }
      },

      // 判断地图是否初始化成功
      isMap(){
        let { map } = this;
        if (map){
          return true
        }else {
          return false
        }
      },

      // 清空地图上所有覆盖物
      mapMarkerClear(){
        let { map } = this;
        if (map) {
          return map.clearOverlays()
        }

      },

      // 获取所有覆盖物
      getOverlays(){
        let { map } = this;
        if (map) {
         return map.getOverlays()
        }
      },

      // 获取可拖拽标注对象的坐标对象
      getMapMarkerPosition(){
        let { marker} = this;
        if (marker) {
          return marker.getPosition()
        }
      },

      // 根据坐标对象创建可拖拽标注  传{lng: 116.404, lat: 39.915}
      addMapMarker(point){
        if (window.BMap) {
          this.marker = new BMap.Marker(point, {
            enableDragging: true
          });
          this.map.addOverlay(this.marker);
        }

      },

      // 获取地图中心点对象
      getMapCenter() {
        var cen = this.map.getCenter();
        return {
          lng: cen.lng.toFixed(5), // 左
          lat: cen.lat.toFixed(5)  // 右
        }
      },

      // 动图回归初始位置
      resetMap() {
        this.map.reset();
      }
    }
  }
</script>

<style>
  #container {
    width: 100%;
    height: 300px;
  }
</style>

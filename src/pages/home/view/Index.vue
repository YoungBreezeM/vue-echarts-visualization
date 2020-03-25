<template>
  <div class="index" :style="pageStyle">
    <el-container class="index-container">
      <!-- 侧边栏隐藏按钮 -->
      <i
        :class="classFlag?'el-icon-caret-left':'el-icon-caret-right'"
        @click="toggleAside"
        :style="btnStyle"
      ></i>
      <!-- 侧边栏 -->
      <el-aside :style="asideStyle">
        <IndexAside />
      </el-aside>
      <el-container class="container-right">
        <!-- 导航栏 -->
        <el-header class="right-nav">
          <IndexNav />
        </el-header>
        <!-- 主显示区域 -->
        <el-main class="right-main">
          <IndexMain :key="keys" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

let IndexAside = () => import("../../../components/common/IndexAside/IndexAside");
let IndexNav = () => import("../../../components/common/IndexNav/IndexNav");
let IndexMain = () => import("../../../components/common/IndexMain/IndexMain");
import "../css/index.scss"
export default {
  name: "index",
  components: {
    IndexAside,
    IndexNav,
    IndexMain
  },
  data() {
    return {
      //页面样式
      pageStyle: {
        width: "",
        height: ""
      },
      // 按钮样式
      btnStyle: {
        position: "absolute",
        "z-index": 100,
        "font-size": "23px",
        top: "50%",
        left: "10.5%"
      },
      // 侧边栏样式
      asideStyle: {
        width: "12%",
        height: "100%",
        "background-color": "#111739",
        display: "flex"
      },
      // 用途：判断加载哪个 icon 类
      classFlag: true,
      // 用途：显示/隐藏侧边栏，更改 keys 的值，来重新渲染页面
      keys: 0
    };
  },
  methods: {
    // 获取页面的可视宽高
    getClientHeight() {
      let clientWidth = document.documentElement
        ? document.documentElement.clientWidth
        : document.body.clientWidth;
      this.pageStyle.width = clientWidth + "px";
      let clientHeight = document.documentElement
        ? document.documentElement.clientHeight
        : document.body.clientHeight;
      this.pageStyle.height = clientHeight + "px";
    },
    // 切换侧边栏的显示与隐藏
    toggleAside() {
      if (this.asideStyle.display === "none") {
        this.asideStyle.display = "block";
        this.classFlag = true;
        this.btnStyle.left = "10.5%";
      } else {
        this.asideStyle.display = "none";
        this.classFlag = false;
        this.btnStyle.left = "1%";
      }
      ++this.keys; // key的值发生变化，能够重新渲染对应组件
    }
  },
  mounted() {
    this.getClientHeight();
    let pd_this = this;
    // 监听浏览器窗口的变化
    window.onresize = function() {
      pd_this.getClientHeight();
    };
  }
};
</script>

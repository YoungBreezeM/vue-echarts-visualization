<template>
  <div class="index-aside">
    <div class="aside-name">
      <h1>后台管理系统</h1>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      width="100%"
      :default-active="$route.path"
      router
      unique-opened
    >
      <div class="show">
        <i class="el-icon-monitor show-icon"></i>
        <a href="/graph" class="show-data">数据展示</a>
      </div>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-paperclip"></i>
          <span slot="title">后台管理</span>
        </template>
        <el-menu-item
          v-for="(item, i) in manageMenuList"
          :key="i"
          :index="item.route"
          >{{ item.name }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import comFunc from "../../../utils/comPublic";
import "./index-aside.scss"
export default {
  name: "index-aside",
  data() {
    return {
      manageMenuList: [ 
        { route: "/port", name: "数据导入、导出" },
        {route:"/user",   name:"用户管理"}
      ],

    };
  },
  mounted() {
    let nowPath = this.$route.path; // 获取当前路由地址
    let slashNum = comFunc.slashNum(nowPath); // 当前路由有几个 / ,用来判断是一级路由还是二级路由
    this.$store.commit("add_tabs", { route: "/home", name: "首页" }); // 默认首页是一定有的
    if (slashNum === 1) {
      // 刷新时判断当前路由是否已经加入 tab 数组中，若已经在数组中，则 切换 activeIndex
      let tabListFlag = false; // 用于设置 判断 点击路由在 tab 数组中是否已存在，默认不存在数组中
      for (let option of this.tabList) {
        // 在 tab 数组中已存在,更改 activeIndex
        if (option.name === this.$route.name) {
          tabListFlag = true;
          this.$store.commit("set_active_index", nowPath);
          break;
        }
      }
      if (!tabListFlag) {
        if (nowPath !== "/home") {
          // 判断当前路由是否是首页，如果不是，则将 当前路由 添加到 tab 数组中，并更改 activeIndex，如果是则改变其 activeIndex
          this.$store.commit("add_tabs", {
            route: nowPath,
            name: this.$route.name
          });
          this.$store.commit("set_active_index", nowPath);
        }
      }
    } else {
      // 二级路由更改 activeIndex 到对应的一级路由
      this.$store.commit("set_active_index", nowPath.slice(0, 5));
    }
  },
  computed: {
    tabList() {
      // 获取全局配置中 tabList
      return this.$store.state.tabList;
    }
  }
};
</script>



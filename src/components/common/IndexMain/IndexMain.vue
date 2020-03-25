<template>
  <div class="home-main">
    <el-tabs
      v-model="activeIndex"
      type="card"
      closable
      @tab-click="tabClick"
      v-if="tabList.length"
      @tab-remove="tabRemove"
    >
      <el-tab-pane
        v-for="(item,index) in tabList"
        :key="index"
        :label="item.name"
        :name="item.route"
      ></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
import comFunc from "../../../utils/comPublic";
import "./index-main.scss"
export default {
  name: "home-main",
  props: {
    keys: Number
  },
  methods: {
    // tab切换时，动态的切换路由
    tabClick() {
      let path = this.activeIndex;
      this.$router.push({ path: path });
    },
    // tab移除，除了首页不可删除，其余均可删除  targetName：目标路径
    tabRemove(targetName) {
      if (targetName == "/home") {
        this.$message.error("哎呀，手滑了！首页不可删除哟~");
        return;
      }
      this.$store.commit("delete_tabs", targetName); // 删除tab
      if (this.activeIndex.route === targetName) {
        // 如果删除的页面为选中状态，需要设置当前激活的路由
        this.$store.commit(
          "set_active_index",
          this.tabList[this.tabList.length - 1].route
        );
        this.$router.push({ path: this.activeIndex });
      }
    }
  },
  computed: {
    tabList() {
      return this.$store.state.tabList;
    },
    activeIndex: {
      get() {
        return this.$store.state.activeIndex;
      },
      set(val) {
        this.$store.commit("set_active_index", val);
      }
    }
  },
  watch: {
    // 监听路由变化
    $route(to) {
      let slashNum = comFunc.slashNum(to.path); // 当前路由有几个 / ,用来判断是一级路由还是二级路由
      // 如果是 第一路由 则要添加到 tab 中去
      if (slashNum == 1) {
        let routeFlag = false; // 判断点击路由在 tab 数组中是否已存在，默认不存在数组中
        // 遍历 tab 数组，判断 当前点击的路由是否在 tab 数组中已存在，若已存在则更改 activeIndex
        for (let option of this.tabList) {
          if (option.name === to.name) {
            routeFlag = true; // 在 tab 数组中已存在
            this.$store.commit("set_active_index", to.path); // 更改 activeIndex
            break;
          }
        }
        // 当前路由在 tab 数组中不存在
        if (!routeFlag) {
          // 将当前路由添加到 tab 数组中
          this.$store.commit("add_tabs", {
            route: to.path,
            name: to.name
          });
          this.$store.commit("set_active_index", to.path); // 更改 activeIndex
        }
      }
    }
  }
};
</script>


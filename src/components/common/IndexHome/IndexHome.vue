<template>
  <div class="index-home">
    <div class="page-container">
      <h1>欢迎使用后台管理系统</h1>
      <p>登录次数：18</p>
      <p>上次登录IP：222.35.131.79.1 上次登录时间：2019-6-14 11:19:55</p>
      <el-timeline> 
        <h3>待操作:</h3>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp"
        >{{activity.content}}</el-timeline-item>
      </el-timeline>
      <el-timeline> 
        <h3>未来计划操作:</h3>
        <el-timeline-item
          v-for="(activity, index) in activities2"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp"
        >{{activity.content}}</el-timeline-item>
      </el-timeline>
      <el-timeline>
        <h3>历史操作:</h3>
        <el-timeline-item
          v-for="(activity, index) in activities1"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp"
        >{{activity.content}}</el-timeline-item>
      </el-timeline>
      <el-table :data="tableData">
        <el-table-column label="服务器信息">
          <el-table-column prop="name" label="类别" width="400"></el-table-column>
          <el-table-column prop="data" label="参数"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <footer style="text-align: center;font-size: 14px;">
      <div>
        <p class="thanks-info">
          感谢Vue、Echarts、Element-ui、Vue-Route等技术支持
        </p>
        <p  class="thanks-info">Copyright &copy;2015-2017 H-ui.admin v3.1 All Rights Reserved.</p>
      </div>
    </footer>
  </div>
</template>
<script>
  import "./index-home.scss";
  import systemInfo from "../../../json/systemInfo";
export default {
  name: "index-home",
  data() {
    return systemInfo
  }
};
</script>

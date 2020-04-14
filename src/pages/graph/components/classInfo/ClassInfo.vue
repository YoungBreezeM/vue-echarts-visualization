<template>
  <div class="class-info" :style="{ height: clientHeight }">
    <div>
      <i class="el-icon-arrow-right"></i
      >
      <span class="chart-title">
        <span style="color:#4de2ff;font-size: 20px">{{ className }}</span>
        成员信息详情：
      </span>
    </div>
    <el-table
      :data="classInfo"
      border
      style="width: 100%"
      class="student-info"
      @row-click="getInfo"
      :cell-class-name="addClass"
    >
      <el-table-column prop="id" label="学号" width="150"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="150"> </el-table-column>
      <el-table-column prop="dormitoryNum" label="宿舍" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="tel" label="联系方式" show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import "./_classInfo.scss"
  import {getClassInfo} from "../../../../api/info";
export default {
  name: "class-info",
  data() {
    return {
      clientHeight: "100%",
      dormitoryNum: null,
      classInfo: [
      ]
    };
  },
  computed:{
    className(){
      return this.$route.params.className
    }
  },
  mounted() {
    this.setClient();
    this.loadingClassInfo();
  },
  methods: {
    loadingClassInfo(){
      getClassInfo(this.$route.params.className)
              .then(data=>{
                this.classInfo = data.object.classStuInfo;
              })
    },
    setClient() {
      let clientHeight = document.documentElement
        ? document.documentElement.clientHeight
        : document.body.clientHeight;
      this.clientHeight = clientHeight - 125 + "px";
    },
    getInfo(row, column) {
      if (column.property == "dormitoryNum") {
        this.$router.push({
          path: "/graph/dormitoryInfo/" + row[column.property]
        });
      }
    },
    addClass({columnIndex }) {
      if (columnIndex === 2) {
        return "click_enter";
      }
    }
  }
};
</script>


<template>
  <div class="uninput-student-table" :style="{ height: clientHeight }">
    <div>
      <i class="el-icon-arrow-right"></i
      ><span class="chart-title"
        >未录入的学生信息表：</span
      >
    </div>
    <el-table
      :data="studentTable"
      border
      style="width: 100%"
      class="student-table"
      @cell-click="getStudentInfo"
      :cell-class-name="addClass"
    >
      <el-table-column prop="num" label="学号" width="150"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="150"> </el-table-column>
      <el-table-column prop="dept" label="班级" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="time" label="未录入时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="dor" label="宿舍号" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import "./un-input-table.scss"
  import {unEnterMan} from "../../../../api/enter";
export default {
  name: "uninput-student-table",
  data() {
    return {
      grade: null,
      department: null,
      clientHeight: "100%",
      studentTable: []
    };
  },
  created() {
    this.grade = this.$route.params.grade;
    this.department = this.$route.params.department;
  },
  mounted() {
    this.setClient();
    this.loadingUnEnter();
  },
  methods: {
    loadingUnEnter(){
      unEnterMan().then(data=>{
        this.studentTable =data.object
      })
    },
    setClient() {
      let clientHeight = document.documentElement
        ? document.documentElement.clientHeight
        : document.body.clientHeight;
      this.clientHeight = clientHeight - 125 + "px";
    },
    getStudentInfo(row, column) {
      if (column.property === "dor") {
        this.$router.push({
          path: "/graph/dormitoryInfo/" + row[column.property]
        });
      } else if (column.property === "dept") {
        this.$router.push({
          path: "/graph/classInfo/" + row[column.property]
        });
      }
    },
    // eslint-disable-next-line no-unused-vars
    addClass({columnIndex }) {
      if (columnIndex === 2 || columnIndex === 4) {
        return "click_enter";
      }
    }
  }
};
</script>
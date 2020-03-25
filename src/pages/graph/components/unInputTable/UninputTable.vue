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
      <el-table-column prop="id" label="学号" width="150"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="150"> </el-table-column>
      <el-table-column prop="classNo" label="班级" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="isInputTime" label="未录入时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="dormitoryNum" label="宿舍号" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="instructor" label="辅导员" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="tel" label="联系方式" show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import "./un-input-table.scss"
export default {
  name: "uninput-student-table",
  data() {
    return {
      grade: null,
      department: null,
      clientHeight: "100%",
      studentTable: [
        {
          id: 171210111,
          name: "王小虎",
          classNo: "17学前一班",
          dormitoryNum: "3311",
          isInputTime:['早上,',"中午"],
          instructor: "李冰",
          tel: 13155443325
        },
        {
          id: 171210112,
          name: "王虎",
          classNo: "17学前一班",
          isInputTime:['早上,',"中午"],
          dormitoryNum: "3311",
          instructor: "李冰",
          tel: 13155443325
        },
        {
          id: 171210113,
          name: "小虎",
          classNo: "17学前一班",
          isInputTime:['早上,'],
          dormitoryNum: "3311",
          instructor: "李冰",
          tel: 13155443325
        }
      ]
    };
  },
  created() {
    this.grade = this.$route.params.grade;
    this.department = this.$route.params.department;
  },
  mounted() {
    this.setClient();
  },
  methods: {
    setClient() {
      let clientHeight = document.documentElement
        ? document.documentElement.clientHeight
        : document.body.clientHeight;
      this.clientHeight = clientHeight - 125 + "px";
    },
    getStudentInfo(row, column) {
      if (column.property == "dormitoryNum") {
        this.$router.push({
          path: "/graph/dormitoryInfo/" + row[column.property]
        });
      } else if (column.property == "instructor") {
        this.$router.push({
          path: "/graph/teacherInfo/"
        });
      } else if (column.property == "classNo") {
        this.$router.push({
          path: "/graph/classInfo/" + row[column.property]
        });
      }
    },
    // eslint-disable-next-line no-unused-vars
    addClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2 || columnIndex === 5 || columnIndex === 4) {
        return "click_enter";
      }
    }
  }
};
</script>
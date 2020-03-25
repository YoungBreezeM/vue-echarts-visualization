<template>
  <div class="today-temp-table">
    <div class="index-menu">
      <i class="el-icon-arrow-right"></i
      ><span class="chart-title">统计今日{{ role }}温度情况：</span>
      <el-cascader
        v-model="checkedVal"
        :options="allIndexs"
        size="small"
        class="cascader-style"
      ></el-cascader>
    </div>
    <el-table
      :data="tempNum"
      border
      style="width: 100%"
      class="studentInfo"
      @cell-click="getInfo"
      :cell-class-name="addClass"
    >
      <el-table-column prop="time" label="统计时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="unnormal" label="正常/人" width="80">
      </el-table-column>
      <el-table-column prop="normal" label="异常/人" width="80">
      </el-table-column>
      <el-table-column prop="all" label="总人数" width="80"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import "./today-Tem-Table.scss"
export default {
  name: "today-temp-table",
  data() {
    return {
      role: null,
      time: null,
      myChart: {},
      tempNum: [
        {
          time: "8:00",
          unnormal: 10,
          normal: 10,
          all: 20
        },
        {
          time: "14:00",
          unnormal: 10,
          normal: 10,
          all: 20
        },
        {
          time: "19:00",
          unnormal: 10,
          normal: 10,
          all: 20
        }
      ],
      allIndexs: [
        {
          label: "学生",
          value: 0
        },
        {
          label: "教师",
          value: 1
        }
      ],
      checkedVal: [0]
    };
  },
  created() {
    this.role = this.allIndexs[this.checkedVal[0]].label;
  },
  methods: {
    getDate() {
      let date = new Date();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let time = month + "-" + day;
      this.time = time;
    },
    getInfo() {
      this.getDate();
      let that = this;
      if (this.role == "学生") {
        this.$router.push({
          path: "/whole/tempStudentTable/" + that.time + "/" + this.role
        });
      } else if (this.role == "教师") {
        this.$router.push({
          path: "/whole/tempTeacherTable/" + that.time + "/" + this.role
        });
      }
    },
    // eslint-disable-next-line no-unused-vars
    addClass({columnIndex}){
      if(columnIndex===2){
        return 'click_enter'
      }
    }
  },
  watch: {
    checkedVal: {
      handler: function(val) {
        this.role = this.allIndexs[val[0]].label;
        console.log(val);
      }
    }
  }
};
</script>

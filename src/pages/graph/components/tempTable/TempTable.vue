<template>
    <div class="temp-table" :style="{ height: clientHeight }">
        <div>
            <i class="el-icon-arrow-right"></i
            >
             <span class="chart-title">
                <span style="color:#4de2ff;font-size: 20px">{{ date }}</span>
                 温度异常人员信息：
             </span>
        </div>
        <el-table
                :data="studentTable"
                border
                style="width: 100%"
                class="student-temp-info"
                @row-click="getStudentInfo"
                :cell-class-name="addClass"
        >
            <el-table-column prop="id" label="学号" width="140"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="sex" label="性别" width="120"></el-table-column>
            <el-table-column prop="temperature" label="体温/℃" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="emergencyName" label="紧急联系人姓名" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="emergencyPhone" label="紧急联系人手机号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="address" label="住址" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="className" label="班级" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="dormitoryNum" label="宿舍号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="outDoor" label="是否外出" show-overflow-tooltip></el-table-column>
            <el-table-column prop="tel" label="本人电话" show-overflow-tooltip>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import "./tempTable.scss"

    export default {
        name: "temp-table",
        data() {
            return {
                clientHeight: "100%",
                studentTable: [
                    {
                        id: 171210111,
                        temperature: "38.5",
                        name: "王小虎",
                        sex: "男",
                        emergencyName: "xxx",
                        emergencyPhone: 1524599999,
                        address: "上海市普陀区金沙江路 1518 弄",
                        className: "17学前一班",
                        dormitoryNum: 3331,
                        outDoor: "否",
                        tel: 13155443325
                    }
                ]
            };
        },
        computed:{
          date(){
            console.log(this.$route.params)
            return this.$route.params.date
          }
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
                if (column.property == "id") {
                    // this.$router.push({
                    //   path: "/whole/studentTempLine/" + row.name + "/" + this.role
                    // });
                } else if (column.property == "dormitoryNum") {
                    this.$router.push({
                        path: "/graph/dormitoryInfo/" + row[column.property]
                    });
                } else if (column.property == "className") {
                    this.$router.push({
                        path: "/graph/classInfo/" + row[column.property]
                    });
                }
            },
            // eslint-disable-next-line no-unused-vars
            addClass({row, column, rowIndex, columnIndex}) {
                if (columnIndex === 8 || columnIndex === 7) {
                    return 'click_enter'
                }
            }
        }
    };
</script>


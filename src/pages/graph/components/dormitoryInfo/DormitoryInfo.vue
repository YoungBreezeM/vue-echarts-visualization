<template>
    <div class="dormitory-info" :style="{ height: clientHeight }">
        <div>
            <i class="el-icon-arrow-right"></i
            >
              <span class="chart-title">
                <span style="color:#4de2ff;font-size: 20px">{{ dormitoryNum }}</span>
                   宿舍信息详情：
              </span>
        </div>
        <el-table
                :data="dormitoryInfo"
                border
                style="width: 100%"
                class="student-info"
        >
            <el-table-column prop="id" label="学号" width="150"></el-table-column>
            <el-table-column prop="name" label="姓名" width="150"></el-table-column>
            <el-table-column
                    prop="identity"
                    label="身份"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="tel" label="联系方式" show-overflow-tooltip>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import "./dormitory-info.scss"
    export default {
        name: "dormitory-info",
        data() {
            return {
                clientHeight: "100%",
                dormitoryInfo: [
                    {
                        id: 171210111,
                        name: "王小虎",
                        identity: "寝室长",
                        tel: 13155443325
                    }, {
                        id: 171210112,
                        name: "王小虎",
                        identity: "舍员",
                        tel: 13155443325
                    }, {
                        id: 171210113,
                        name: "王小虎",
                        identity: "舍员",
                        tel: 13155443325
                    }
                ]
            };
        },
        computed:{
          dormitoryNum(){
            return  this.$route.params.dormitoryNum;
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
            }
        }
    };
</script>


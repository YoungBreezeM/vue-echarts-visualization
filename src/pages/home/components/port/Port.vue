<template>
    <div class="port">
        <el-row >
            <el-button type="danger" icon="el-icon-delete" class="btn-port">批量删除</el-button>
        </el-row>
        <el-row>
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" class="btn-port">
                <el-button type="primary" icon="el-icon-upload">点击上传</el-button>
            </el-upload>
        </el-row>
        <el-row>
            <el-table :data="files" style="width: 100%;" border>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="ID" width="120">
                    <template slot-scope="scope">{{ scope.$index+1 }}</template>
                </el-table-column>
                <el-table-column prop="cycle" label="文件季度" width="120"></el-table-column>
                <el-table-column prop="describe" label="描述" show-overflow-tooltip></el-table-column>
                <el-table-column prop="user" label="执行人" show-overflow-tooltip></el-table-column>
                <el-table-column label="日期" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <i
                                class="el-icon-delete icon-control"
                                @click="delOperation(scope.$index,scope.row.name)"
                        ></i>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row style="margin: 40px 0 0 0 ">
            <el-col :offset="8">
                <el-pagination
                        :current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                </el-pagination>
            </el-col>
        </el-row>
        <footer style="text-align: center;font-size: 14px;">
            <div>
                <p class="thanks-info">
                    感谢Vue、Echarts、Element-ui、Vue-Route等技术支持
                </p>
                <p class="thanks-info">Copyright &copy;2015-2017 H-ui.admin v3.1 All Rights Reserved.</p>
            </div>
        </footer>
    </div>
</template>
<script>
    import "./port.scss";

    export default {
        name: "port",
        data() {
            return {
                files: [
                    {
                        cycle: "1703",
                        describe: "17年3月份河南省电网数据",
                        time: Date.now(),
                        user: "zs"
                    },
                    {
                        cycle: "1803",
                        describe: "18年3月份河南省电网数据",
                        time: Date.now(),
                        user: "admin"
                    }
                ],
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                delDialog: false,
                operationIndex: 0,
                operationName: ""
            };
        },
        methods: {
            delOperation(index, name) {
                this.operationIndex = index;
                this.operationName = name;
                this.delDialog = true;
            },
            delTable() {
                this.files.splice(this.operationIndex, 1);
                this.delDialog = false;
            }
        }
    };
</script>

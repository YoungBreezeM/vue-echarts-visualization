<template>
    <div class="port">
        <el-row>
            <h1>用户管理</h1>
        </el-row>
        <el-row>
            <el-col :span="4" style="margin: 0 0 30px 0">
                <el-input
                        placeholder="请输入内容"
                        v-model="content"
                        clearable
                        @keyup.enter.native="searchContent"
                >
                    <i class="el-icon-search el-input__icon" slot="suffix" @click="searchContent"></i>
                </el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="files" style="width: 100%;" border>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="id" width="120"></el-table-column>
                <el-table-column prop="num" label="学号 / 工号" width="120"></el-table-column>
                <el-table-column prop="userName" label="用户名" width="120"></el-table-column>
                <el-table-column prop="role" label="角色" width="120"></el-table-column>
                <el-table-column prop="employer" label="工作单位 / 班级" show-overflow-tooltip></el-table-column>
                <el-table-column prop="phone" label="联系方式" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="rowNode">
                        <i
                                class="el-icon-setting icon-control"
                                @click="updateDialog(rowNode)"
                        ></i>
                        <i
                                class="el-icon-delete icon-control"
                                @click="delOperation(rowNode)"
                        ></i>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row style="margin: 40px 0 0 0 ">
            <el-col :offset="8">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
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
        <el-dialog
                title="用户信息更新"
                :visible.sync="centerDialogVisible"
                width="70%"
                center>
            <el-row class="up-info">
                <el-col hidden>
                    <el-input v-model="updateContent.id"></el-input>
                </el-col>
                <el-col :span="6">
                    <span>学号:</span>
                    <el-input v-model="updateContent.num" readonly></el-input>
                </el-col>
            </el-row>
            <el-row class="up-info">
                <el-col :span="6">
                    <span>用户名：</span>
                    <el-input v-model="updateContent.userName"></el-input>
                </el-col>
            </el-row>
            <el-row class="up-info">
                <el-col :span="6">
                    <span>密码：</span>
                    <el-input v-model="updateContent.password"></el-input>
                </el-col>
            </el-row>
            <el-row class="up-info">
                <el-col :span="6">
                    <span>工作单位：</span>
                    <el-input v-model="updateContent.employer"></el-input>
                </el-col>
            </el-row>
            <el-row class="up-info">
                <el-col :span="6">
                    <span>联系方式：</span>
                    <el-input v-model="updateContent.phone"></el-input>
                </el-col>
            </el-row>
            <el-row class="up-info">
                <el-col :span="6">
                    <span>角色：</span>
                    <el-select v-model="updateContent.role" multiple>
                        <el-option
                                v-for="item in roleList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row class="up-info">
                <el-col :span="6">
                    <span>权限：</span>

                    <el-cascader
                            v-model="selected"
                            :options="permissions"
                            :props="{ multiple: true, checkStrictly: true}"
                    ></el-cascader>
                </el-col>
            </el-row>
        </el-dialog>
    </div>

</template>
<script>
    import user from "../../../../json/user/user";
    import userList from "../../../../json/user/userList";
    import roleList from "../../../../json/user/roleList";
    import "./user.scss"
    export default {
        name: "port",
        data() {
            return {
                selected:["1",["1","1-1"]],
                permissions:[
                    {
                        value: '1',
                        label: '计算机学院',
                        children: [
                            {
                                value: "1-1",
                                label: "17级"
                            },
                        ],
                    },
                    {
                        value:'2',
                        label:'陶瓷学院',
                        children:[
                            {
                                value:"2-1",
                                label:"17级"

                            }
                        ]
                    }
                ],
                centerDialogVisible: false,
                content: "",// 搜索框内容
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                updateContent: user,
                files: userList,
                delDialog: false,
                operationIndex: 0,
                operationName: "",
                roleList: roleList,
            };
        },
        methods: {
            delOperation(rowNode) {
                console.log(rowNode)
            },
            delTable() {
                this.files.splice(this.operationIndex, 1);
                this.delDialog = false;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            searchContent() {
                let input_val = this.content;
                if (input_val.trim() === "") {
                    this.$notify({
                        title: "错误",
                        message: "啊哦，你是不是忘记输入查询内容啦？",
                        type: "error"
                    });
                } else {
                    this.$notify({
                        title: "成功",
                        message: "您要查询的内容是--" + input_val + "--",
                        type: "success"
                    });
                }
            },
            updateDialog(rowNode) {
                this.centerDialogVisible = !this.centerDialogVisible;
                for (let i in this.updateContent) {
                    this.updateContent[i] = rowNode.row[i];
                }
                console.log(this.updateContent)
            }
        }
    };
</script>
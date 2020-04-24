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
                    <i class="el-icon-search el-input__icon" style="color:#111739" slot="suffix" @click="searchContent"></i>
                </el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="currentPage.data" style="width: 100%;" border>
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
                        :current-page="1"
                        :page-sizes="[10]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="currentPage.total">
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
                    <el-input v-model="updateContent.id" :disabled="true"></el-input>
                </el-col>
                <el-col>
                    <p>学号：</p>
                    <el-input v-model="updateContent.num"></el-input>
                </el-col>
            </el-row>
            <el-row class="up-info">
                <el-col>
                    <p>用户名：</p>
                    <el-input v-model="updateContent.userName"></el-input>
                </el-col>
            </el-row>
            <el-row class="up-info">
                <el-col >
                    <p>密码：</p>
                    <el-input v-model="updateContent.password"></el-input>
                </el-col>
            </el-row>
            <el-row class="up-info">
                <el-col >
                    <p>工作单位：</p>
                    <el-input v-model="updateContent.employer" ></el-input>
                </el-col>
            </el-row>
            <el-row class="up-info">
                <el-col >
                    <p>联系方式：</p>
                    <el-input v-model="updateContent.phone" ></el-input>
                </el-col>
            </el-row>
            <el-row class="up-info">
                <el-col >
                    <p>角色：</p>
                    <el-select v-model="updateContent.role">
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
                <el-col :span="4" :offset="11" >
                    <el-button type="success" @click="updateUserInfo">提交</el-button>
                </el-col>
            </el-row>
<!--            <el-row class="up-info">-->
<!--                <el-col :span="6">-->
<!--                    <span>权限：</span>-->

<!--                    <el-cascader-->
<!--                            v-model="selected"-->
<!--                            :options="permissions"-->
<!--                            :props="{ multiple: true, checkStrictly: true}"-->
<!--                    ></el-cascader>-->
<!--                </el-col>-->
<!--            </el-row>-->
        </el-dialog>
    </div>

</template>
<script>
    import user from "../../../../json/user/user";
    import userList from "../../../../json/user/userList";
    import roleList from "../../../../json/user/roleList";
    import "./user.scss"
    import {getUserList, getUser, getUserByNum, updateUser} from "../../../../api/user";
    export default {
        name: "port",
        data() {
            return {
                selected:["1",["1","1-1"]],
                centerDialogVisible: false,
                content: "",// 搜索框内容
                currentPage:{
                    total:null,
                    pageSize:10,
                    data:null,
                },
                updateContent: user,
                userList: null,
                delDialog: false,
                operationIndex: 0,
                operationName: "",
                roleList: roleList,
            };
        },
        created(){
            this.loadingUserList();
        },
        methods: {
            loadingUserList(id=1){
                getUserList(id)
                    .then(data=>{
                       this.currentPage.data = data.data.studentlist;
                       this.currentPage.total = data.data.countpage;
                    })
            },
            updateUserInfo(){
              updateUser(this.updateContent)
                  .then(data=>{
                      this.$notify({
                          title: "成功",
                          message: data.object,
                          type: "success"
                      });
                      this.centerDialogVisible = !this.centerDialogVisible;
                  })
            },
            delOperation(rowNode) {

                this.$message.warning({
                    showClose: true,
                    message: "数据不可删除"
                });
            },
            delTable() {
                this.files.splice(this.operationIndex, 1);
                this.delDialog = false;
            },
            handleSizeChange(val) {
                this.loadingUserList(val)
            },
            handleCurrentChange(val) {
                this.loadingUserList(val)
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
                    getUserByNum(input_val).then(data=>{
                       this.currentPage.data = [];
                       this.currentPage.data.push(data.object);
                        this.$notify({
                            title: "成功",
                            message: "您要查询的学号是" + input_val,
                            type: "success"
                        });
                    }).catch(err=>{
                        this.$notify({
                            title: "搜索失败",
                            message: "您要查询的学号" + input_val+"不合法",
                            type: "error"
                        });
                    });

                }
            },
            updateDialog(rowNode) {
                this.centerDialogVisible = !this.centerDialogVisible;
                let {id} = rowNode.row;
                console.log(id);
                getUser(id).then(data=>{
                    console.log(data)
                   this.updateContent = data.object;
                })
            }
        },
        watch:{
            content(params){
                if(params===""){
                    this.loadingUserList();
                }
            }
        }
    };
</script>
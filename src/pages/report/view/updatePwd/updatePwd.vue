<template>
    <div class="updatePwd">
        <div class="report-form">
            <h2 style="color:white;text-align:center">密码修改</h2>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="学号" prop="Num">
                    <el-input v-model="ruleForm.Num"></el-input>
                </el-form-item>
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input v-model="ruleForm.oldPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="ruleForm.newPassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import "./_updatePwd.scss"
    import {reportUpdatePwd} from "../../../../api/report";
    export default {
        data() {
            return {
                ruleForm: {
                    Num:"",
                    oldPassword: "",
                    newPassword: "",
                },
                rules: {
                    Num:  [
                        { required: true, message: '请输入学号', trigger: 'blur' },
                        { min: 9, max: 10, message: '请输入正确的学号', trigger: 'blur' }
                    ],
                    oldPassword: [
                        { required: true, message: '请输入旧密码', trigger: 'blur' }
                    ],
                    newPassword:[
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        reportUpdatePwd({
                            "oldPassword": this.ruleForm.oldPassword,
                            "newpassword": this.ruleForm.newPassword,
                            "num": this.ruleForm.Num,
                        }).then(data=>{
                            if(data.object){
                                alert(data.object)
                                window.location.href = "/report/login";
                            }
                            if(!data.object){
                                alert("密码修改失败")
                            }
                        }).catch(err=>{
                            alert("密码修改失败")
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    };
</script>

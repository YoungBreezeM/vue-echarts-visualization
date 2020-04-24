<template>
    <div class="home">
        <div class="report-form" >
            <h2 style="color:white;text-align:center" v-if="!status">信息报备</h2>
            <h2 style="color:green;text-align:center" v-if="status">该时间您已经报备</h2>
            <el-form v-if="!status" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="学号" prop="Num">
                    <el-input v-model="ruleForm.Num"></el-input>
                </el-form-item>
                <el-form-item label="今日温度" prop="tempNum">
                    <el-input-number v-model="ruleForm.tempNum" :precision="1" :step="0.1" :max="41"></el-input-number>
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
    import "./_home.scss"
    import {reportTemp} from "../../../../api/report";
    import types from "../../../../store/types";
    import store from "../../../../store/store.js";
    export default {
        data() {
            return {
                status:false,
                ruleForm: {
                    name: "",
                    tempNum:1.0,
                    Num:"",
                    temSection: 1
                },
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    Num:  [
                        { required: true, message: '请输入学号', trigger: 'blur' },
                        { min: 9, max: 10, message: '请输入正确的学号', trigger: 'blur' }
                    ],
                    tempNum: [
                        { required: true, message: '请输入温度', trigger: 'blur' },
                        {
                            validator (rule, value, callback) {
                                if (Number(value) && Number(value) > 0) {
                                    callback()
                                } else {
                                    callback(new Error('请输入正确温度'))
                                }
                            },
                            trigger: 'blur'
                        }

                    ]
                }
            };
        },
        mounted(){
          this.initSelectTime();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        reportTemp({
                            "name": this.ruleForm.name,
                            "num": this.ruleForm.Num,
                            "tempture":this.ruleForm.tempNum,
                            "temSection": this.ruleForm.temSection
                        }).then(data=>{
                            if(!data.object){
                                this.status = !this.status;
                            }else {
                                store.commit(types.LOGOUT);
                                alert("报备成功");
                                window.location.href = "/report/login";

                            }

                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            initSelectTime(){
                let date = new Date();
                let hours = date.getHours();
                if(hours>=0&&hours<12){
                    this.ruleForm.temSection = 0;
                }else if(hours>=12&&hours<14){
                    this.ruleForm.temSection = 1;
                }else {
                    this.ruleForm.temSection = 2;
                }

            }
        }
    };
</script>

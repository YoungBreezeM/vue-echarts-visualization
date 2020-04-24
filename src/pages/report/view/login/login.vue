<template>
    <div class="login">
        <div class="login-form">
            <h2 class="title">报备登录</h2>
            <p class="login-input">
                <el-input placeholder="请输入用户名"
                          prefix-icon="el-icon-user"
                          v-model="username"

                >
                </el-input>
            </p>
            <p class="login-input">
                <el-input placeholder="请输入密码"
                          v-model="password"
                          prefix-icon="el-icon-unlock"
                          show-password>
                </el-input>
            </p>
            <p class="login-input">
                <a href="/report/setPassword">修改密码</a>
            </p>
            <p class="login-input">
                <el-button type="success" @click="login">
                    登录
                </el-button>
            </p>

        </div>

    </div>
</template>

<script>
    import "./_login.scss"
    import types from "../../../../store/types";
    import store from "../../../../store/store.js";

    import {reportLogin} from "../../../../api/report";
    export default {
        name: "login",
        data() {
            return {
                username: '',
                password: '',
                msg:{
                    100:"密码错误"
                }
            }
        },
        mounted(){
            this.checkMsg();
        },
        methods: {
            checkMsg(){
                let msg = this.getQueryString("msg");

                if(this.msg[msg]){
                    alert(this.msg[msg])
                }
            },
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },
            login(){
                reportLogin({
                    userName: this.username,
                    password: this.password
                }).then(data=>{
                    if(data.data.token){
                        store.commit(types.LOGIN, data.data.token);
                        store.commit(types.USER,data.object.role);
                        alert("登录成功");
                        this.$router.push({path:"/report"})
                    }
                });

            }
        },
    };
</script>

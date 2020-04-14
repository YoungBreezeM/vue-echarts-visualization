<template>
    <div class="index-nav">
        <el-row>
            <el-col :span="2">
                <el-button icon="el-icon-s-fold" style="padding: 5px;font-size: 20px" v-if="!isHide" @click="hideNav"></el-button>
                <el-button icon="el-icon-s-unfold" style="padding: 5px;font-size: 20px" v-if="isHide" @click="hideNav"></el-button>
            </el-col>
            <el-col :span="2.5" :offset="20">
                <el-dropdown>
                      <span class="el-dropdown-link">
                        <i class="el-icon-user" style="font-size: 1.5em"></i>
                        <span class="nav-user">{{userName}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item command="a">
                            <i class="el-icon-postcard"></i>个人信息
                        </el-dropdown-item>
                        <el-dropdown-item command="b">
                            <i class="el-icon-setting"></i>设置
                        </el-dropdown-item>
                        <el-dropdown-item command="c"  @click.native="logOut">
                            <i class="el-icon-switch-button"  ></i>退出
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import types from "../../../store/types";
    import store from "../../../store/store.js";
    import "./index-nav.scss";

    export default {
        name: "index-nav",
        data() {
            return {
                userName: "admin",
                content: "" ,// 搜索框内容
                isHide:false
            };
        },
        methods: {
            logOut() {
                store.commit(types.LOGOUT);
                window.location.href = "login.html";
            },
            hideNav(){
                this.isHide = !this.isHide;
                this.$emit("isHideNav",this.isHide)
            }
        }
    };
</script>
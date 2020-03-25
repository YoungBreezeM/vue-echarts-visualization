<template>
    <div class="index-nav">
        <el-row type="flex" justify="end" class="nav-row">
            <el-col :span="2.5">
                <!-- 个人中心，包含下拉框内容 -->
                <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-user" style="font-size: 1.5em"></i>
            <span class="nav-user">{{userName}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">
                            <i class="el-icon-postcard"></i>个人信息
                        </el-dropdown-item>
                        <el-dropdown-item command="b">
                            <i class="el-icon-setting"></i>设置
                        </el-dropdown-item>
                        <el-dropdown-item command="c">
                            <i class="el-icon-switch-button"></i>退出
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
                content: "" // 搜索框内容
            };
        },
        methods: {
            logOut() {
              alert("hello");
              store.commit(types.LOGOUT);
              window.location.href = "/login";
            }
        }
    };
</script>
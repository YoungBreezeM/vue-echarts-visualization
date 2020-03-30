<template>
  <transition appear>
      <div class="login-form">
        <h1 class="title">登录</h1>
        <form>
          <p class="input-info">
            <el-input      placeholder="请输入用户名"
                           prefix-icon="el-icon-user"
                           v-model="userName"

            >
            </el-input>
          <p class="input-info">
            <el-input placeholder="请输入密码"
                      v-model="password"
                      prefix-icon="el-icon-unlock"
                      show-password>
            </el-input>
          </p>
          <p class="input-info">
            <el-button plain class="login-style" @click="login">登录</el-button>
          </p>
        </form>
      </div>
  </transition>
</template>
<script>
import types from "../../../store/types.js";
import store from "../../../store/store.js";
import userList from "../../../json/user/userList";
export default {
  data() {
    return {
      userName:"",
      password:"",
    };
  },
  methods: {
    login: function() {
      this.checkInfo(this.userName,this.password)
    },
    checkInfo(userName,password){
      let status = false;
      for (let i=0;i<userList.length;i++){
        if(userList[i].userName===userName&&userList[i].password===password){
          console.log(userList[i])
          store.commit(types.LOGIN,JSON.stringify(userList[i]));
          status = true;
          alert("登录成功");
          this.resolveRole(userList[i].role);
          break;
        }
      }
      if(!status){
        alert("密码错误")
      }
    },
    resolveRole(roleList){
      console.log(roleList)
      for (let i=0;i<roleList.length;i++){
        if(roleList[i]==="admin"){
          window.location.href = "/home";
          break;
        }
        if(roleList[i]==="user"){
          window.location.href = "/whole/message";
          break;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  width: 30%;
  height: 40%;
  position: absolute;
  top: 30%;
  left: 35%;
  z-index: 9999;
  background: url("../../../assets/images/loginBox.png");
  background-size: 100% 100%;

  .title{
    text-align: center;
    color: #23f2ff;
  }
  form{
    width: 100%;
    height: 75%;
    .input-info{
      width: 60%;
      margin: 50px auto 20px auto;
      .login-style{
        width: 100%;
        color: #23f2ff;
        background: #0b0f2a;
        border: 1px solid #23f2ff;
      }
      .login-style:hover{
        border: 1px solid #443bff;
      }

    }
  }

}
</style>

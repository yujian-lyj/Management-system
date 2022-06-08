<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/img/admin.jpg" alt />
      </div>
      <div>
          <el-form label-width="80px" class="login_form" :model="form" :rules="rules" ref="form">
              <el-form-item label="帐号" prop="username">
                <el-input v-model="form.username"
                autocomplete='off'
                placeholder="请输入帐号"
                prefix-icon="el-icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password"
                 autocomplete="off"
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                show-password
                ></el-input>
              </el-form-item>
              <el-form-item class="btns_box">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="reset">重置</el-button>
              </el-form-item>
          </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { message } from "element-ui";
export default {
    data(){
        return{
            form:{
                account:"",
                pwd:"",
                username: "admin",
                password: "123456",
            },
             rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      user: "",
        }
    },
    methods:{
    login() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$axios({
            methods: "post",
            url: "./login.json",
          }).then((res) => {
            this.user = res.data;
            for (let i = 0; i < this.user.list.length; i++) {
              if (
                this.form.username == this.user.list[i].username &&
                this.form.password == this.user.list[i].password
              ) {
                window.sessionStorage.setItem("token", this.user.list[i].token);
                window.sessionStorage.setItem("img", this.user.list[i].img);
                this.$message({
                  message: "登录成功",
                  type: "success",
                });
                setTimeout(() => {
                  this.$router.replace("/wellcome");
                }, 1000);
                return false;
              } else {
                if (window.sessionStorage.getItem("token")) {
                  return this.$message.error("账号或密码输入错误！");
                }
                // return this.$message.error("账号或密码输入错误！");
              }
            }
          });
        }
      });
    },
    reset(){
        this.form.username = '';
        this.form.password = ''
    }
    },
    mounted(){

    },
};
</script>

<style lang="less">
.login_container {
//   background-color: #2b4b6b;
  height: 100%;
  width: 100%;
  background: url('../assets/img/1.jpg') no-repeat 0px 0px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border-width: 5px;
    border-radius: 50%;
    padding:12px;
    box-shadow: 0 0 20px #ddd;
    position: absolute;
    left:50%;
    transform: translate(-50%,-60%);
    img {
      border-radius: 50%;
      background-color: #eee;
      width: 100%;
      height: 100%;
    }
  }
  .login_form{
      position:absolute;
      bottom:0;
      width:100%;
      padding:0 20px;
      box-sizing: border-box;
  }
  .btns_box{
      display: flex;
      justify-content: flex-end;

  }
}
</style>

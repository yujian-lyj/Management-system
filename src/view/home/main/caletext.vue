
<template>
    <div>
      <el-row :gutter="20" style="margin-top:10px;">
        <el-col :span="8">
            <div class="grid-content bg-purple">
                 <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>个人中心</span>
        </div>
          <div class="name-role">
          <span class="sender">Admin - {{infos.username}}</span>
        </div>
        <div class="registe-info">
          <span class="registe-info">
            注册时间：
            <li class="fa fa-clock-o"></li>
             {{infos.time}}
          </span>
        </div>
        <el-divider></el-divider>
        <div class="personal-relation">
        <div class="relation-item">手机号:  <div style="float: right; padding-right:20px;">{{infos.phone}}</div></div>
    </div>
    <div class="personal-relation">
      <div class="relation-item">所属企业:  <div style="float: right; padding-right:20px;">{{infos.companies}}</div></div>
    </div>
       <div class="personal-relation">
      <div class="relation-item">首页链接:  <div style="float: right; padding-right:20px;">{{infos.link}}</div></div>
    </div>
      </el-card>
        </div>
        </el-col>
    <el-col :span="16">
        <div class="grid-content bg-purple">
       <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本资料</span>
        </div>
        <div>
          <el-form label-width="80px" v-model="infos" size="small" label-position="right">
        <el-form-item label="用户昵称" prop="username">
          <el-input  auto-complete="off" v-model="infos.username"></el-input>
        </el-form-item>
         <el-form-item label="用户密码" prop="password">
          <el-input  auto-complete="off" v-model="infos.password"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input auto-complete="off" v-model="infos.sex"></el-input>
        </el-form-item>
         <el-form-item label="手机号" prop="phone">
          <el-input auto-complete="off" v-model="infos.phone"></el-input>
        </el-form-item>
         <el-form-item label="个性签名" prop="signature">
          <el-input auto-complete="off" v-model="infos.signature"></el-input>
        </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="submit">提交</el-button>
          <el-button size="mini" type="warning" >重置</el-button>
        </div>
        </div>
      </el-card>
        </div>
        </el-col>

      </el-row>
    </div>
</template>

<script>

export default {
    name:'caletext',
  data(){
    return{
      infos:{}
    };
  },
  mounted(){
      this.getdata()
  },
  methods:{
      getdata(){
          this.$axios({
              method: "get",
              // url: "./login.json",
              url: "http://127.0.0.1:3000/selectuserinfo",
          }).then(res=>{
              let id= res.data[0].id;
              this.infos = res.data[id-1];

          })
      },
      submit(){
          this.$axios({
              method: "post",
              url: "http://127.0.0.1:3000/updateuserinfo",
              data:this.infos
          }).then(res=>{
             this.$message({
            type: "success",
            message: "修改成功!",
          });
          })
      }
  }
}
</script>

<style  scoped>

 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }

  .name-role {
    font-size: 16px;
    padding: 5px;
   text-align:center;
  }
   .sender{
      text-align:center;
    }
.registe-info{
  text-align: center;
  padding-top:10px;
}
.personal-relation {
  font-size: 16px;
  padding: 0px 5px 15px;
  margin-right: 1px;
    width: 100%
}

.relation-item {
  padding: 12px;

}
.dialog-footer{
  padding-top:10px ;
  padding-left: 10%;
}

  .el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

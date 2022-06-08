<template>
  <div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        width: 100%;
      "
    >
      <div>
        <el-input
          prefix-icon="el-icon-search"
          placeholder="请输入员工名进行搜索..."
          size="small"
          style="width: 300px; margin-right: 7px"
          v-model="FindName"
          @keydown.enter.native="findPer"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" size="small" @click="findPer"
          >搜索</el-button
        >

      </div>
      <div>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="dialog = true"
          >添加员工</el-button
        >
        <el-drawer
             title="添加用户!"
             :before-close="handleClose"
             :visible.sync="dialog"
             direction="ltr"
             custom-class="demo-drawer"
             ref="drawer"
        >
  <div class="demo-drawer__content">
    <el-form :model="form" :rules="rules">
      <el-form-item label="日期" :label-width="formLabelWidth">
        <el-input v-model="this.form.dates" autocomplete="off"></el-input>
      </el-form-item>
           <el-form-item label="姓名" :label-width="formLabelWidth"  prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
           <el-form-item label="年龄" :label-width="formLabelWidth">
        <el-input v-model="form.age" autocomplete="off"></el-input>
      </el-form-item>
           <el-form-item label="性别" :label-width="formLabelWidth">
        <el-input v-model="form.sex" autocomplete="off"></el-input>
      </el-form-item>
           <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
           <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
           <el-form-item label="民族" :label-width="formLabelWidth">
        <el-input v-model="form.nation" autocomplete="off"></el-input>
      </el-form-item>
           <!-- <el-form-item label="政治面貌" :label-width="formLabelWidth">
        <el-input v-model="form.Political" autocomplete="off"></el-input>
      </el-form-item> -->
           <el-form-item label="生日" :label-width="formLabelWidth">
        <el-input v-model="form.birthday" autocomplete="off"></el-input>
      </el-form-item>
           <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
           <!-- <el-form-item label="身份证号" :label-width="formLabelWidth">
        <el-input v-model="form.idCard" autocomplete="off"></el-input>
      </el-form-item> -->
           <el-form-item label="学校" :label-width="formLabelWidth">
        <el-input v-model="form.school" autocomplete="off"></el-input>
      </el-form-item>
           <!-- <el-form-item label="学历" :label-width="formLabelWidth">
        <el-input v-model="form.tiptopDegree" autocomplete="off"></el-input>
      </el-form-item> -->
           <el-form-item label="婚姻状况" :label-width="formLabelWidth">
        <el-input v-model="form.wedlock" autocomplete="off"></el-input>
      </el-form-item>

    </el-form>
    <div class="demo-drawer__footer">
      <el-button @click="cancelForm">取 消</el-button>
      <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
    </div>
  </div>
        </el-drawer>
      </div>
    </div>
    <div>
      <el-table :data="info" stripe border style="width: 100%">
        <el-table-column type="selection" width="55"> </el-table-column>
        <!-- <el-table-column prop="date" label="日期" width="150">
        </el-table-column> -->
        <el-table-column prop="name" label="姓名" width="85"> </el-table-column>
        <el-table-column prop="age" label="年龄" width="85"> </el-table-column>
        <el-table-column prop="gender" label="性别" width="85">
        </el-table-column>
        <el-table-column prop="phone" label="联系方式" width="150">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column label="操作" width="230">
          <template slot-scope="scope">
            <el-popover placement="left" width="800" trigger="click">
              <el-table :data="detailedData">
                <el-table-column
                  width="90"
                  property="name"
                  fixed
                  label="姓名"
                ></el-table-column>
                <el-table-column
                  width="90"
                  property="nation"
                  label="民族"
                ></el-table-column>
                <!-- <el-table-column
                  width="90"
                  property="Political"
                  label="政治面貌"
                ></el-table-column> -->
                <el-table-column
                  width="100"
                  property="birthday"
                  label="生日"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="email"
                  label="邮箱"
                ></el-table-column>
                <!-- <el-table-column
                  width="200"
                  property="idCard"
                  label="身份证号"
                ></el-table-column> -->
                <el-table-column
                  width="130"
                  property="school"
                  label="学校"
                ></el-table-column>
                <!-- <el-table-column
                  width="90"
                  property="tiptopDegree"
                  label="学历"
                ></el-table-column> -->
                <el-table-column
                  width="90"
                  property="wedlock"
                  label="婚姻状况"
                ></el-table-column>
              </el-table>
              <el-button
                @click="handleClick(scope.row, scope.$index)"
                slot="reference"
                type="primary"
                size="small"
                >查看</el-button
              >
            </el-popover>
            <el-button type="primary"
                       size="small"
                       style="margin-left: 10px"
                       @click="editPer(scope.row)"
              >编辑</el-button
            >
            <el-button type="primary"
                       size="small"
                       style="margin-left: 10px"
                       @click="delPer(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: flex-end">
        <el-pagination
          background
          :page-size="3"
          layout=" prev, pager, next"
          :total="5"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "UserManage",
  data() {
    return {
      info: [],
      value: true,
      indexs: 0,
      detailedData: [],
      FindName:null,
      dialog: false,
       loading: false,
       gridData:[],
        form: {
        dates:this.timeFormat(new Date()),
        name: '',
        nation:'',
        address:'',
        phone:'',
        sex:'',
        age:'',
        Political: '',
        birthday: '',
        email: '',
        idCard: '',
        school: '',
        tiptopDegree: '',
        wedlock: ''
      },
      rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          phone:[{required: true, message: '请输入联系方式', trigger: 'blur'}]
      },
        formLabelWidth: '130px',
        timer: null,
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    //请求本地数据
    getdata() {
      this.$axios({
        method: "get",
        // url: "./data1.json",
        url:"http://127.0.0.1:8000/user"
        // url:"http://127.0.0.1:3000/selectuser"
      }).then((res) => {
        // this.info = res.data.list;
        this.info=res.data;
        console.log(this.info);
      });
    },
    handleClick(row, index) {
      this.detailedData.splice(0, 1, row);
    },
    //删除成员
    delPer(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            methods:'get',
            url:'http://127.0.0.1:8000/deleteUser?id='+row.id
          }).then(res=>{
             this.getdata()
          })
          this.$message({
            type: "success",
            message: "删除成功!",
          });

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //查找员工
    findPer(){
     let user=this.FindName;
    //  console.log(user);
      this.$axios({
        methods:"get",
        url:("http://127.0.0.1:8000/findUserByName?name="+user)
        // url:"http://127.0.0.1:3000/selectinfo?name="+user
      }).then((res)=>{
        // console.log(res);
        this.info=[];
        this.info=res.data;
      })

    },
    // 添加员工
    addUser(){

        if(this.form.name===""||this.form.name===null){
           this.$message({
          message: '添加失败,请输入必填项*',
          type: 'error'
        });
        }else{
        this.$axios.post('api',this.form).then(res=>{
          //  消息弹窗
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.getdata();
        })
        }
    },
    //编辑信息
    editPer(row){
      // this.dialog = true;
      //  this.form = row;
      // console.log(this.form);
    },
     handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true;
        this.addUser();
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => {});
    },
    //取消提交
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    addProsition() {

      let arr = { date: this.timeFormat(new Date()), position: this.pos.name };
      let arrs = this.info;
      arrs.push(arr);
      this.pos.name = "";

    },
    //时间格式化
    timeFormat(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month =
        time.getMonth() + 1 > 10
          ? time.getMonth() + 1
          : "0" + (time.getMonth() + 1);
      let day = time.getDate() > 10 ? time.getDate() : "0" + time.getDate();
      return year + "-" + month + "-" + day;
    },
  },
};
</script>

<style scoped>
</style>

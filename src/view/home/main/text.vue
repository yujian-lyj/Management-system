<template>
  <div>
    <div style="display: flex; justify-content: space-between">
      <el-button type="primary" icon="el-icon-plus" size="mini"  @click="onhandAdd"
        >添加工资账套</el-button
      >
      <el-button type="success" icon="el-icon-refresh" size="mini" @click="refresh()"></el-button>
    </div>
    <div>
      <el-table :data="salaries" border stripe style="margin-top: 10px" @cell-dblclick="cellClick" >
        <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column
          prop="name"
          label="账套名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="basic_salary"
          label="基本工资"
          width="90"
        ></el-table-column>

        <el-table-column
          prop="traffic"
          label="交通补助"
          width="90"
        >
        </el-table-column>
        <el-table-column
          prop="lunch"
          label="午餐补助"
          width="90"
        >
        </el-table-column>
        <el-table-column prop="bonus" label="奖金" width="80"  >
            <template slot-scope="scope">
             <el-input size="mini" v-model="scope.row.bonus" v-if="scope.row.flag" @blur="inputClick(scope.row)" v-focus></el-input>
             <span v-if="!scope.row.flag">{{scope.row.bonus}}</span>
            </template>
        </el-table-column>
        <el-table-column label="养老金" align="center">
          <el-table-column
            prop="persion_per"
            label="比率"
            width="70"
          ></el-table-column>
          <el-table-column prop="persion_base" label="基数" width="70">
          </el-table-column>
        </el-table-column>
        <el-table-column label="医疗保险" align="center">
          <el-table-column
            prop="medical_per"
            label="比率"
            width="70"
          ></el-table-column>
          <el-table-column prop="medical_base" label="基数" width="70">
          </el-table-column>
        </el-table-column>
        <el-table-column label="公积金" align="center">
          <el-table-column
            prop="accumulation_fund_per"
            label="比率"
            width="70"
          ></el-table-column>
          <el-table-column prop="accumulation_fund_base" label="基数" width="70">
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作" style="displa: flex" >
          <template slot-scope="scope">
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button type="danger" size="mini"  @click="delate(scope.row)">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
    </div>
       <el-dialog
      :title="addtitle"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form

        ref="refRuleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账套名称" >
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="基本工资" >
          <el-input v-model="form.basic_salary"></el-input>
        </el-form-item>
        <el-form-item label="交通补助" >
          <el-input v-model="form.traffic"></el-input>
        </el-form-item>
        <el-form-item label="午餐补助" >
          <el-input v-model="form.lunch" ></el-input>
        </el-form-item>
        <el-form-item label="奖金" >
          <el-input v-model="form.bonus"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserManage",
  data() {
    return {
      salaries: [] ,
      dialogVisible: false,
      addtitle: '添加工资账套',
      form:{
        name:'',
        basic_salary:'',
        traffic:'',
        lunch:'',
        bonus:'',
        persion_per:'0.06',
        persion_base:'1350',
        medical_per:'0.06',
        medical_base:'1100',
        accumulation_fund_per:'0.06',
        accumulation_fund_base:'2200',
        flag:"false"
      }};
  },
  mounted() {
    this.getdata();
  },
   directives: {
        // 注册一个局部的自定义指令 v-focus
        focus: {
            // 指令的定义
            inserted: function (el) {
                // 聚焦元素
                el.querySelector('input').focus()
            }
        }
    },
  methods: {
    refresh(){
      this.getdata();
    },
    //请求本地数据
    getdata() {
      this.$axios({
        method: "get",
        // url: "./data1.json",
        url:"http://127.0.0.1:3000/selectwage"
      }).then((res) => {
        this.salaries = res.data;
      });
    },
       //双击单元格后，显示input，并通过v-focus让input自动获取焦点
        cellClick(row){
            row.flag=true
            // console.log(row)
        },
        //input框失去焦点事件
        inputClick(row){
            row.flag=false
        },
      onhandAdd() {
      this.dialogVisible = true;
    },
      handleClose(done) {
      this.dialogVisible = false;
    },
    //添加数据
    dialogVisibleConfirm() {
      // 新增接口
      // console.log(this.form);
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:3000/addwage",
        data: this.form
      }).then((res) => {
        this.dialogVisible = false;
        this.getdata();
         this.$message({
            type: "success",
            message: "添加成功!",
          });
      });
    },
    //删除数据
    delate(row) {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:3000/delwage",
        data: {
          id: row.id
        }
    }).then((res) =>{
      console.log(res);
      this.getdata();
        this.$message({
            type: "success",
            message: "删除成功!",
          });
    })
  }
},  }
</script>

<style lang="scss" scoped>
</style>

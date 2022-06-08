<template>
  <div>
    <div>
      <el-input
        size="small"
        class="addPosInput"
        placeholder="添加职位..."
        suffix-icon="el-icon-plus"
        v-model="pos.name"
        @keydown.enter.native="addProsition"
      >
      </el-input>
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        @click="addProsition"
        >添加</el-button
      >
    </div>
    <div>
      <el-table
        :data="info.list2"
        height="480"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="date" label="日期" width="150">
        </el-table-column>
        <el-table-column prop="position" label="职位" width="150">
        </el-table-column>
        <!-- <el-table-column prop="name" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="100"> </el-table-column>
        <el-table-column prop="phone" label="联系方式" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column> -->
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" size="mini"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="delate(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "PosMana",
  data() {
    return {
      pos: {
        name: "",
      },
      info: [],
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
        url: "./data1.json",
      }).then((res) => {
        this.info = res.data;
      });
    },
    handleClick(row) {
      console.log(row.position);
      this.$prompt("请输入职位", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          row.position = value;
          this.$message({
            type: "success",
            message: "修改成功 ",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    //删除信息
    delate(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.info.list2.splice(index, 1);
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
    // 添加信息
    addProsition() {
      if (this.pos.name) {
        let arr = {
          date: this.timeFormat(new Date()),
          position: this.pos.name,
        };
        let arrs = this.info.list2;
        arrs.push(arr);
        this.pos.name = "";
      } else {
        this.$message.error("不能为空！");
      }
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

<style  scoped>
.addPosInput {
  width: 300px;
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
<template>
  <div>
    <div>
      <el-input
        size="small"
        placeholder="添加职称..."
        suffix-icon="el-icon-plus"
        v-model="job.name"
        @keydown.enter.native="addProsition"
        style="width: 300px"
      >
      </el-input>
      <el-select
        size="small"
        v-model="job.position"
        clearable
        placeholder="请选择"
        style="margin-left: 6px; margin-right: 6px; margin-bottom: 6px"
      >
        <el-option
          v-for="item in titlelevels"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
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
        :data="info.list3"
        height="480"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="date" label="日期" width="150">
        </el-table-column>
        <el-table-column prop="name" label="职称名称" width="150">
        </el-table-column>
        <el-table-column prop="position" label="职称等级" width="150">
        </el-table-column>

        <el-table-column label="是否启用" width="180">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.Status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="'1'"
              :inactive-value="'0'"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              :disabled="scope.row.Status != 0"
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
  name: "JobMana",
  data() {
    return {
      job: {
        name: "",
        titlelevel: "",
        position: "",
      },
      titlelevels: ["正高级", "副高级", "初级", "中级", "员级"],
      info: [],
      enable: false,
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
        // this.value = this.info.list3[2].value;
        // console.log(this.value);
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
          this.info.list3.splice(index, 1);
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
      if (this.job.name && this.job.position) {
        let arr = {
          date: this.timeFormat(new Date()),
          position: this.job.position,
          name: this.job.name,
        };
        let arrs = this.info.list3;
        arrs.push(arr);
        this.job.position = "";
        this.job.name = "";
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

<style lang="scss" scoped>
</style>
<template>
  <div style="width: 400px">
    <el-input
      size="small"
      placeholder="请输入部门名称"
      v-model="filterText"
      prefix-icon="el-icon-search"
    >
    </el-input>

    <el-tree
      class="filter-tree"
      :data="deps.list4"
      :props="defaultProps"
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      ref="tree"
    >
      <!-- <span
        class="custom-tree-node"
        slot-scope="{ node, data }"
        style="display: flex; justify-content: space-between; width: 100%"
      >
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="primary"
            class="depbtn"
            size="mini"
            @click="() => append(data)"
          >
            添加部门
          </el-button>
          <el-button
            type="danger"
            size="mini"
            class="depbtn"
            @click="() => remove(data)"
          >
            删除部门
          </el-button>
        </span>
      </span> -->
    </el-tree>
    <el-dialog title="添加部门" :visible.sync="dialogVisible" width="30%">
      <div>
        <table>
          <tr>
            <td>
              <el-tag>上级部门</el-tag>
            </td>
            <td>{{ pname }}</td>
          </tr>
          <tr>
            <td>
              <el-tag>部门名称</el-tag>
            </td>
            <td>
              <el-input
                v-model="dep.name"
                placeholder="请输入部门名称"
              ></el-input>
            </td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doAdd()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DepMana",
  data() {
    return {
      filterText: "",
      deps: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      dialogVisible: false,
      dep: {
        name: "",
        parentId: -1,
      },
      pname: "",
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios({
        method: "get",
        url: "./data1.json",
      }).then((res) => {
        this.deps = res.data;
      });
    },
    //查询
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //添加
    append(data) {
      this.dep.parentId = data.id;
      this.pname = data.label;
      this.dialogVisible = true;
      let arrs = this.deps.list4;
      console.log(arrs[0].children);
    },
    doAdd() {
      let arr = { id: this.dep.parentId * 2, label: this.dep.name };
      let arrs = this.deps.list4;

      arrs.push(arr);
      // console.log(arrs);
    },
    // 删除
    remove(data) {
      console.log(data);
    },
  },
};
</script>

<style  scoped>
.depbtn {
  padding: 2px;
}
</style>
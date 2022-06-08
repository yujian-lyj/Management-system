<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="部门管理" name="DepMana"
      ><dep-mana></dep-mana
    ></el-tab-pane>
    <el-tab-pane label="职位管理" name="PosMana"
      ><pos-mana></pos-mana
    ></el-tab-pane>
    <el-tab-pane label="职称管理" name="JobMana"
      ><job-mana></job-mana
    ></el-tab-pane>
    <!-- <el-tab-pane label="奖惩规则" name="EcMana"
      ><ec-mana></ec-mana
    ></el-tab-pane> -->
  </el-tabs>
</template>

<script>
import DepMana from "../../../components/baseinfo/DepMana";
import EcMana from "../../../components/baseinfo/EcMana";
import JobMana from "../../../components/baseinfo/JobMana";
import PosMana from "../../../components/baseinfo/PosMana";

export default {
  components: { PosMana },
  name: "BaseInfo",
  components: {
    DepMana,
    EcMana,
    JobMana,
    PosMana,
  },
  data() {
    return {
      activeName: "DepMana",
    };
  },
};
</script>

<style  scoped>
</style>

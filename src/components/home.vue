<template>

  <el-container class="home-container">

    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '61px' : '210px'">
        <!-- 头部logo -->
        <template>
          <div class="header-title" v-if="!isCollapse">
            <img width="55px" height="50px" src="../assets/img/logo.jpeg" style="border-radius: 5px">
            <span style="font-weight:bold">办公系统</span>
          </div>
          <div class="header-title-hiddle" v-else>
             <img width="50px" height="45px" src="../assets/img/logo.jpeg" style="border-radius: 5px">
          </div>
        </template>

        <!-- 菜单区域 -->
        <el-menu
            background-color="#282C34"
            text-color="#fff"
            active-text-color="#fff"
            :collapse="isCollapse"
            :collapse-transition="false"
            :default-active="'/' + activePath"
            unique-opened
            router>

          <!-- 首页 -->
          <el-menu-item
            :index="item.path" v-for="item in menuList"
            :key="item.id"
            @click="selectMenu(item)">
            <i :class="item.class"></i>
            <span slot="title">{{item.label}}</span>
          </el-menu-item>

        </el-menu>
    </el-aside>

    <!-- 主体 -->
    <el-container>
      <!-- 头部 -->
      <el-header>

        <!-- 头部导航栏 -->
        <div class="header-row">
          <div class="toggle-button">
            <div>
              <i :title="isCollapse ? '展开' : '收起'" class="fa fa-bars" @click="toggleCollapse"></i>
            </div>
            <div style="height:25px;width:100%;margin-left:10px">
              <div style="float:left;color:#E74405;font-size:16px;height:25px;line-height:25px;">
                <i class="fa fa-bullhorn"></i>
              </div>
              <el-carousel height="25px" direction="vertical" indicator-position="none" autoplay :interval="8000">

                <el-carousel-item v-for="item in mottoList" :key="item">
                  <h3 class="medium">{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>

          <!-- 头像下拉菜单 -->
          <div class="header-avatar">
            <div class="user">
              管理员，您好！
            </div>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <img width="35" height="35" style="border-radius:50%;background:#dddddd" :src="setImg()" alt="">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="update-password" @click.native="perinfor">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>

        <!-- tab标签页区域 - 用于标签页切换 -->
        <div class="tabs-switch-page">
          <el-tag
            size="medium"
            v-for="(tab, index) in tabList"
            :key="tab.name"
            @close="handleClose(tab, index)"
            @click="changeMenu(tab)"
            :closable="tab.name !== 'home'"
            :effect="activePath === tab.name ? 'dark' : 'plain'">
          {{tab.label}}
          </el-tag>
        </div>

      </el-header>

      <!-- 内容区 -->
      <el-main>
        <div style="padding:15px">
          <keep-alive :include="catch_components">
            <router-view />
          </keep-alive>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  components: {
  },
  //组件被创建
  created() {
    //加载菜单
    this.loadMenu();
    //获取头像
     this.user = window.sessionStorage.getItem("img");
  },
  computed: {
    ...mapState({ // 从 state 中的到的计算属性
       activePath: state => state.activePath, // 已选中菜单
       tabList: state => state.tabList,  // tags菜单列表
       catch_components: state => state.catch_components,  // keepalive缓存
    })
  },
  data() {
    return{
         user: "",
        //菜单列表
        menuList: [],
        // 折叠-展开 默认false不折叠
        isCollapse: false,
        // 系统公告
        mottoList: [
            '等风来不如追风去，追逐的过程就是人生的意义',
            '当你想要放弃了，那就想想当初为什么开始',
            '自强之人谁也打不倒，自弃之人谁也带不动',
            '既然无法选择回去的路程，那么就清晰的面对已经造成的挑战',
            '在难过的时候，不要忘记自己还要前进',
            '爱国，敬业，诚信，友善'
        ],
    }
  },
  methods: {
    //头像
    setImg() {
      let imgs = require("../assets/img" + this.user);
      return imgs;
    },
      //退出登录
    handleCommand(command){

      //注销登录
      if (command == "logout") {
        this.$confirm("此操作将注销登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        })
          .then(() => {
            window.sessionStorage.removeItem("token");
            window.sessionStorage.removeItem("img");
            this.$router.replace("/");
            this.$message({
              message: "注销成功",
              type: "success",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
      }
    },
    // 点击折叠 展开菜单
    toggleCollapse(){
        this.isCollapse = !this.isCollapse;
    },
    // 点击菜单 - 传入name，添加到keepalive缓存页面
    selectMenu(item){
        // 加入keepalive缓存
        this.$store.commit('addKeepAliveCache', item.name)
        //添加tags标签
        //访问wellcome 就代表home
        var name = item.name === 'wellcome' ? 'home' : item.name
        var submenu = {
          path: name,
          name: name,
          label: item.label
        }
        //修改选中菜单
        this.$store.commit('selectMenu', submenu)
    },
    // 关闭tab标签
    handleClose(tab, index) {
        // 历史选中菜单
        var oldActivePath = this.$store.state.activePath
        // 历史已选中菜单列表
        var oldTabList = this.$store.state.tabList
        // 计算标签个数
        let length = oldTabList.length - 1
        // 删除tabList中的该对象
        for(let i = 0;i < oldTabList.length;i++){
            let item = oldTabList[i]
            if(item.name === tab.name){
            oldTabList.splice(i, 1);
            }
        }
        // 删除keepAlive缓存
        this.$store.commit('removeKeepAliveCache', tab.name)
        if (tab.name !== oldActivePath) {
            return
        }
        // 如果length为1，必然只剩下首页标签，此时关闭后，更新到首页
        if(length === 1){
            // 同时存储菜单
            this.$store.commit('closeTab', {activePath: 'home', tabList: oldTabList})
            // tab页向左跳转
            this.$router.push({ name: oldTabList[index - 1].name })
            // 不再向下执行
            return
        }
        // 关闭的标签是最右边的话，往左边跳转一个
        if (index === length) {

            oldActivePath = oldTabList[index - 1].name
            this.$store.commit('closeTab', {activePath:oldActivePath, tabList: oldTabList})
            this.$router.push({ name: oldTabList[index - 1].name })
        } else {
            oldActivePath = oldTabList[index].name
            this.$store.commit('closeTab', {activePath:oldActivePath, tabList: oldTabList})
            this.$router.push({ name: oldTabList[index].name })
        }
    },
    // 点击标签跳转路由
    changeMenu(item) {
        // 历史选中菜单
        var oldActivePath = this.$store.state.activePath
        // 首先判断点击的是否是自己，如果是自己则return
        if(oldActivePath === item.name){
            return
        }
        // 不是自己，存储菜单
        this.$store.commit('changeMenu', item.name)
        // 页面跳转
        this.$router.push({ name: item.name })
    },
    //加载菜单
    loadMenu(){
        this.menuList = [
            {
                id: 'number-01',
                class: 'fa el-icon-location',
                path: '/home',
                label: '控制台',
                name: 'home'
            },
            {
                id: 'number-02',
                class: 'fa el-icon-menu',
                path: '/test2',
                label: '员工信息',
                name: 'test2'
            },
            {
                id: 'number-03',
                class: 'fa el-icon-document',
                path: '/test3',
                label: '管理信息',
                name: 'test3'
            },
            {
                id: 'number-04',
                class: 'fa el-icon-date',
                path: '/test4',
                label: '工资信息',
                name: 'test4'
            },
            {
                id: 'number-05',
                class: 'fa el-icon-document',
                path: '/test5',
                label: '日历信息',
                name: 'test5'
            },
            // {
            //     id: 'number-06',
            //     class: 'fa el-icon-document',
            //     path: '/test6',
            //     label: '个人信息',
            //     name: 'test6'
            // },
            {
                id: 'number-07',
                class: 'fa el-icon-document',
                path: '/test7',
                label: '代办事件',
                name: 'test7'
            },
        ]
    },
    // 加载个人信息
    perinfor(){
      // console.log('aaa');
      this.$router.push({ name: 'test6' })
    }
  },
};
</script>
<style lang="less" scoped>
.el-col-align-middle{
    line-height: 40px;
    text-align: left;
    font-size: 14px;
}
.home-container{
  height: 100%;
}
.el-header{
  color: rgb(0, 0, 0);
  font-size: 20px;
  border-bottom: 1px solid #dddddd;
  height: 103px !important;
  padding: 0;
  background: #fff;
}
.header-row{
  height:60px;
  width:100%;
  display: flex;
  flex-direction:row;
  justify-content: center;
  border-bottom:1px solid #dddddd;
  overflow: hidden;
}
.header-avatar{
  float:right;
  width:40%;
  display: flex;
  align-items: center;
  justify-content:flex-end;
  padding-right:20px;
  .user{
    font-size: 14px;
    font-weight: bold;
    padding: 0 10px;
  }
}

.el-aside{
  background-color: #282C34;
  .header-title{
    margin-top: 15px;
    padding-left: 20px;
    height: 60px;
    font-weight: 300;
    display: flex;
    font-size: 20px;
    align-items: center;
    cursor: pointer;
    color: #ffffff;
    span{
      margin-left: 10px;
    }
  }
  .header-title-hiddle{
    width: 64px;
    height: 60px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
  }
  .el-menu{
    border-right: none;
    padding-top: 30px;
  }
}
// 菜单选中背景色
.el-menu-item.is-active{
  background-color: #1890FF !important;
}
// 菜单悬浮背景色
.el-menu-item:hover{
  background-color: #1890FF !important;
}
// 走马灯
.el-carousel__item h3 {
  color: #ee7c12;
  font-size: 14px;
  opacity: 0.75;
  line-height: 25px;
  margin: 0;
}

.el-main{
  background-color: #eaedf1;
  padding: 0;
}

.fa{
  margin-right: 10px;
}

// 点击展开/折叠按钮
.toggle-button{
  width: 80%;
  font-size: 20px;
  line-height: 40px;
  color:#595959;
  text-align: left;
  display: flex;
  align-items: center;
  float:left;
  padding-left: 20px;
  i{
    cursor: pointer;
  }
}
// 面包屑导航
.el-breadcrumb{
  margin-bottom: 0;
}

// tab页
.tabs-switch-page{
  display: flex;
  align-items:center;
  height: 40px;
  background-color:#fff;
  overflow: hidden;
}
.el-tag{
  cursor: pointer;
  margin-left: 10px;
  border-radius: 2px;
  font-size: 12px;
  color: #1890FF;
  border-color: #1890FF;
}
.el-tag--dark{
  color: #fff;
  background-color: #1890FF;
}

.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.submit-row{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}
</style>

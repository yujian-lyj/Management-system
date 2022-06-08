<template>
  <div class="container" >
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">个人事项清单</h3>
            </div>
            <div class="panel-body">

                <input type="text" class="form-control" @keyup.enter="addData" v-model='iptVal'>

                <table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th><input type="checkbox" v-model='allChecked'>序号</th>
                            <th>待完成事件</th>
                            <th>完成状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='(item, key) in msg' :key="key">
                            <td :style="item.style"><input type="checkbox" v-model='item.checked'>{{key+1}}</td>
                            <td :style="item.style">{{item.event}}</td>
                            <td :style="item.style">{{!item.bool1 ? "已完成" : "未完成"}}</td>
                            <td>

                                <!-- v-show为假时隐藏标签 -->
                                <button type="button" class="btn btn-success"
                                    @click="changeStyle(item, 'yellow', false)" v-show='item.bool1'>完成</button>
                                <button type="button" class="btn btn-warning" @click="msg.splice(key,1)"
                                    :disabled="item.bool1==true?true:false">删除</button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <button type="button" class="btn btn-success" @click="allSucess()">全部完成</button>
                            </td>

                            <td>
                                <button type="button" class="btn btn-warning" @click="delCompleted">删除已完成</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" @click="allDel">全部删除</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

    </div>

</template>

<script>
export default {
    data(){
        return{
				iptVal: "",
        msg: [],
			  }
          },
	methods: {

                // 添加数据
                addData: function () {

                    let obj = {};

                    obj.id = this.msg.length + 1;

                    obj.event = this.iptVal;

                    // 用来判断是否选中
                    obj.checked = false;

                    // 用来判断是否完成
                    obj.bool1 = true;
                    // console.log(obj);
                    this.iptVal='';
                    this.msg.push(obj);
                  //   window.sessionStorage.setItem("obj"+obj.id, window.JSON.stringify(obj));

                  //  let objs= window.sessionStorage.getItem("obj"+obj.id);
                  //   this.msg.push(window.JSON.parse(objs));
                  //   // console.log(objs);
                  //   console.log(this.msg);
                },

                changeStyle(item, color, bool1) {

                    item.style = {

                        // color: color,
                        backgroundColor: color,
                    }
                    item.bool1 = bool1;
                },

                // 全部完成
                allSucess() {
                  console.log('aa');
                    this.msg.forEach((item) => {
                        this.changeStyle(item, 'yellow', false);
                        // if (item.checked) {

                        //     this.changeStyle(item, "yellow", false);
                        // }

                    })
                },

                // 删除已完成
                delCompleted() {

                    this.msg = this.msg.filter((item) => item.bool1 === true);

                },

                // 删除所有，不管有没有完成的
                allDel() {
                    this.msg.splice(0);
                }
            },

            // 计算属性
            computed: {

                allChecked: {
                    set(val) {

                        console.log(val);

                        this.msg.forEach((item) => { item.checked = val });
                    },

                    get() {
                        return (this.msg.filter((item) => { return item.checked }).length === this.msg.length);
                    }
                },
            }
}
</script>

<style scoped>
.panel-title{
	width: 100px;
	margin:0 auto;
}
	   ul,
        li {
            list-style: none;
        }

        table {
            margin-top: 3rem;
        }

        td,
        th {
            text-align: center;
        }

        button {
            outline: none;
        }
</style>

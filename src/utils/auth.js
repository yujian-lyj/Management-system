// @ts-nocheck
import Vue from 'vue'
import store from '@/store'

// 按钮存在且为true,则显示
Vue.directive('auth',{
// 当被绑定的元素插入到 DOM 中时……
inserted:(el,binding,vnode)=>{
    //接受指令传入的值，应传入权限标识
constvalue=binding.value;
if(!isButtomShow(value)){
        //移除节点
      el.parentNode.removeChild(el);
    }
}
});
//判断按钮是否有权显示
function isButtomShow(value){
    var perms = store.state.currentUser.permissions
    return perms.indexOf(value) != -1
}


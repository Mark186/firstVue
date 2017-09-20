import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 这里定义初始值


let state = {
    pageindex:1,
    pagesize:100,
    count:10,
    options:[{
        label:"首页",
        name:"1"
    }]
};
// 调用 mutations 是唯一允许更新应用状态的地方
const mutations = {
    //增加tab option
    addOption(context, op){
        var isHave = true;
        for (var option of context.options) {
            if (option.label == op.label) {
                isHave = false
                break
            }
        }
        if (isHave) {
            context.options.push(op)
        }
    }, 
    add(context){
        context.count++
    },
    decrease(context){
        context.count--
    }
};
// 事件触发后的逻辑操作
// 参数为事件函数
const actions = {
    //增加tab option
    addOption(context, op){
        context.commit('addOption', op)
    },   addOption(context, op){
        context.commit('addOption', op)
    },
    add(add){
        add.commit('add')
    },
    decrease(decrease){
        decrease.commit('decrease')
    },
    oddAdd({commit,state}){
        if (state.count % 2 === 0) {
            commit('add')
        }
    }
};
// 返回改变后的数值
// 相当于vue实例中的methods,用于处理公用data
const getters = {
    count(context){
        return context.count
    },
    getOdd(context) {
        return context.count % 2 === 0 ? '偶数' : '奇数'
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
//页面请求方法封装
import service from '../utils/http'

export default{
    //获取员工列表
    userList (pageindex, pagesize) {
        //传递参数
        let param={
            pageindex: pageindex,
            pagesize : pagesize,
            sortkey  : "",
            search   : "",
        }||{}
        return service.post('/sample/GetAllListUser',param)
    },
    //员工编辑
    userEdit (form) {
        //传递参数
        return service.post('/sample/UserEdit',form)
    },
    //app登录
    login (params,callback) {
        return service.post('/sample/GetAllListUser',params,callback)
    },
    //获取员工列表
    userList1 () {
        return service.post('/sample/GetAllListUser')
    },
}
import Home from '@/components/HomeNew'
import Login from '@/components/Login'
import NotFound from '@/components/404'
import Index from '@/views/Index'
import Hello from '@/views/Hello'
//import GetAllUser1 from '@/views/GetAllUser'
import page2 from '@/views/page2'


const routers= [
  {
    path: '/login',
    component: Login,
    name: '登录页',
    hidden: true
  },
  {
    path: '/404',
    component: NotFound,
    name: '404页',
    hidden: true
  },
  {
    path: '/',
    component: Home,
    name: "首页",
    hidden: true,
    
    children: [
      { path: '/', component: Index, name: '默认主页', hidden: true }
    ]
  },
  {
    path: '/',
    name: '产品管理',
    component: Home,
    iconCls: 'fa fa-newspaper-o',//图标样式class
    children: [
      { path: '/ProductAdd', component: Hello, name: '新增产品' },
      { path: '/ProductList', component: page2, name: '产品列表' }
    ]
  },
  {
    path: '/',
    name: '库存管理',
    component: Home,
    iconCls: 'fa fa-calendar-check-o',//图标样式class
    children: [
      { path: '/StockMy', component: NotFound, name: '我的库存' },
      { path: '/StockXMH', component: NotFound, name: '新明辉库存' }
    ]
  },
  {
    path: '/',
    name: '销售管理',
    component: Home,
    iconCls: 'fa fa-calculator',//图标样式class
    children: [
      { path: '/Sale', component: NotFound, name: '销售查询-新' },
      { path: '/Sale', component: NotFound, name: '销售查询-历史' },
      { path: '/Sale', component: NotFound, name: '销量分布图' },
      { path: '/Sale', component: NotFound, name: '霍尼销售业绩-新' },
      { path: '/Sale', component: NotFound, name: '霍尼销售业绩-历史' },
      { path: '/Sale', component: NotFound, name: '霍尼业绩(权限内)' },
      { path: '/Sale', component: NotFound, name: '霍尼业绩(权限内)-新' },
      { path: '/Sale', component: NotFound, name: '霍尼业绩统计-新' },
      { path: '/Sale', component: NotFound, name: '霍尼业绩统计-历史' },
      { path: '/Sale', component: NotFound, name: '订单销售查询【杜邦】' },
      { path: '/Sale', component: NotFound, name: '产品销售查询【杜邦】' }
    ]
  },
  {
    path: '/',
    name: '订单管理',
    component: Home,
    iconCls: 'fa fa-edit',//图标样式class
    children: [
      { path: '/Order', component: NotFound, name: '全部订单' },
      { path: '/Order', component: NotFound, name: '待处理订单' },
      { path: '/Order', component: NotFound, name: '新明辉入库信息' },
      { path: '/Order', component: NotFound, name: '部分发货单' },
      { path: '/Order', component: NotFound, name: '已发完订单' },
      { path: '/Order', component: NotFound, name: '发起订单' },
      { path: '/Order', component: NotFound, name: '退货订单' }
    ]
  },
  {
    path: '/',
    name: '物流管理',
    component: Home,
    iconCls: 'fa fa-bus',//图标样式class
    children: [
      { path: '/Logistics', component: NotFound, name: '全部发货单' },
      { path: '/Logistics', component: NotFound, name: '物流单列表' }
    ]
  },
  {
    path: '/Natural',
    name: '资质管理',
    component: Home,
    iconCls: 'fa fa-address-card-o'//图标样式class
  },
  {
    path: '/Question',
    name: '问题',
    component: Home,
    iconCls: 'fa fa-quora'//图标样式class
  },
  {
    path: '/',
    name: '品牌管理',
    component: Home,
    iconCls: 'fa fa-desktop',//图标样式class
    children: [
      { path: '/Brand', component: NotFound, name: '品牌馆配置' },
      { path: '/Brand', component: NotFound, name: '导航管理' },
      { path: '/Brand', component: NotFound, name: '今日推荐' }
    ]
  },
  {
    path: '/Information',
    name: '信息发布',
    component: Home,
    iconCls: 'fa fa-edit'//图标样式class
  },
  {
    path: '/',
    name: '设置',
    component: Home,
    iconCls: 'fa fa-cogs',//图标样式class
    children: [
      { path: '/Set', component: NotFound, name: '用户管理' },
      { path: '/Set', component: NotFound, name: '员工分配' }
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
]
export default routers

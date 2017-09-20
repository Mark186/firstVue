<template>
    <el-row class="container">
        <!--头部开始-->
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
			<el-col :span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
        </el-col>
        <!--头部结束-->
        <!--主体开始-->
        <el-col :span="24" class="main">
            <!--左侧导航开始-->
            <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
                <el-menu 
                    :default-active="$route.path" 
                    class="el-menu-vertical-demo" 
                    @open="handleOpen" 
                    @close="handleClose" 
                    :collapse="collapsed"
                    router
                    :unique-opened="true">
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                        <el-submenu :index="index+''" v-if="!item.leaf" :key="index">
                            <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
                            <el-menu-item 
                                v-for="child in item.children" 
                                :index="child.path" 
                                :key="child.path" 
                                v-if="!child.hidden"
                                @click="addTab(child)">
                                {{child.name}}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item 
                            v-if="item.leaf&&item.children.length>0" 
                            :index="item.children[0].path" 
                            :key="index"
                            @click="addTab(item)">
                            <i :class="item.iconCls"></i>
                            <span slot="title">{{item.children[0].name}}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
            </aside>
            <!--左侧导航结束-->
            <!--右侧内容开始-->
            <section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-row  class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-row>
					<el-row  class="content-wrapper">
                        <el-tabs type="border-card" class="tabs-nopadding" v-model="editableTabsValue" @tab-remove="removeTab" closable :addable="false">
                            <el-tab-pane v-for="option in options" :label="option.label" :name="option.name" :key="option.name">
                                <keep-alive>
                                    <transition name="fade" mode="out-in"><router-view></router-view></transition>
                                </keep-alive>
                            </el-tab-pane>
                        </el-tabs>
					</el-row>
				</div>
                <!--内容尾部开始-->
                <div class="footer">
                    <div class="pull-right">© 2016-2017 <a href="www.xinminghui.com" target="_blank">新明辉网络科技有限公司</a></div>
                </div>
                <!--内容尾部结束-->
			</section>
            <!--右侧内容结束-->
        </el-col>
        <!--主体结束-->
        
    <!--右侧部分开始-->

    <!--右侧部分结束-->
    
    <!--右侧边栏开始-->
    <!--右侧边栏结束-->
    <!--mini聊天窗口开始-->
    <!--mini聊天窗口结束-->
    </el-row>
</template>

<script>
  export default {
    data() {
      return {
        sysName:'新明辉',
        collapsed:false,
        sysUserName: '',
        sysUserAvatar: '/static/images/qq.jpg',
        
        editableTabsValue: '1',//高亮的tab页的索引，绑定v-model
        tabIndex: 1,//tabs 后台开始的索引

        op_page : {
            label:'',
            name:''
        }
      }
    },
    computed: {
        //返回tab 选项卡
        options:{
            get:function(){
                return this.$store.state.options;
            },
            set:function(value){
                //this.options_re = value;
            }
        },

        //op(){
        //    return this.$store.state.op;
        //}
    },
    methods: {
        //退出登录
        logout: function () {
            var _this = this;
            this.$confirm('确认退出吗?', '提示', {
                //type: 'warning'
            }).then(() => {
                sessionStorage.removeItem('user');
                _this.$router.push('/login');
            }).catch(() => {

            });
        },
        //折叠导航栏
        collapse:function(){
            this.collapsed=!this.collapsed;
        },
        //左侧菜单展开
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        //左侧菜单关闭
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        //新增tab
        addTab(item) {
            let newTabName = ++this.tabIndex + '';
            this.$router.push({ path: item.path });
            this.op_page.label = item.name//tab 名字
            this.op_page.name = newTabName//唯一标志
            this.$store.dispatch('addOption', Object.assign({},this.op_page))//---------此处需要新建对象传值，不然指针直接指向新对象---------
        },
        //删除tab
        removeTab(targetName) {
            let tabs = this.options;
            let activeName = this.editableTabsValue;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });
            }
            this.editableTabsValue = activeName;
            this.options = tabs.filter(tab => tab.name !== targetName);
        }
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    padding:0;
}

.header {
    height: 60px;
    line-height: 60px;
    color:#fff;
    background: #20a0ff;
}

.header .userinfo {
    text-align: right;
    padding-right: 35px;
    float: right;
}

.header .userinfo .userinfo-inner {
    cursor: pointer;
    color:#fff;
}
.header .userinfo .userinfo-inner img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 0px 10px 10px;
    float: right;
}
.header .logo {
    height:60px;
    font-size: 22px;
    padding-left:20px;
    padding-right:20px;
    border-color: rgba(238,241,146,0.3);
    border-right-width: 1px;
    border-right-style: solid;
}
.header .logo img {
    width: 40px;
    float: left;
    margin: 10px 10px 10px 18px;
}
.header .logo .txt {
    color:#fff;
}
.header .logo-width{
    width:200px;
}
.header .logo-collapse-width{
    width:60px
}
.header .tools{
    padding: 0px 23px;
    width:14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
}
.main {
    display: flex;
    background: #fff;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
}
.main aside {
    flex:0 0 230px;
    width: 230px;
}
.main aside .el-menu{
    height: 100%;
}
.main aside .collapsed{
    width:60px;
}
.main aside .collapsed .item{
    position: relative;
}
.main aside .collapsed .submenu{
    position:absolute;
    top:0px;
    left:60px;
    z-index:99999;
    height:auto;
    display:none;
}
.main .menu-collapsed{
    flex:0 0 60px;
    width: 60px;
}
.main .menu-expanded{
    flex:0 0 200px;
    width: 200px;
}
.main .content-container {
    flex:1;
    overflow-y: scroll;
}
.main .content-container .breadcrumb-container{
    padding:18px 20px;
}
.main .content-container .breadcrumb-container .title {
    width: 200px;
    float: left;
    color: #475669;
    text-align: left;
}
.main .content-container .breadcrumb-container .breadcrumb-inner {
    float: right;
}
.main .content-container .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
}

.main .navbar-default .el-menu .el-submenu { text-align:left;}
.main aside .el-menu--collapse { width:60px;}
/* .main aside .el-menu--collapse .el-submenu .el-menu { margin-left:0;} */
.footer {
    background: none repeat scroll 0 0 #fff;
    border-top: 1px solid #e7eaec;
    overflow: hidden;
    padding: 10px 20px;
    height: 36px;
}
.content-container .content-wrapper { height: calc(100% - 140px);}
.content-container .content-wrapper .tabs-nopadding .el-tabs__content {height: calc(100% - 140px); overflow-y: scroll;}
</style>
<template>
    <el-row class="container" id="wrapper">
        <!--左侧导航开始-->
        <nav class="navbar-default navbar-static-side"  :class="collapsed?'navbar-collapse-width':'navbar-width'" role="navigation" style="display: block;">
            <div class="nav-close"><i class="fa fa-times-circle"></i></div>
            <div class="slimScrollDiv" :class="collapsed?'navbar-collapse-width':'navbar-width'" style="position: relative; height: 100%;">
                <div class="sidebar-collapse" style="width: auto; height: 100%;">
                    <ul class="nav1" :class="collapsed?'el-menu--collapse':''">
                        <li class="nav-header" :class="collapsed?'userlogo-hide':'userlogo-show'">
                            <!--个人信息弹框-->
                            <div class="dropdown profile-element">
                                <el-popover
                                    ref="popover-usermenu"
                                    placement="bottom"
                                    >
                                    <ul class="usermenu-list m-t-xs">
                                        <li><a class="J_menuItem" href="form_avatar.html" data-index="0">修改头像</a></li>
                                        <li><a class="J_menuItem" href="profile.html" data-index="1">个人资料</a></li>
                                        <li><a class="J_menuItem" href="contacts.html" data-index="2">联系我们</a></li>
                                        <li><a class="J_menuItem" href="mailbox.html" data-index="3">信箱</a></li>
                                        <li class="divider"></li>
                                        <li><a @click="logout">安全退出</a>
                                        </li>
                                    </ul>
                                </el-popover>
                                <span><img alt="image" class="img-circle" src="/static/images/profile_small.jpg"></span>
                                <a class="dropdown-toggle" href="#">
                                    <span class="clear">
                                    <span class="block m-t-xs"><strong class="font-bold">Author-Candy</strong></span>
                                    <el-button v-popover:popover-usermenu class="text-muted text-xs block usermenubtn">超级管理员<b class="caret"></b></el-button>
                                    </span>
                                </a>
                            </div>
                            <!--个人信息弹框-->
                        </li>
                        <li :class="collapsed?'userlogo-show':'userlogo-hide'"><img alt="image" class="userlogo-img" src="/static/images/profile_small.jpg"></li>
                    </ul>
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
                </div>
                <div class="slimScrollBar" style="background: rgb(0, 0, 0); width: 4px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 372.236px;"></div><div class="slimScrollRail" style="width: 4px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.9; z-index: 90; right: 1px;"></div>
            </div>
        </nav>
        <!--左侧导航结束-->
        <!--右侧部分开始-->
        <div id="page-wrapper" class="gray-bg dashbard-1" :class="collapsed?'wrapper-large':'wrapper-small'">
            <!--右侧头部开始-->
            <div class="row border-bottom">
                <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                    <div class="navbar-header">
                        <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#" @click.prevent="collapse"><i class="fa fa-bars"></i> </a>
                        <form role="search" class="navbar-form-custom" method="post" action="#">
                            <div class="form-group">
                                <input type="text" placeholder="请输入您需要查找的内容 …" class="form-control" name="top-search" id="top-search">
                            </div>
                        </form>
                    </div>
                    <ul class="nav navbar-top-links navbar-right">
                        <li class="dropdown" :class="unreadmodel?'open':''">
                            <!--未读消息弹框-->
                            <el-popover
                                ref="popover-unread"
                                placement="bottom-end"
                                visible-arrow="false"
                                popper-class = "popover-unread"
                                v-model = "unreadmodel"
                                >
                                <ul class="dropdown-menu dropdown-messages">
                                    <li class="m-t-xs">
                                        <div class="dropdown-messages-box">
                                            <a class="pull-left"><img alt="" class="img-circle" src="/static/images/a7.jpg"></a>
                                            <div class="media-body">
                                                <small class="pull-right text-navy">46小时前</small>
                                                <strong>小四</strong> 这个在日本投降书上签字的军官，建国后一定是个不小的干部吧？
                                                <br>
                                                <small class="text-muted">3天前 2014.11.8</small>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="divider"></li>
                                    <li>
                                        <div class="dropdown-messages-box">
                                            <a class="pull-left"><img alt="" class="img-circle" src="/static/images/a4.jpg"></a>
                                            <div class="media-body ">
                                                <small class="pull-right text-navy">25小时前</small>
                                                <strong>国民岳父</strong> 如何看待“男子不满自己爱犬被称为狗，刺伤路人”？——这人比犬还凶
                                                <br>
                                                <small class="text-muted">昨天</small>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="divider"></li>
                                    <li>
                                        <div class="text-center link-block">
                                            <a class="J_menuItem" data-index="88">
                                                <i class="fa fa-envelope"></i> <strong> 查看所有消息</strong>
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </el-popover>
                            <!--未读消息弹框-->
                            <a class="dropdown-toggle count-info" v-popover:popover-unread>
                                <i class="fa fa-envelope"></i> <span class="label label-warning">16</span>
                            </a>
                        </li>
                        <li class="dropdown">
                            <a class="dropdown-toggle count-info">
                                <i class="fa fa-bell"></i> <span class="label label-primary">8</span>
                            </a>
                        </li>
                        <li class="hidden-xs">
                            <a href="#" class="J_menuItem" data-index="0"><i class="fa fa-cart-arrow-down"></i> 购买</a>
                        </li>
                        <li class="dropdown hidden-xs">
                            <a class="right-sidebar-toggle" aria-expanded="false">
                                <i class="fa fa-tasks"></i> 主题
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <!--右侧头部结束-->
            <!--右侧tab开始-->
            <el-row  class="row content-tabs">
                <div class="dropdown J_tabClose">关闭操作<span class="caret"></span></div>
                <a class="roll-nav roll-right J_tabExit" @click="logout"><i class="fa fa fa-sign-out"></i> 退出</a>
                <el-tabs type="card" class="tabs-nopadding" v-model="editableTabsValue" @tab-remove="removeTab" closable :addable="false">
                    <el-tab-pane v-for="option in options" :label="option.label" :name="option.name" :key="option.name">
                      
                    </el-tab-pane>
                </el-tabs>
            </el-row>
            <!--右侧tab结束-->
            <!--右侧内容开始-->
            <div class="row J_mainContent" id="content-main">
                <transition name="fade" mode="out-in"><router-view></router-view></transition>
            </div>
            <!--右侧内容结束-->
            <!--右侧尾部开始-->
            <div class="footer">
                <div class="pull-right">© 2016-2017 <a href="http://www.xinminghui.com/" target="_blank">新明辉 网络部</a>
                </div>
            </div>
            <!--右侧尾部结束-->
        </div>
        <!--右侧部分结束-->
        <!--右侧边栏开始-->
        <div id="right-sidebar">
            <div class="slimScrollDiv" style="position: relative; width: auto; height: 100%;"><div class="sidebar-container" style="width: auto; height: 100%;">

                <ul class="nav nav-tabs navs-3">

                    <li class="active">
                        <a data-toggle="tab" href="#tab-1">
                            <i class="fa fa-gear"></i> 主题
                        </a>
                    </li>
                    <li class=""><a data-toggle="tab" href="#tab-2">
                        通知
                    </a>
                    </li>
                    <li><a data-toggle="tab" href="#tab-3">
                        项目进度
                    </a>
                    </li>
                </ul>

                <div class="tab-content">
                    <div id="tab-1" class="tab-pane active">
                        <div class="sidebar-title">
                            <h3> <i class="fa fa-comments-o"></i> 主题设置</h3>
                            <small><i class="fa fa-tim"></i> 你可以从这里选择和预览主题的布局和样式，这些设置会被保存在本地，下次打开的时候会直接应用这些设置。</small>
                        </div>
                        <div class="skin-setttings">
                            <div class="title">主题设置</div>
                            <div class="setings-item">
                                <span>收起左侧菜单</span>
                                <div class="switch">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="collapsemenu" class="onoffswitch-checkbox" id="collapsemenu">
                                        <label class="onoffswitch-label" for="collapsemenu">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="setings-item">
                                <span>固定顶部</span>

                                <div class="switch">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="fixednavbar" class="onoffswitch-checkbox" id="fixednavbar">
                                        <label class="onoffswitch-label" for="fixednavbar">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="setings-item">
                                <span>
                        固定宽度
                    </span>

                                <div class="switch">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="boxedlayout" class="onoffswitch-checkbox" id="boxedlayout">
                                        <label class="onoffswitch-label" for="boxedlayout">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="title">皮肤选择</div>
                            <div class="setings-item default-skin nb">
                                <span class="skin-name ">
                         <a href="#" class="s-skin-0">
                             默认皮肤
                         </a>
                    </span>
                            </div>
                            <div class="setings-item blue-skin nb">
                                <span class="skin-name ">
                        <a href="#" class="s-skin-1">
                            蓝色主题
                        </a>
                    </span>
                            </div>
                            <div class="setings-item yellow-skin nb">
                                <span class="skin-name ">
                        <a href="#" class="s-skin-3">
                            黄色/紫色主题
                        </a>
                    </span>
                            </div>
                        </div>
                    </div>
                    <div id="tab-2" class="tab-pane">

                        <div class="sidebar-title">
                            <h3> <i class="fa fa-comments-o"></i> 最新通知</h3>
                            <small><i class="fa fa-tim"></i> 您当前有10条未读信息</small>
                        </div>

                        <div>

                            <div class="sidebar-message">
                                <a href="#">
                                    <div class="pull-left text-center">
                                        <img alt="image" class="img-circle message-avatar" src="img/a1.jpg">

                                        <div class="m-t-xs">
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                        </div>
                                    </div>
                                    <div class="media-body">

                                        据天津日报报道：瑞海公司董事长于学伟，副董事长董社轩等10人在13日上午已被控制。
                                        <br>
                                        <small class="text-muted">今天 4:21</small>
                                    </div>
                                </a>
                            </div>
                            <div class="sidebar-message">
                                <a href="#">
                                    <div class="pull-left text-center">
                                        <img alt="image" class="img-circle message-avatar" src="img/a2.jpg">
                                    </div>
                                    <div class="media-body">
                                        HCY48之音乐大魔王会员专属皮肤已上线，快来一键换装拥有他，宣告你对华晨宇的爱吧！
                                        <br>
                                        <small class="text-muted">昨天 2:45</small>
                                    </div>
                                </a>
                            </div>
                            <div class="sidebar-message">
                                <a href="#">
                                    <div class="pull-left text-center">
                                        <img alt="image" class="img-circle message-avatar" src="img/a3.jpg">

                                        <div class="m-t-xs">
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                        </div>
                                    </div>
                                    <div class="media-body">
                                        写的好！与您分享
                                        <br>
                                        <small class="text-muted">昨天 1:10</small>
                                    </div>
                                </a>
                            </div>
                            <div class="sidebar-message">
                                <a href="#">
                                    <div class="pull-left text-center">
                                        <img alt="image" class="img-circle message-avatar" src="img/a4.jpg">
                                    </div>

                                    <div class="media-body">
                                        国外极限小子的炼成！这还是亲生的吗！！
                                        <br>
                                        <small class="text-muted">昨天 8:37</small>
                                    </div>
                                </a>
                            </div>
                            <div class="sidebar-message">
                                <a href="#">
                                    <div class="pull-left text-center">
                                        <img alt="image" class="img-circle message-avatar" src="img/a8.jpg">
                                    </div>
                                    <div class="media-body">

                                        一只流浪狗被收留后，为了减轻主人的负担，坚持自己觅食，甚至......有些东西，可能她比我们更懂。
                                        <br>
                                        <small class="text-muted">今天 4:21</small>
                                    </div>
                                </a>
                            </div>
                            <div class="sidebar-message">
                                <a href="#">
                                    <div class="pull-left text-center">
                                        <img alt="image" class="img-circle message-avatar" src="img/a7.jpg">
                                    </div>
                                    <div class="media-body">
                                        这哥们的新视频又来了，创意杠杠滴，帅炸了！
                                        <br>
                                        <small class="text-muted">昨天 2:45</small>
                                    </div>
                                </a>
                            </div>
                            <div class="sidebar-message">
                                <a href="#">
                                    <div class="pull-left text-center">
                                        <img alt="image" class="img-circle message-avatar" src="img/a3.jpg">

                                        <div class="m-t-xs">
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                        </div>
                                    </div>
                                    <div class="media-body">
                                        最近在补追此剧，特别喜欢这段表白。
                                        <br>
                                        <small class="text-muted">昨天 1:10</small>
                                    </div>
                                </a>
                            </div>
                            <div class="sidebar-message">
                                <a href="#">
                                    <div class="pull-left text-center">
                                        <img alt="image" class="img-circle message-avatar" src="img/a4.jpg">
                                    </div>
                                    <div class="media-body">
                                        我发起了一个投票 【你认为下午大盘会翻红吗？】
                                        <br>
                                        <small class="text-muted">星期一 8:37</small>
                                    </div>
                                </a>
                            </div>
                        </div>

                    </div>
                    <div id="tab-3" class="tab-pane">

                        <div class="sidebar-title">
                            <h3> <i class="fa fa-cube"></i> 最新任务</h3>
                            <small><i class="fa fa-tim"></i> 您当前有14个任务，10个已完成</small>
                        </div>

                        <ul class="sidebar-list">
                            <li>
                                <a href="#">
                                    <div class="small pull-right m-t-xs">9小时以后</div>
                                    <h4>市场调研</h4> 按要求接收教材；

                                    <div class="small">已完成： 22%</div>
                                    <div class="progress progress-mini">
                                        <div style="width: 22%;" class="progress-bar progress-bar-warning"></div>
                                    </div>
                                    <div class="small text-muted m-t-xs">项目截止： 4:00 - 2015.10.01</div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="small pull-right m-t-xs">9小时以后</div>
                                    <h4>可行性报告研究报上级批准 </h4> 编写目的编写本项目进度报告的目的在于更好的控制软件开发的时间,对团队成员的 开发进度作出一个合理的比对

                                    <div class="small">已完成： 48%</div>
                                    <div class="progress progress-mini">
                                        <div style="width: 48%;" class="progress-bar"></div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="small pull-right m-t-xs">9小时以后</div>
                                    <h4>立项阶段</h4> 东风商用车公司 采购综合综合查询分析系统项目进度阶段性报告武汉斯迪克科技有限公司

                                    <div class="small">已完成： 14%</div>
                                    <div class="progress progress-mini">
                                        <div style="width: 14%;" class="progress-bar progress-bar-info"></div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="label label-primary pull-right">NEW</span>
                                    <h4>设计阶段</h4>
                                    <!--<div class="small pull-right m-t-xs">9小时以后</div>-->
                                    项目进度报告(Project Progress Report)
                                    <div class="small">已完成： 22%</div>
                                    <div class="small text-muted m-t-xs">项目截止： 4:00 - 2015.10.01</div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="small pull-right m-t-xs">9小时以后</div>
                                    <h4>拆迁阶段</h4> 科研项目研究进展报告 项目编号: 项目名称: 项目负责人:

                                    <div class="small">已完成： 22%</div>
                                    <div class="progress progress-mini">
                                        <div style="width: 22%;" class="progress-bar progress-bar-warning"></div>
                                    </div>
                                    <div class="small text-muted m-t-xs">项目截止： 4:00 - 2015.10.01</div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="small pull-right m-t-xs">9小时以后</div>
                                    <h4>建设阶段 </h4> 编写目的编写本项目进度报告的目的在于更好的控制软件开发的时间,对团队成员的 开发进度作出一个合理的比对

                                    <div class="small">已完成： 48%</div>
                                    <div class="progress progress-mini">
                                        <div style="width: 48%;" class="progress-bar"></div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="small pull-right m-t-xs">9小时以后</div>
                                    <h4>获证开盘</h4> 编写目的编写本项目进度报告的目的在于更好的控制软件开发的时间,对团队成员的 开发进度作出一个合理的比对

                                    <div class="small">已完成： 14%</div>
                                    <div class="progress progress-mini">
                                        <div style="width: 14%;" class="progress-bar progress-bar-info"></div>
                                    </div>
                                </a>
                            </li>

                        </ul>

                    </div>
                </div>

            </div><div class="slimScrollBar" style="background: rgb(0, 0, 0); width: 4px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 550px;"></div><div class="slimScrollRail" style="width: 4px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.4; z-index: 90; right: 1px;"></div></div>
        </div>
        <!--右侧边栏结束-->
        <!--mini聊天窗口开始-->
        <div class="small-chat-box fadeInRight animated">

            <div class="heading" draggable="true">
                <small class="chat-date pull-right">
                    2015.9.1
                </small> 与 Beau-zihan 聊天中
            </div>

            <div class="slimScrollDiv" style="position: relative; width: auto; height: 234px;"><div class="content" style="width: auto; height: 234px;">

                <div class="left">
                    <div class="author-name">
                        Beau-zihan <small class="chat-date">
                        10:02
                    </small>
                    </div>
                    <div class="chat-message active">
                        你好
                    </div>

                </div>
                <div class="right">
                    <div class="author-name">
                        游客
                        <small class="chat-date">
                            11:24
                        </small>
                    </div>
                    <div class="chat-message">
                        你好，请问H+有帮助文档吗？
                    </div>
                </div>
                <div class="left">
                    <div class="author-name">
                        Beau-zihan
                        <small class="chat-date">
                            08:45
                        </small>
                    </div>
                    <div class="chat-message active">
                        有，购买的H+源码包中有帮助文档，位于docs文件夹下
                    </div>
                </div>
                <div class="right">
                    <div class="author-name">
                        游客
                        <small class="chat-date">
                            11:24
                        </small>
                    </div>
                    <div class="chat-message">
                        那除了帮助文档还提供什么样的服务？
                    </div>
                </div>
                <div class="left">
                    <div class="author-name">
                        Beau-zihan
                        <small class="chat-date">
                            08:45
                        </small>
                    </div>
                    <div class="chat-message active">
                        1.所有源码(未压缩、带注释版本)；
                        <br> 2.说明文档；
                        <br> 3.终身免费升级服务；
                        <br> 4.必要的技术支持；
                        <br> 5.付费二次开发服务；
                        <br> 6.授权许可；
                        <br> ……
                        <br>
                    </div>
                </div>


            </div><div class="slimScrollBar" style="background: rgb(0, 0, 0); width: 4px; position: absolute; top: 0px; opacity: 0.4; display: block; border-radius: 7px; z-index: 99; right: 1px;"></div><div class="slimScrollRail" style="width: 4px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.4; z-index: 90; right: 1px;"></div></div>
            <div class="form-chat">
                <div class="input-group input-group-sm">
                    <input type="text" class="form-control"> <span class="input-group-btn"> <button class="btn btn-primary" type="button">发送
                </button> </span>
                </div>
            </div>

        </div>
        <div id="small-chat">
            <span class="badge badge-warning pull-right">5</span>
            <a class="open-small-chat">
                <i class="fa fa-comments"></i>

            </a>
        </div>
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
        unreadmodel:false,
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

<style>
    .container .slimScrollDiv>.sidebar-collapse>.el-menu { background-color: #2F4050;}
    .container .slimScrollDiv>.sidebar-collapse>.el-menu>li { color: #a7b1c2;font-weight: 600; }
    .container .slimScrollDiv>.sidebar-collapse>.el-menu>li .el-submenu__title { height:46px;line-height:46px;font-size:13px;}
    .el-menu-item, .el-submenu__title {color: #a7b1c2;font-weight: 600;}
    .el-submenu .el-menu-item:hover, .el-submenu__title:hover{ color:#fff; background-color: #2F4050;}
    .el-submenu .el-menu-item { height:32px; line-height: 32px;}
    .el-submenu .el-menu { background-color:#293846;}
    .el-submenu .el-menu li.el-menu-item { font-size:13px; text-indent:18px;}
    .el-submenu .el-menu li.el-menu-item:last-child { margin-bottom: 10px;}
    .el-submenu .el-menu li.el-menu-item.is-active { color:#fff;}
    .el-submenu.is-opened { background-color: #293846;}
    .el-submenu.is-opened span { color:#fff;}
    .el-submenu .el-menu-item:hover, .el-submenu__title .fa { width:24px; margin-right: 5px; display: inline-block;}
    .el-submenu__icon-arrow, .el-icon-arrow-down { font-size:12px; font-weight: 100;}
    .el-tabs__nav-scroll,.el-tabs__nav{ height:40px;}
    .el-tabs__nav{ height:40px; width:10000px;}
    .el-tabs__header {height: 40px;overflow: hidden; border:0; position: relative; margin:0;}
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {border-radius:0; border:0; background: #2f4050;color: #a7b1c2;}
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active:hover { color:#fff;}
    .el-tabs__item { height:40px; line-height: 40px; overflow: hidden;}
    /* .el-tabs__header .el-tabs__item:last-child{ position: absolute; right:40px; top:0;border-left: solid 1px #eee;}
    .el-tabs__header .el-tabs__item:nth-last-child(2){ position: absolute; right:100px; top:0;border-left: solid 1px #eee;} */
    .J_tabClose {z-index: 2; position: absolute; right:100px; top:0; width: 80px; color:#999; border-left:1px solid #eee; text-align: center; background-color: #fff;}
    .J_tabClose:hover { background-color: #F2F2F2; color:#666;}
    .J_tabExit { position: absolute; right:40px; top:0;}
    .el-tabs__nav-wrap.is-scrollable { padding:0 40px;}
    .el-tabs__nav-next, .el-tabs__nav-prev { line-height: 40px; text-align: center; width: 40px;display: inline-block;}
    .el-tabs--card .el-tabs__nav { position: unset;}

    .navbar-default .logo-collapse-width{width:70px}
    .el-menu--collapse {width:70px;}
    .el-menu--collapse>li>.el-submenu__title { text-align: center;}
    .el-menu--collapse>li>.el-submenu__title>i { font-size: 16px;}
    .navbar-width {}
    .navbar-collapse-width {width:70px;}
    .userlogo-show { display: block;}
    .userlogo-hide { display: none;}
    .userlogo-img { width:30px; height:30px;}
    .nav1 { padding:0; text-align: center;}
    .nav1 img { border-radius: 50%;}
    .nav1 .nav-header { background: url(/static/images/header-profile.png) no-repeat;padding:33px 25px 14px}
    .wrapper-large { margin-left: 70px;}
    .wrapper-small { margin:0 0 0 220px;}
    .usermenubtn { background: none; border:0; padding:0;}
    .usermenubtn:hover,.usermenubtn:active { color:#8095a8;}
    .el-popover { padding:0; border:0;}
    .el-popover .dropdown-menu { display: block;}
    .usermenu-list  { margin-top:10px; padding-left:0;}
    .usermenu-list li { list-style: none; font-size:12px; color:#676a6c;}
    .usermenu-list li.divider{height: 1px;margin: 9px 0;overflow: hidden;background-color: #e5e5e5;}
    .usermenu-list li a { color:#676a6c; margin:4px; padding: 3px 20px; line-height:25px; display: block;}
    .usermenu-list li a:hover { color: #262626;text-decoration: none;background-color: #f5f5f5;}
    .dropdown-messages { width:310px;}
    .dropdown-messages .dropdown-messages-box a {padding:3px 20px;}
    .popover-unread { width: 310px;}
    .popover-unread>.popper__arrow { display: none;}
    .el-popover[x-placement^=bottom]{margin-top:0;}
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 220px;
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
        width:22    0px;
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
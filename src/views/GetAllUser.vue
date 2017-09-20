<template>
  <div>
    <!--工具条-->
      <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>

		</el-col>

    <!--列表-->
<!--列表-->
    <el-table
      id = "mytable"
      :data="tableData"
      highlight-current-row
      @current-change="tablehandleCurrentChange"
      @selection-change="handleSelectionChange"
      height="250"
      border
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="ID"
        label="数据库编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        label="日期"
        width="180">
        <template scope="scope">
        <span v-if="!scope.row.editFlag">{{ scope.row.name }}</span>
        <span v-if="scope.row.editFlag" class="cell-edit-input"><el-input v-model="inputColumn1" placeholder="请输入内容"></el-input></span>
        <span v-if="!scope.row.editFlag" style="margin-left:10px;" class="cell-icon"  @click="handleEdit1(scope.row)">  <i class="el-icon-edit"></i> </span>
        <span v-if="scope.row.editFlag"  style="margin-left:10px;"  class="cell-icon"  @click="handleSave1(scope.row)">  <i class="el-icon-document"></i> </span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="pagehandleSizeChange"
        @current-change="pagehandleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--编辑界面-->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="数据库编号" :label-width="formLabelWidth">
          <el-input v-model="form.dbnum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工号" :label-width="formLabelWidth">
          <el-input v-model="form.usernum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import httpService from '../service/httpService'
  import {Loading} from 'element-ui'

  var loadingInstance;//声明加载层loading实例

  export default {
      data() {
          return {
            filters: {//工具栏
              name: ''
            },
            tableData  : [],     //table数据源
            currentRow : null,   //当前行
            total      : 0,      //总数
            pageindex  : 1,      //页码
            pagesize   : 100,    //每页数量
            currentPage: 1,      //第几页
            search     : "",     //搜索内容
            sortkey    : "",     //排序

            index: 0,      //行数索引
            row  : null,   //该行对象
            multiselect      : [],      //选中的数组
            dialogFormVisible: false,   //弹框
            form             : {//表单
              dbnum   : '',
              address : '',
              usernum : '',
              name    : '',
              region  : '',
              date1   : '',
              date2   : '',
              delivery: false,
              type    : [],
              resource: '',
              desc    : ''
            },
            formLabelWidth: '120px'  //输入框长度
          }
      },
      created(){
        //加载层
        var options={
          fullscreen: true,
          target    : "#mytable",
          body      : "loading",
          lock      : true,
          text      : "拼命加载中……"
        }
        //loadingInstance = Loading.service(options)
      },
      async mounted() {
        //var obj = await httpService.userList(this.$store.state.pageindex, this.$store.state.pagesize)
        //var obj = await httpService.userList(this.pageindex, this.pagesize)
        await this.loadData(this.pageindex, this.pagesize)
        //loadingInstance.close()
      },
      methods:{
        handleEdit1:function(row){
          //遍历数组改变editeFlag
        },
        handleSave1:function(row){
          //保存数据，向后台取数据
        },
        //行点击高亮
        tablehandleCurrentChange(val){
          this.currentRow = val
        },
        //多行选中
        handleSelectionChange(val) {
          this.multiselect = val;
        },
        //获取用户列表
        getUsers() {
          let para = {
            page: this.page,
            name: this.filters.name
          };
          this.listLoading = true;
          //NProgress.start();
          getUserListPage(para).then((res) => {
            this.total = res.data.total;
            this.users = res.data.users;
            this.listLoading = false;
            //NProgress.done();
          });
        },
        //显示新增界面
        handleAdd: function () {
          this.addFormVisible = true;
          this.addForm = {
            name: '',
            sex: -1,
            age: 0,
            birth: '',
            addr: ''
          };
        },
        //编辑，弹出
        handleEdit(index,row){
          this.form.dbnum        = row.ID
          this.form.address      = row.address
          this.form.usernum      = row.date
          this.form.name         = row.name
          this.index = index
          this.row = row
          this.dialogFormVisible = true;
        },
        //编辑，提交
        async handleSubmit(){
          var obj = await httpService.userEdit(this.form)
          if(obj.data.success){
            //编辑的行重新赋值，不需要到后台请求刷新
            this.row.address = this.form.address;
            this.dialogFormVisible = false;//关闭弹窗
          }else{
            alert(111);
          }
        },
        //删除
        handleDelete(index,row){
          this.$prompt('标题名称','提示',{

          })
        },
        //每页数量变化
        pagehandleSizeChange(val) {
          this.pagesize = val
          this.loadData(this.pageindex, this.pagesize)
          //console.log(this.$store.state.count)
          //console.log(`每页 ${val} 条`);
        },
        //页码变化
        pagehandleCurrentChange(val) {
          this.pageindex = val
          this.loadData(this.pageindex, this.pagesize)
          //console.log(this.$store.state.count)
          //console.log(`当前页: ${val}`);
        },
        //请求后台，获取table 数据源
        async loadData(pageindex, pagesize){
          var obj = await httpService.userList(pageindex, pagesize)
          this.tableData = eval('('+obj.data.data.table+')') //将json字符串转成json array
          this.total = obj.data.data.pageCount
        }
      }
  }
</script>

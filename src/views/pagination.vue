<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="message">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    methods: {
      handleSizeChange(val) {//每个数量变化
        console.log(this.$store.state.count)
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {//页码变化
        console.log(this.$store.state.count)
        console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {
        currentPage4: 1,
        //myTotal: this.total
      };
    },
    /*props:{
        total:total
    }*/
    props: ['message']
  }
</script>
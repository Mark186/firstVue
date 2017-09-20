<template>
  <div class="hello">
    <GetAllUser></GetAllUser>
  </div>
</template>

<script>
import GetAllUser from './GetAlluser.vue'

export default {
  name: 'hello',
  data () {
    return { msg: 'Welcome to Your Vue.js App1111122' }
  },
  components:{
    GetAllUser
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

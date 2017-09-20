<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
body {
	margin: 0px;
	padding: 0px;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height:100%;
  overflow-x: hidden;

  position: absolute;
  top: 0;
  bottom: 0;
}
</style>

<script>
  import store from './vuex/store';
  import { initStore } from './vuex/action';
</script>

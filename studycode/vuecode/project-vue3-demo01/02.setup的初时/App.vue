<template>
  <div>哈哈哈哈{{str}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',

  setup() { // setup是组合API中第一个要使用的函数
    console.log("I'm coming....")
    const str = '我是字符串....'
    return {
      str
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

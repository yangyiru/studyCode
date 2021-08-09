<template>
  <h3>setup和ref的使用</h3>
  <h4>{{count}}</h4>
  <button @click="updateCount">add</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'App',
  // 需求: 页面打开后可以之间看到一个数据,点击按钮后,该数据可以发生变化
  // vue2 方式
  // data() {
  //   return {
  //     count: 0
  //   }
  // }, 
  // methods: {
  //   updateCount() {
  //     this.count ++
  //   }
  // }
  // vue3 方式
  setup() {
    // let count = 0; // 此时数据不是响应式数据
    let count = ref(0);  // ref函数定义一个响应式数据,返回一个Ref对象,对象中有一个value属性,可进行数据操作,
    // 只能进行基础数据操作
    function updateCount() {
      //  count是一个Ref对象,对象不能进行运算操作
      count.value++
    }
    return {
      count,
      updateCount
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

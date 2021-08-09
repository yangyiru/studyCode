<template>
  <h3>reactive的使用</h3>
  <div>
    <p>姓名：{{userInfo.name}}</p>
    <p>年龄：{{userInfo.age}}</p>
    <p>媳妇：{{userInfo.wife.name}}</p>
  </div>
  <hr>
  <button @click="updateUserInfo">update</button>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'App',

  // 需求：显示用户的相关信息，点击按钮，可以更新用户信息
  /*
    作用：定义多个数据的响应式
    const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
    响应式转换是“深层的”： 会影响对象内部多有嵌套的属性
    内部基于ES6 的Proxy实现，通过代理对象操作源对象内部数据都是响应式
  */ 
  setup() {
    const obj = {
      name: '张三',
      age: 24,
      wife: {
        name: '小甜甜',
        age: 20,
        cars: ['宝马', '特斯拉']
      }
    }
    // 把数据变成响应式数据
    // 返回的是一个Proxy的代理对象，被代理的目标对象就是obj对象（传入的对象）
    // userInfo 现在是Proxy对象（代理对象）， obj是目标对象
    const userInfo = reactive(obj)
    const updateUserInfo = () => {
      // obj.name = '1254'  直接使用目标对象的方式来更新目标对象中的成员的值，是不可能的，只能使用代理对象的方式来更新数据（响应式数据）
      userInfo.name += '===';
      userInfo.age += 1;
      userInfo.wife.name += '1125';
    }
    return{
      userInfo,
      updateUserInfo
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

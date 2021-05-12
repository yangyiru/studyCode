
<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <KForm :model="userInfo" :rules="rules">
      <KFormItem label="用户名：" prop="name">
        <KFormInput v-model="userInfo.name" placeholder="请输入用户名"/>
      </KFormItem>
      <KFormItem label="密码：" prop="password">
        <KFormInput v-model="userInfo.password" type="password" placeholder="请输入密码"/>
      </KFormItem>
    </KForm>
    {{userInfo.name}}
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import KForm from '@/components/KForm.vue'
import KFormInput from '@/components/KFormInput.vue'
import KFormItem from '@/components/KFormItem.vue'

export default {
  name: 'App',
  data() {
    return {
      userInfo: {
        name: '',
        password: ''
      },
      rules: {
        name: [{require: true, message: '用户名不能为空'}],
        password: [{require: true, message: '密码不能为空'}]
      }
    }
  },
  components: {
    HelloWorld,
    KForm,
    KFormItem,
    KFormInput
  }
}
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

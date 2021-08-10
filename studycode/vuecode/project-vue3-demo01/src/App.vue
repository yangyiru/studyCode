<template>
  <h3>App</h3>
  <h5>msg: {{msg}}</h5>
  <button @click="fn('----')">更新</button>
  <hr>
  <child :msg="msg" placeholder="I'm is $attrs数据">
    <div>
      我是slot的内容
    </div>
  </child>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import child from './components/child.vue';
export default defineComponent({
  name: 'App',
  components: {
    child
  },
  setup() {
    const msg = ref('Ada');
    function fn(param: any) {
      console.log('msg: ', msg, param)
      msg.value += param
    }
    return {
      msg,
      fn
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

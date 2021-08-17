<template>
  <h3>App</h3>
  <h5>msg: {{msg}}</h5>
  <button @click="fn('----')">更新</button>
  <hr>
  <child :msg="msg" placeholder="I'm is $attrs数据" @callback="fn">
    <div>
      我是slot的内容
    </div>
  </child>
  <p></p>
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
    // function callback(text: string) {
    //   msg.value += text
    // }
    return {
      msg,
      fn,
      // callback
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

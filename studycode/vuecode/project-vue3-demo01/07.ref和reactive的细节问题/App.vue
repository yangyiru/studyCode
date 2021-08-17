<template>
  <h3>ref和reactive的细节问题</h3>
  <h4>M1: {{m1}}</h4>
  <h4>M2: {{m2}}</h4>
  <h4>M3: {{m3}}</h4>
  <button @click="update">更新</button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
  name: 'App',
  setup() {
    const m1 = ref('12541')
    const m2 = ref({
      name: 'Ada',
      project: {
        name: '深圳'
      }
    })
    const m3 = reactive({
      name: 'Ada reactive',
      age: '15',
      wife: {
        name: '子集的自己'
      }
    })
    const update = () => {
      m1.value += '++++';
      m2.value.name += '====';
      m2.value.project.name += '232323232';
      m3.name += '---';
      m3.wife.name += '99';
    }
    return {
      m1,
      m2,
      m3,
      update
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

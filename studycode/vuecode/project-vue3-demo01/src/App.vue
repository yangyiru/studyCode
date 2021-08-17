<template>
  <h3>vue3的计算属性与监视</h3>
  <fieldset>
    <legend>表单</legend>
    <div>
      姓氏：<input type="text" v-model="user.firstName"> <br/>
      名字：<input type="text" v-model="user.lastName"><br/>
    </div>
  </fieldset>
  <fieldset>
    <legend>计算属性与监视</legend>
    <div>
      输出姓名1：<input type="text" placeholder="请输入姓名1" v-model="fullName1"> <br />
      输出姓名2：<input type="text" placeholder="请输入姓名2" v-model="fullName2"><br />
      输出姓名3：<input type="text" placeholder="请输入姓名3">
    </div>
  </fieldset>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    const user = reactive({
      firstName: 'Ada',
      lastName: 'yeung'
    });
    // 计算属性
    // 需求一：当编辑【姓氏】【名称】时，【输出姓名1】需要动态变化但是编辑【输出姓名1】时【姓名1】不需变化
    // 1. computed若只传入一个方法时，则说明是get
    const fullName1 = computed(() => {
      return user.firstName + '_' + user.lastName
    })
    // 2. 需求二：当修改【姓氏】【名称】时，【输出姓名2】需要动态变化且在修改【输出姓名2】时，相应的【姓氏】【名称】也会相应变化
    const fullName2 = computed({
      get() {
        return user.firstName + '_' + user.lastName
      },
      set(val: string) {
        console.log('val: ', val)
        const name = val.split('_');
        user.firstName = name[0];
        user.lastName = name[1];
      }
    })
    // 3. 需求三: 当编辑【姓氏】【名称】时，【输出姓名1】需要动态变化但是编辑【输出姓名1】时【姓名1】不需变化，请使用watch
    return {
      user,
      fullName1,
      fullName2
    }
  }
})
</script>
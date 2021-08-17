<template>
    <h3>Child 组件</h3>
    <h5>props msg: {{msg}}</h5>
    <p>
        <strong>$attrs label:</strong> 
        {{$attrs.placeholder}}
    </p>
    <!-- <h4>slot相关内容</h4>
    <div>
        <slot></slot>
    </div>
    <h4>$emit相关</h4> -->
    <button @click="handleEmit">emit按钮（我要传值给父组件）</button>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
    name: 'Child',
    props: ['msg'],
    // setup 细节问题
    // 一、执行问题
    // 1. setup在beforeCreate生命周期回调之前执行，并且就执行一次
    // 由此推断出：setup在执行的时候，当前的组件还没有创建出来，也就意味着： 组件实例对象this不能用
    // this是underfind, 所以不能通过this来访问 data / props / computed / methods

    // 二、setup 返回值
    // 1. setup返回值是一个对象，内部的属性可以在tempalte中使用
    // 2. setup中的对象内部属性和data函数中的对象的属性都可以在template模板中使用
    // 3. setup中的对象内部属性和data函数中的对象属性会合并成为组件对象的属性
    // 4. setup中的对象的方法会和methods中的方法合并成为组件对象的方法
    // 注意事项：
    // 1. 在vue3中尽量不要混合使用data和setup及methods和setup，但是在setup方法中方不能访问data和methods
    // 2. setup不能是一个async函数：因为返回值不再是return的对象，而是promise,模板看不到return对象中的属性数据

    // beforeCreate() {
    //     console.log('我是beforeCreate...')
    // },
    setup(props, context: any) {
        // console.log('我是setup。。。。')
        // console.log('this: ', this)
        // const childMsg = '我是child里面的定义的setup数据';
        // const childFn1 = () => {
        //     console.log('我是setup中定义的方法1')
        // }
        // return {
        //     childMsg,
        //     childFn1
        // }

        // props是父组件传给子组件的值
        // context包含attr(获取组件的属性，除props之外的所有属性)，emit(分发事件)， slot(插槽)
        console.log('setup的入参：', props)
        console.log('setup的context：', context)
        console.log('attr信息：', context.attrs.placeholder)
        const handleEmit = () => {
            context.emit('callback', '++++')
        }
        return {
            handleEmit
        }
    },
    // mounted() {
    //     console.log('this: ', this)
    // },
    // methods: {
    //     handleEmit() {
    //         this.$emit('callback', '我是传出来的值')
    //     },
    //     childFn2() {
    //         console.log('我是methods中定义的方法2')
    //     }
    // }
})
</script>
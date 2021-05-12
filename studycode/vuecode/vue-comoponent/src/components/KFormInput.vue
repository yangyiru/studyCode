
<template>
    <div>
        <!-- v-bind="$attrs" 展开$attrs -->
        <input v-bind="$attrs" :type="type" :value="value" @input="handleInput"/>
    </div>
</template>

<script >
export default {
    inheritAttrs: false, // 不继承$attrs 展开属性 避免设置到跟元素上
    props: {
        value: {
            type: String,
            defalut: ''
        },
        type: {
            type: String,
            default: 'text'
        }
    },
    // 方法集合
    methods: {
        handleInput(e) {
            this.$emit('input', e.target.value)

            // 通知父亲执行校验
            this.$parent.$emit('validate')
        }
    }
}
</script>


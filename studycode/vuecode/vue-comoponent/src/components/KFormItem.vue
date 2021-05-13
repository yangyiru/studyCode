<template>
    <div>
        <span v-if="label">{{label}}</span>
        <!-- 默认插槽 -->
        <slot></slot>
        <p v-if="error">{{error}}</p>
    </div>
</template>
<script>
import Schema from 'async-validator';
export default {
    inject: ['form'],
    components: {},
    props: {
        label: {
            type: String,
            defalut: ''
        },
        prop: {
            type: String,
            defalut: ''
        }
    },
    data() {
        return {
            error: ''
        }
    },
    mounted() {
        this.$on('validate', () => {
            this.validate()
        })
    },
    methods: {
        validate() {
            // 规则
            const rules = this.form.rules[this.prop];
            // console.log('规则：', this.form.rules[this.prop])
            // 当前值
            const value = this.form.model[this.prop];
            // console.log('当前值：', this.form.model[this.prop])
            // 校验描述对象
            const desc = {
                [this.prop]: rules
            };
            // console.log('desc: ', desc)
            const schema = new Schema(desc);
            // console.log('schema: ', schema)
            schema.validate({
                [this.prop]: value
            }, errs => {
                // console.log(errs, 'errs-----')
                if (errs) {
                    this.error = errs[0].message
                } else {
                    this.error = ''
                }
            })
        }
    },
}
</script>
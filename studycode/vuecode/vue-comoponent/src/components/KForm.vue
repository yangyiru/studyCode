
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script >
export default {
    provide() {
        return {
            form: this
        }
    },
    props: {
        model: {
            type: Object,
            require: true,
            defalut: () => {
                return {}
            }
        },
        rules: {
            type: Object,
            defalut: () => {
                return {}
            }
        }
    },
    data() {
        return {
            error: ''
        }
    },
    methods: {},
}
</script>
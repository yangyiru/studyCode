<template>
    <div class="gem-head-title-box">
        <span class="gem-head-title">
            <!-- 可以直接传props的title，也可以用slot自定义title -->
            <template v-if="title">{{title}}</template>
            <template v-else>
                <slot name="title"></slot>
            </template>
        </span>
        <div class="gem-head-title-btngroup">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'gem-inner-header',
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    methods: {

    }
}
</script>
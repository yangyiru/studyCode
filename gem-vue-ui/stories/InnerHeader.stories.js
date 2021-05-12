import GemInnerHeader from '../packages/GemInnerHeader/src/index.vue';

export default {
    title: 'Example/GemInnerHeader', // 设置整个stories的页面在侧边栏的名字，以【/】分隔符会被渲染成一级/二级目录
    component: GemInnerHeader, // 申明该页面对应的组件
    argTypes: { // 组件参数传递的定义
        title: { control: 'string' }
    },
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { GemInnerHeader },
    template: '<GemInnerHeader title="我是headr区域"/>',
});

export const GemInnerHeader = Template.bind({});
GemInnerHeader.args = {
    primary: true,
    label: 'GemInnerHeader',
};
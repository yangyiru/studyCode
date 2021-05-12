
import GemButton from '../packages/GemButton/src/index.vue';

export default {
  title: 'Example/Button', // 设置整个stories的页面在侧边栏的名字，以【/】分隔符会被渲染成一级/二级目录
  component: GemButton, // 申明该页面对应的组件
  argTypes: { // 组件参数传递的定义
    // backgroundColor: { control: 'color' },
    size: { 
      control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { GemButton },
  template: '<GemButton>测试按钮</GemButton>',
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'GemButton',
};
import 'element-ui/lib/theme-chalk/index.css'//引入el的样式
import './them-default/src/index.scss'
import GemButton from './GemButton/index'
import GemInnerHeader from './GemInnerHeader/index'

// 存储组件列表
const components = [GemButton, GemInnerHeader]

const install = function (Vue) {
    // 判断是否安装
    if (install.installed) return
    // 遍历注册全局组件
    components.forEach(component => {
        Vue.component('gem-button', component)
        Vue.component('gem-inner-header', component)
    })
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

//引入全部 导出的对象必须具有 install，才能被 Vue.use() 方法安装
export default { install }

import InnerHeader from './src/index.vue'

InnerHeader.install = function (Vue) {
    Vue.component(InnerHeader.name, Button)
}

export default InnerHeader
# vue-comoponent

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



# 笔记记录

## 知识要点

1. 组件通信方式
2. 组件复用
3. 递归组件
4. 组件构造函数和实例
5. 渲染函数
6. 组件挂载

### 组件化

Vue组件系统提供了一种抽象，让我们可以独立使用可复用的组件来构建大型应用，任意类型的应用界面都可以抽象成为一个组件库。组件化能提高**开发效率，方便重复使用，简化调试步骤，提升项目可维护行，便于多人协同开发**

![image-20210513185257410](E:\Alice yang\student\code\file\image-20210513185257410.png)

#### 组件通信常用方式

1. props

   **父给子传值**

   ```vue
   // child
   props: {msg: String}
   // parent
   <Helloworld msg="hello world"></Helloworld>
   ```

   **子传父**

   ```vue
   // child
   this.$emit('callback', true)
   
   // parent
   <good @callback="handleCallback($event)"></good>
   ```

2. eventBus 事件总线： 任意两个组件之前传值常用事件总线或者Vuex方式

   ```js
   class Bus {
   	constructor() {
   		this.callback = {}
       }
       $on(name, fn) {
           this.callback[name] = this.callback[name] || []
           this.callback[name].push(fn)
       }
       $emit(name, args) {
           if(this.callback[name]) {
               this.callback[name].forEach(cb => cb(args))
           }
       }
   }
   
   // main.js
   Vue.prototype.$bus = new Bus();
   
   // child1
   this.$bus.$on('foo', handle);
   
   // child2
   this.$bus.$emit('foo')
   ```

   

3. vuex：创建唯一的全局数据管理者store，通过它管理数据并通知组件状态变更

4. 自定义事件

   1. 边界情况

      + $parent / $root：兄弟组件之间通信可通过共同祖辈搭桥，$parent或$root

        ```vue
        // brother1
        this.$parent.$on('foo', handle)
        // brother2
        this.$parent.$emit('foo')
        ```

      + $children：父组件可以通过$children访问子组件实现父子通信

        > 注意：$children不能保证子元素顺序

        ```vue
        //parent
        this.$children[0].xxx = 'xxx'
        ```

      + $refs：获取子节点引用

        ```vue
        // parent
        <helloword></helloword>
        ```

      + provide/inject

        ```vue
        
        ```

        

   2. 非prop特性

      + $attrs
      + $listeners


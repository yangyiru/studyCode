# project-vue3-demo01

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

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



### 1. Composition API（常用部分）

#### 1. 1 setup

+ 新的option，所有的组合API函数都在此使用，只在初始化时执行一次

+ 函数如果返回对象，对象中的属性和方法，都可以在template中使用

  ```vue
  <template>
    <div>哈哈哈哈{{str}}</div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'App',
  
    setup() { // setup是组合API中第一个要使用的函数
      console.log("I'm coming....")
      const str = '我是字符串....'
      return {
        str
      }
    }
  });
  </script>
  ```

#### 1.2 ref

+ 定义一个数据的响应式（一般是定义一个基本类型的响应数据）

+ 语法：` const xxx = ref(initValue)`

  + 创建一个包含响应式数据的引用（reference）对象
  + js中操作数据`xxx.value`
  + template中使用不需要使用 `.value`

  ```vue
  <template>
    <h3>setup和ref的使用</h3>
    <h4>{{count}}</h4>
    <button @click="updateCount">add</button>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'App',
    setup() {
      let count = ref(0);  // ref函数定义一个响应式数据,返回一个Ref对象,对象中有一个value属性,可进行数据操作,
      // 只能进行基础数据操作
      function updateCount() {
        //  count是一个Ref对象,对象不能进行运算操作
        count.value++
      }
      return {
        count,
        updateCount
      }
    }
  });
  </script>
  ```

#### 1.3 reactive

+ 把数据变成响应式数据

+ ```const proxy = reactive(obj)```：接收一个普通对象然后返回该普通对象的响应式代理器对象

+ 响应式转换是“深层的”：会影响对象内部所有嵌套的属性

+ 内部基于ES6的Proxy实现，通过代理对象操作源对象内部数据是响应式的

  ```vue
  <template>
    <h3>reactive的使用</h3>
    <div>
      <p>姓名：{{userInfo.name}}</p>
      <p>年龄：{{userInfo.age}}</p>
      <p>媳妇：{{userInfo.wife.name}}</p>
    </div>
    <hr>
    <button @click="updateUserInfo">update</button>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive } from 'vue';
  
  export default defineComponent({
    name: 'App',
  
    // 需求：显示用户的相关信息，点击按钮，可以更新用户信息
    /*
      作用：定义多个数据的响应式
      const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
      响应式转换是“深层的”： 会影响对象内部多有嵌套的属性
      内部基于ES6 的Proxy实现，通过代理对象操作源对象内部数据都是响应式
    */ 
    setup() {
      const obj = {
        name: '张三',
        age: 24,
        wife: {
          name: '小甜甜',
          age: 20,
          cars: ['宝马', '特斯拉']
        }
      }
      // 把数据变成响应式数据
      // 返回的是一个Proxy的代理对象，被代理的目标对象就是obj对象（传入的对象）
      // userInfo 现在是Proxy对象（代理对象）， obj是目标对象
      const userInfo = reactive(obj)
      const updateUserInfo = () => {
        // obj.name = '1254'  直接使用目标对象的方式来更新目标对象中的成员的值，是不可能的，只能使用代理对象的方式来更新数据（响应式数据）
        userInfo.name += '===';
        userInfo.age += 1;
        userInfo.wife.name += '222';
      }
      return{
        userInfo,
        updateUserInfo
      }
    }
  });
  </script>
  ```

#### 1.4 vue2与vue3的响应式对比（******）

##### 1.4.1 vue2的响应式

+ **核心：** 

  + 对象：通过defineProperty对对象的已有属性值的读取和修改进行劫持（监视 / 拦截）
  + 数组：通过重写数组更新数组一系列更新元素的方法来实现元素修改的劫持

  ```js
  Object.defineProperty(data, 'count', {
  	get() {},
      set() {}
  })
  ```

+ **问题：**

  + 对象直接新添加的属性或删除已有属性，视图不会自动更新
  + 数组若直接通过下标替换元素或更新length，视图不会自动更新

##### 1.4.2 vue3的响应式

+ ###### 核心：

  + 通过Proxy（代理）：拦截对data任意属性的任意操作，包括属性的读写，属性的添加、删除等等....

  + 通过Reflect（反射）：动态对被代理对象的相应属性进行特定的操作

  + 文档

    + https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    + https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

    ```js
    new Proxy(data, {
      // 拦截读取属性值
      get(target, prop) {
        return Reflect.get(target, prop)
      },
      // 拦截设置属性值或添加新属性
      set(target, prop, value) {
          return Reflect.set(target, prop, value)
      },
      // 拦截删除属性
      deleteProperty(target, prop) {
          return Reflect.deleteProperty(target, prop)
      }
    })
    
    proxy.name = 'Ada'
    ```

    ```html
    <!DOCTYPE html>
    <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Proxy 与 Reflect</title>
        </head>
        <body>
            <script>
            	const user = {
                    name: 'Ada',
                    age: '20'
                }
                const proxyUser = new Proxy(user, {
                    get(target, prop) {
                        console.log('劫持get()', prop)
                        return Reflect.get(target, prop)
                    },
                    set(target, prop, val) {
                        console.log('劫持set()', prop, val)
                        return Reflect.set(target, prop, val)
                    },
                    deleteProperty(target, prop) {
                        console.log('劫持delete属性', prop)
                        return Reflect.deleteProperty(target, prop)
                    }
                })
                
       			// 读取属性值
                console.log(proxyUser === user);
                console.log(proxyUser.name === user.name);
                
                // 设置属性值
                proxyUser.name = 'Ada yeung';
                proxyUser.age = '21';
                console.log('设置属性后的user', user);
                
       		   // 添加属性
                proxyUser.sex = '女';
                console.log('添加属性后的user',user);
                
                // 删除属性
                delete proxyUser.sex;
                console.log('delete属性后的user',user);
            </script>
        </body>
    </html>
    ```

#### 1.5 setup细节

##### 1.5.1. setup执行时机

+ 在`beforeCreate`之前执行（一次），此时组件对象还没有创建
+ `this`是`underfind`,不能捅过this来访问`data / computed / methods / props`
+ 所有的`composition API`相关回调函数中也是不可以

##### 1.5.2 setup返回值

+ 一般返回一个对象：为模板提供数据，也就是模板中可以直接使用此对象的所有属性/方法
+ 返回对象中的属性会与`data`函数返回对象的属性合并成为组件对象的属性
+ 返回对象的方法会与`methods`中的方法合并成为组件对象的方法
+ 如果有重名，setup优先
  + **注意事项**
    + 一般不要混合使用：methods中可以访问`setup`提供的属性和方法，但在`setup`方法中不能访问`data`和`methods`
    + `setup`不能是一个`async`函数： 因为返回值不在是return的对象，而是`promise`, 模板看不到return对象中的属性数据

##### 1.5.3 setup参数

+ **`setup(props, context) / setup(props, {attrs, slots, emit})`**
  
  + **props**: 包含`props`配置声明且传入了的所有属性对象
  + **attrs：**包含没有在`props`配置中声明的属性的对象，相当于`this.$attrs`
  + **slots：**包含所有传入的插槽内容的对象，相当于`this.$slots`
  + **emit：**用来分发自定义事件的函数，相当于`this.$emit`
  
  ```vue
  // parent组件
  <template>
    <h3>App</h3>
    <h5>msg: {{msg}}</h5>
    <button @click="fn('----')">更新</button>
    <hr>
    <child :msg="msg" placeholder="I'm is $attrs数据" @callback="fn">
      <div>
        我是slot的内容
      </div>
    </child>
    <p></p>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import child from './components/child.vue';
  export default defineComponent({
    name: 'App',
    components: {
      child
    },
    setup() {
      const msg = ref('Ada');
      function fn(param: any) {
        console.log('msg: ', msg, param)
        msg.value += param
      }
      // function callback(text: string) {
      //   msg.value += text
      // }
      return {
        msg,
        fn,
        // callback
      }
    }
  });
  </script>
  ```
  
  ```vue
  // child 组件
  <template>
      <h3>Child 组件</h3>
      <h5>props msg: {{msg}}</h5>
      <!-- <p>
          <strong>$attrs label:</strong> 
          {{$attrs.placeholder}}
      </p>
      <h4>slot相关内容</h4>
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
      setup(props, context: any) {
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
      }
  })
  </script>
  ```

##### 1.5.4 reactive与ref的细节问题

+ `ref`与`reactive`是vue3的composition API中2个最重要的响应式API
+ `ref`用来处理基本类型数据，`reactive`用来处理对象（递归深度响应式）
+ 如果用ref定义对象或数组，内部会自动将对象/数组转换为reactive的代理对象
+ ref内部：通过给value属性添加getter/setter来实现对数据的劫持
+ reactive内部：通过使用Proxy来实现对对象内部的所有数据的劫持，并通过Reflect操作对象内部数据
+ ref的数据操作：在js中要`.value`,但是在template中则不需要（内部解析模板时会自动添加`.value`）

```vue
<template>
  <h3>ref和reactive的细节问题</h3>
  <h4>M1: {{m1}}</h4>
  <h4>M2: {{m2}}</h4>
  <h4>M3: {{m3}}</h4>
  <button @click="update">更新</button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
  name: 'App',
  setup() {
    const m1 = ref('12541')
    const m2 = ref({
      name: 'Ada',
      project: {
        name: '深圳'
      }
    })
    const m3 = reactive({
      name: 'Ada reactive',
      age: '15',
      wife: {
        name: '子集的自己'
      }
    })
    const update = () => {
      m1.value += '++++';
      m2.value.name += '====';
      m2.value.project.name += '232323232';
      m3.name += '---';
      m3.wife.name += '99';
    }
    return {
      m1,
      m2,
      m3,
      update
    }
  }
});
</script>

```


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

  1. ##### vue2的响应式

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

  2. ##### vue3的响应式

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

         

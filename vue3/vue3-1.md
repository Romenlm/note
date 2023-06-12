### 一、创建项目

##### 1。 基于webpack

```
vue create 项目名称
```

基于webpack的项目有一个问题，就是开发慢（编译慢），使用vite解决这个问题

vite的优势在开发过程中大大提升效率

##### 2。 基于vite

```
npm init @vitejs/app vitedemo
```

#### 二、vue2和vue3的区别

1. v-if 与 v-for 的优先级对比
   
   2.x 版本中 v-for > v-if
   
   3.x 版本中 v-if > v-for

2. v-for 中 ref 数组
   
   2.x 会自动把ref填充内容
   
   3.x 需要手动填充

3. $children 
   
   2.x 获取子组件对象
   
   3.x 移除该属性，使用ref代替

#### 三、setup

setup是一个组合式API 

解决什么问题： 使用（data,computed,methods,watch）组件选项来组织逻辑通常都很有效，然而，当我们组件开始变得更大时，逻辑关注点点列表也会曾长，导致组件难以阅读与理解。

3.1 setup 语法糖插件： unplugin-auto-import

解决的场景：在开发中，无需每次引入 import { ref, ...} from 'vue'

安装

```
npm install unplugin-auto-import -D


// vite.confing.js中配置
import AutoImport from '@unplugin-auto-import/vite' 

export defualt defineConfig({
    plugin: [
    Vue(),
    AutoImport({
    imports:['vue','vue-router']
})
    
]
})
```

#### 四、 生命周期

vue3的生命周期，使用setup代替beforeCreate和create。其他生命周期使用时前面添加一个on.

vue3生命周期：onBeforeMount,onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted

#### 五、toRefs的使用

* 为了使响应式对象在template中直接使用属性。

```vue
<template>
<div>
  toRefDemo:
  <p>{{name}}</p>
  <button @click="btn">修改name</button>
</div>
</template>
<script>
import {reactive,toRefs} from 'vue'
export default {
  name: "ToRefsDemo",
  setup(){
    let obj = reactive({
      name: '张三',
      age: 20
    })
    const btn = ()=>{
      obj.name = '李四'
    }
    return {
      ...toRefs(obj), // 使用toRefs后 template 中可以直接使用对象里面的数据
      btn
    }
  }
}
</script>
```

* setup 语法糖中使用

```
<template>
  <div>
    {{name}}
    <button @click="btn">修改name</button>
    <p>原始数据是否会改变{{obj.name}}</p>
  </div>
</template>

<script setup>
import {reactive,toRefs} from 'vue'
const obj = reactive({
  name: '张三',
  age: '20'
})

// 重新创建一个
const { name } = toRefs(obj)

/**
 * 修改后会影响以前的数据，修改后 obj.name 值也为 '李四'
 */
const btn = () => {
  name.value = '李四'
}
</script>
```

#### 六、computed

```
// 第一种用法
const obj = reactive({
  name: '张三',
  age: 20,
  str: computed(()=>{
    return obj.name.slice(1,2)
  })
})

// 第二种用法
let msg = computed(()=>{
  return '你好世界'
})

// 第三种用法
let content = computed({
  get(){
    return '测试'
  },
  set: (value)=>{
    // 设置其他变量的值
    obj.name = value
    console.log('设置了',value)
  }
})
```

#### 七、watch

```
// 监听数据变化
watch(name,(val)=>{
  console.log(val)
},{
  immediate:true,
  deep:true
})

// 监听对象
const obj = reactive({
  name: '张三',
  age: 20,
  o: {
    list: '列表'
  }
})
watch(obj,(val)=>{
  console.log(val)
})
// 不能监听到name的变化，下面一种方法才能做到监听
/*watch(obj.name,(val)=>{
  console.log('-----')
  console.log(val)
})*/
// 对象属性需要这样写才能监听到
watch(()=> obj.name,(val)=>{
  console.log('-----')
  console.log(val)
})


// 监听多个值
let msg = ref('xiaox')
let str = ref('zifuchuan')
watch([msg,str], (newValue,old)=>{

  console.log(newValue) // 一个数组，值为数组里面对应的值
  console.log(old) // 也是一个数组
})


// 立即执行
let mm = ref('立即执行监听')

watchEffect(()=>{
  // 直接输出就可以看到数据
  console.log(mm)
})
```

#### 八、路由: vue-router

* 参考路由文档

#### 九、v-model

实现案例

```
<template>
  <div>
    子组件
    <p>{{num}}</p>
    <button @click="update">修改</button>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  num: {
    type: Number,
    default: 100
  }
})
const emit = defineEmits(['update:num'])
const update = ()=>{
  emit('update:num',200)
}
</script>
```

#### 十、兄弟组件之间传值

1. 安装
   
   ```
   npm install mitt -S
   ```

2. plugins/Bus.js
   
   ```
   import mitt from 'mitt'
   const emitter = mitt()
   export default emitter
   ```

3. A组件
   
   ```
   import '../plugin/Bus.js'
   emitter.emit('fn',str)
   ```

4. B组件
   
   ```
   import '../plugin/Bus.js'
   emitter.on('fn',(e)=>{
       s.value = e.value
   })
   ```

#### 十一、异步组件

* 主要提升性能

##### vue3异步加载的方式

* 经过测试此方法是等其他组件加载完后再加载

```
/ 不带选项的异步组件
const asyncPage = defineAsyncComponent(() => import('./NextPage.vue'))

// 带选项的异步组件
const asyncPageWithOptions = defineAsyncComponent({
  loader: () => import('./NextPage.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

###### 场景一： 实现滑动到可视窗口再加载

下载包

```
npm install @vueuse/core -S
```

示例代码

```
<template>
<div>
<!--  异步组件 -->
<a-demo/>
  <b-demo/>
  <div ref="target">
    <c-demo v-if="targetIsVisible"/>
  </div>
</div>
</template>

<script setup>
import { useIntersectionObserver } from '@vueuse/core'
import ADemo from "../components/async/ADemo.vue";
import BDemo from "../components/async/BDemo.vue";
import {defineAsyncComponent,ref} from 'vue'
const CDemo = defineAsyncComponent(() => import('../components/async/CDemo.vue'))

// 使用懒加载方式实现
const target = ref(null)
const targetIsVisible = ref(false)
const { stop } = useIntersectionObserver(target,([{isIntersecting}])=>{
  if(isIntersecting){
    targetIsVisible.value = isIntersecting
  }
})
</script>
```



###### 场景二： 在组件中使用await



###### 场景三: 打包分包处理

* 异步组件可以在打包的时候将异步加载的组件分别打包到不同的文件里面,下面代码就可以实现分包
  
  ```
  const asyncPage = defineAsyncComponent(() => import('./NextPage.vue'))
  ```
  
  

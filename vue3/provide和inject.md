### provide和inject

##### 1. 使用场景

多层组件之间的传值

示例代码：

父代码

```vue
<template>
<div>
  传值
  <children/>
</div>
</template>

<script setup>
import Children from "./Children.vue";
import {provide, ref} from 'vue'
let num = ref('父组件的值')
// 第一个参数可以自定义，第二个参数是要传递的值
provide('provideInject',num)
</script>

```

子代码

```vue
<template>
<div>
  子组件
  <p>父组件传过来的值:{{data}}</p>
</div>
</template>

<script setup>
import { inject } from 'vue'
const data = inject('provideInject')
</script>
```

注：传过的数据是可以修改的，但由于数据是响应的，修改了之后会影响父组件的数据
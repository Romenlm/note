### 正则表达式

#### 1. 正则表达式的创建
 * 正则表达式包含模式和可选的修饰符。
 
 创建正则表达式的两种方式
 
 1. 较长一点的语法
 ```js
regexp = new RegExp("pattern", "flags");
```

2. 较短一点的语法
```js
regexp = /pattern/; // 没有修饰符
regexp = /pattern/gmi; // 伴随修饰符 g、m 和 i
```

#### 2. 搜索search
str.search(regexp) 方法返回的是找到的匹配项的索引位置，如果没找到则返回 -1。
```js
    /**
     * 搜索模式，加如搜索一个字符串中匹配的数据，使用search方法
     */
    let str = 'hello world'
    let search = /wor/
    console.log(str.search(search)) // 6 返回匹配到的字符串的位置
```

#### 3. 修饰符
1. i 使用此修饰符后，搜索时不区分大小写: A 和 a 没有区别，（如果不使用i,严格区分大小写）。
2. g 使用此修饰符后，搜索时会查找所有的匹配项，而不只是第一个。
3. m 多行模式。
4. u 开启完整的 unicode 支持。该修饰符能够修正对于代理对的处理。
5. y 粘滞模式

#### 4. str.match()

* 方法的行为取决于是否有 g 修饰符

1. 当没有g修饰符的时候，str.match(reg) 只会查找第一个匹配项。结果是一个数组，里面有该匹配项和额外的属性：
* index – 匹配项在字符串中所处在的位置，
* input – 原始字符串。

```js
    /**
     * str.match()
     * 没有g修饰符的时候
     */
    let str = 'hello world';
    let reg = /WOR/i;
    let result = str.match(reg)
    console.log(result[0]); // wor  表示匹配项
    console.log(result.index); // 6 返回匹配到的字符串位置
    console.log(result.input); // hello world 返回原始字符串
    let result2 = str.match(/hhh/i);
    console.log(result2) // null 没有匹配到返回null
```

使用到圆括号的时候
```js
    // 使用括号,如果模式的一部分被括号 (...) 括起来了，那么这部分将会独占数组的一个元素。有多少个括号就有括号+1个数组
    let reg2 = /hel(lo)( wor)/i
    let result3 = str.match(reg2)
    console.log(result3[0]) // world
    console.log(result3[2]) // ld
```

2. 使用修饰符g的时候

```js
    /**
     * str.match()
     * 当有g修饰符时，当使用 "g" 修饰符的时候，str.match 就会返回由所有匹配项组成的数组。在数组中没有额外的属性，而且圆括号也不会创建任何元素。
     */
    let str = 'hello world'
    let reg = /o/ig
    console.log(str.match(reg)) // ['o','o'] 返回匹配到的数组

    let reg1 = /l(o)/ig
    console.log(str.match(reg1)) // ['lo'] 使用括号时只放到一个数组中
```

【注】：如果str.match()没有匹配到返回的时null,不是空数组

#### 5. str.split(regexp|substr, limit)
使用 regexp（或子字符串）作为分隔符分隔字符串
```js
    /**
     * 使用str.split()分隔符分割字符串
     */
    let str = '2019-08-21';
    let arr = str.split('-');
    console.log(arr) // ["2019", "08", "21"] 返回一个数组
    // 也可以使用一个正则表达式
    let arr2 = str.split(/-/);
    console.log(arr2) // ["2019", "08", "21"]
```

#### 6. str.replace(str|reg, str|func)
搜索和替换字符串，如果直接使用字符串只会替换第一个匹配到的数据。需要使用regExp,使用g修饰符可以替换全部字符串
```js
    /**
     * str..replace(str|reg, str|func)
     */
    let str = '2019-08-21';
    let result = str.replace('-',':');
    console.log(result) // 2019:08-21 只匹配第一个

    let result1 = str.replace(/-/g,':');
    console.log(result1) // 2019:08:21 使用g修饰符匹配所有的数据并替换
```

第二个参数可以使用特殊符号
* $$	"$"
* $&	整个匹配项
* $`	匹配项前面的字符串部分
* $'	匹配项后面的字符串部分
* $n	如果 n 是一个 1-2 位的数字，那么这表示从左到右数第 n 个括号的内容

```js
    let str1 = 'hello world luomen,meili,luomen';
    let result2 = str1.replace(/luomen/g,'MS.$&')
    console.log(result2) // hello world MS.luomen,meili,MS.luomen
```

圆括号通常与 $1，$2 一起使用，就像下面的例子
```js
let str = "John Smith";
alert(str.replace(/(John) (Smith)/, '$2, $1')) // Smith, Johns 将两个位置替换
```

对于那些需要“智能”替换的场景，第二个参数可以是函数。调用该函数 func(str, p1, p2, ..., pn, offset, s) 的参数是：
* str — 匹配项，
* p1, p2, ..., pn — 圆括号里的内容（如果有的话），
* offset — 匹配项所在的位置，
* s — 源字符串。
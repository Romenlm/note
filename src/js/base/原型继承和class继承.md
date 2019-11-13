### 父类代码

```js
  /**
   * 创建一个父类
   * */
  function Person(name) {
    this.name = name;
    this.sum = function () {
      return 1+2;
    }
  }
  Person.prototype.age = 10;

  // 打印父类中的数据
  console.log(new Person().sum()) // 10
```



### 原型链继承

```js
  /**
   * 原型继承
   * 创建一个子函数
   */
  function Child() {
    this.gender = '男'
  }

  Child.prototype = new Person('张三'); // 使用原型继承父类
  let child = new Child()
  console.log(child.name) // 张三
  console.log(child.sum()) // 3
```

原理是使新的类的原型等于父类的实例

特点：1、实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。（新实例不会继承父类实例的属性！）

缺点：1、新实例无法向父类构造函数传参。

　　　2、继承单一。

　　　3、所有新实例都会共享父类实例的属性。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）



### 借用构造函数继承

```js
 /**
   *借用构造函数继承
   */
  function Child2() {
    Person.call(this,'luomen') // 使用call()对父类进行操作
    this.clazz = '软件'
  }
  let child2 = new Child2();
  console.log('------------借用构造函数继承------------')
  console.log(child2.name) // luomen
  console.log(child2.sum()+'--->'+ child2.clazz) // 3--->软件
```

原理： 用.call()和.apply()将父类构造函数引入子类函数

特点：1、只继承了父类构造函数的属性，没有继承父类原型的属性。

　　　2、解决了原型链继承缺点

　　　3、可以继承多个构造函数属性（call多个

　　　4、在子实例中可向父实例传参

 缺点：1、只能继承父类构造函数的属性。

　　　 2、无法实现构造函数的复用。（每次用每次都要重新调用）

　　　3、每个新实例都有父类构造函数的副本，臃肿


### 组合继承

```js
  /**
   * 组合继承
   */
  function Child3() {
    Person.call(this,'Romen');
    this.height = 175
  }
  Child3.prototype = new Person();
  let child3 = new Child3();
  console.log('-----------组合继承-------------')
  console.log(child3.name); // Romen
  console.log(child3.sum()); // 3
  console.log(child3.height); // 175
```

原理： 结合原型继承和借用构造函数继承（此种继承常用）

特点：1、可以继承父类原型上的属性，可以传参，可复用。

　　　2、每个新实例引入的构造函数属性是私有的。

缺点：调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。

### 原型式继承

```js
  /**
   * 原型式继承
   * 封装函数容器
   */
  function content(obj) {
    function Fun() {}
    Fun.prototype = obj
    return new Fun()
  }

  let child4 = content(new Person('menmen'))
  console.log('---------原型式继承--------')
  console.log(child4.name) // menmen
  console.log(child4.sum()) // 3
```

原理： 用一个函数包装一个对象，然后返回这个函数的调用

特点：类似于复制一个对象，用函数来包装。

缺点：1、所有实例都会继承原型上的属性。

　　　2、无法实现复用。（新实例属性都是后面添加的）

### 寄生式继承

```
 // 原型式继承
 function content(obj) {
    function Fun() {}
    Fun.prototype = obj
    return new Fun()
  }
  /**
   * 寄生式继承
   * 再在原型式上面再嵌套一层
   */
  function subo(obj) {
    let temp = obj;
    temp.ege = 'hello'
    return temp;
  }
  let child5 = subo(new Person('luomenmen'));
  console.log('----------寄生式继承--------')
  console.log(child5.name) // luomenmne
```

原理：就是给原型式继承外面套了个壳子。

优点：没有创建自定义类型，因为只是套了个壳子返回对象，这个函数顺理成章就成了创建的新对象。

缺点：没用到原型，无法复用

### 寄生组合继承

```js
function Fun(){}
Fun.prototype = Person.prototype;
function Sub(){
	Person.call(this)
}
Sub.prototype = new Fun('luoluo');
var child6 = new Sub();
console.log(child6.name) // luoluo
```



### class继承




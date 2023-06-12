class ClassTest {
  _name = 'luomen' ;// 受保护的，通过get/set在外部访问和设置
  #sex = "男";
  set name(name){
    this._name = name
  }
  get name(){
    return this._name
  }
  setSet(value){
    this.sex = value
  }
  getSex(){
    return this.sex
  }
}

let test = new ClassTest()
test._name = 'menmen'
console.log(test.name)
test.setSet('女')
console.log(test.getSex())

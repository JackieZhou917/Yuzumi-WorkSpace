# ‘==’ VS ‘===’
‘==’ 在判断是否相等的过程中会发生隐式类型转换，而 ‘===’ 则不会。

# 类型转换
1. 显式类型转换
    - String(x)  -> ToString(x)
    - Number(x)  -> ToNumber(x)
    - Boolean(x) -> ToBoolean(x)

## 引用类型转字符串
- String({a: 1})  -> ToString({a: 1}) -> ToPrimitive({a: 1}, String)

- ToPrimitive({a: 1}, String)
    1. 调用 {a: 1}.toString()，如果得到一个原始值，则返回
    2. 调用 {a: 1}.valueOf()，如果得到一个原始值，则返回
    3. 否则，报错

### toString()
    1. {}.toString()   // 返回 [object Object]
    2. [].toString()   // 返回数组内部的元素以逗号拼接得到的字符串
    3. 其他xx.toString()   // 返回xx的字符串表示: 'xx'(直接用引号引起来)

## 引用类型转数字
- Number({a: 1})  -> ToNumber({a: 1}) -> ToPrimitive({a: 1}, Number)

- ToPrimitive({a: 1}, Number)
    1. 调用 {a: 1}.valueOf()，如果得到一个原始值，则返回
    2. 调用 {a: 1}.toString()，如果得到一个原始值，则返回
    3. 否则，报错

### valueOf()
* valueOf() 只能将原始类型的包装类转换为原始值，引用类型还是原本的值。

### ToPrimitive(O, hint)
* 如果没有传入 hint，则其视同 hint为 Number，除非 O 是 Date 对象，在这种情况下，其 hint 视同为 String

## 引用类型转布尔值
所有的引用类型转换为布尔值都为 true


2. 隐式类型转换 什么时候发生？
    - 四则运算:  + - * / %
    - 判断语句: if  while  switch  ==  >=  <=  !=  >  <
    注意：
    1. ==  >=  <=  !=  >  <  这些符号的两边都会转为 Number类型，但最终整个式子还是 Boolean类型。
    2. ! 运算符的优先级最高，先将 ! 后面的转为 Boolean类型，再取反。

    - +作为一元运算符(朝Number转): 在一个值前面添加 + 号，将其转换为 Number 类型
    - +作为二元运算符
        x + y
        // 令 lprim 为 ToPrimitive(x)。 此时ToPrimitive(x)
        // 令 rprim 为 ToPrimitive(y) 的结果。
        // lprim + rprim
        // 如果 lprim 或者 rprim 有一个是字符串，就将另一个也转成字符串进行拼接
        // 否则全部转 number 进行相加





## ES5新增内置方法

#### 1. 查询商品
###### 1.将数据动态渲染到页面 使用forEach()
1. 先创建一个存放对象的数组
2. 使用forEach 遍历该数组 每一次都在tbody中动态生成tr  
3. 得到每一个对象 使用for in遍历对象  每一次都再tr中动态生成td

###### 2.按照 价格查询 
1. 获取价格那两个文本框 获取搜索button 获取trs 给每个tr自定义一个索引
2. 通过value得到文本框的两个价格
3. 通过trs获取tds 创建一个数组prices  存放tds[2].innerHTML得到所有的价格
4. 注册button点击事件 
5. 通过 filter 筛选数据prices  把符合两个价格区间的数据拿到 还有其对应的tr索引
6. 通过tr索引得到改行所有数据 通过一个对象数组返回到控制台

出现问题
trs[i].index = i;  // 这个自定义属性index并没有在页面中出现，但是它却是存在的，可以使用，不知道什么原理

###### 3.按照 商品名称查询
1. 获取商品名称查询大盒子 获取里面的input 和 button
2. 给button 注册点击事件
3. 获取input.value  
4. 使用some() 查询是否存在 然后返回那个对象
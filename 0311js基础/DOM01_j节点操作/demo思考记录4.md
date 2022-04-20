# 节点操作demo
### 1.下拉菜单
1. ​一个nav,无序列表构成 
2. 一个对应内容sub-nav, .nav>ul>li.sub-nav=ul>li
3. 获取元素：（1）.nav ul子元素li (2) .sub-nav 子元素ul
4. 注册事件 执行操作 for循环遍历（1），鼠标经过（1），显示（2）；鼠标移开（1）且鼠标移开（2） 隐藏（2）；

出现问题
1. 写了两个display,结果前面的背后的覆盖了，所以可见，书写的属性不显示的原因有两种（1）权重低（2）同名覆盖


### 2.发布留言
1. 一个大盒子.leave-word装整个留言板块 一个.word-input框输入留言， 一个button控制发布留言， li添加留言
2. 获取元素 .word-input  button li
3. 注册事件 button.onclick  点击发布
4. 执行程序 添加元素li 先创建 document.createElement('li') 再添加,保持最新评论置顶 parentNode.insertBefore(li, parentNode[2]) 

出现问题
1. 读取textarea中**用户写入的内容** 需要使用.value  使用textContent/innerText/innerHTML都无效，读取为空


### 3.删除留言 在2的基础上
1. 在发布留言时，给li添加一个删除留言的子元素按钮button以备使用
2. 获取  删除button 元素 
3. 注册事件 点击 删除button  -- 删除评论li

出现问题
1. 删除留言需要写到添加留言的内部， 否则在外部按照顺序只能获取未添加前的已知的内容
2. 删除当前节点所在的父节点 最好使用 removeChild(this.parentNode)


### 4.动态生成表格
1. 创建一个表格 分为thead 和 tbody
2. 动态生成表格所需要的数据 一般是来自后台（数据库），这里没有就用对象代替 创建一个对象数组存放数据
3. 遍历对象数组,得到tbody的行数  添加tr
4. 使用for k in obj遍历单个对象，得到每行的列数  添加td  使用innerHTML给每个对象赋值 obj[k]:对象属性值
5. 添加 操作列 td 使用appendChild(child) 追加每行的列  给列添加内容<a href='javaScript:;'>删除</a>  javaScript:;和javaScript:void(0);都是用来取消a的页面跳转功能的

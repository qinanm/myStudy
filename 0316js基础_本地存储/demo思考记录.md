### 本地存储 
#### 1. 记住用户名
1. 一个input输入数据name， 一个input为勾选框 
2. 当勾选框被勾选时，将name的值存储到本地 使用localStorage.setItem()  下次打开此页面时，文本框自动赋值当前姓名
3. 当勾选框取消勾选， 将name的值移除 使用localStorage.removeItem()
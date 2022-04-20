### 面向对象
##### 面向对象 tap 栏切换效果
功能需求
1. 点击tab栏，可以切换效果
2. 点击+号，可以添加tab项和内容项
3. 点击X号，可以删除当前的tab项和内容项
4. 双击tab项文字或者内容项文字，可以修改里面的文字内容

使用面向对象的方法，那么首先要封装一个对象 直接封装一个大tab栏对象
功能：
1. 切换tap栏  切换功能
2. 添加tap项和内容项  添加功能
3. 删除tap项和内容项  删除功能
4. 修改tap栏数据  修改功能


注意点
1. 具有测试用例 我们需要将所有点击事件初始化一下 所以需要一个初始化方法，为了能在new创建用例的时候就能使用，所以在构造函数中调用初始化方法

双击实现编辑功能最核心思路:
1. 双击文字时，在里面生成一个文本框，当失去焦点或者按下回车然后把文本框输入的值给原先的元素即可。
注意
1. 双击事件onbdlclick
2. 禁止双击选中：window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty();


重写一遍
1. 切换功能 
点击小li
切换小li类名
切换小section类名
需要排它
2. 添加功能
点击加号
初始化函数中写在更新函数前面
动态创建新元素(li和section都要创建) 使用新方法 insertAdjacentHTML(位置，html);
因为要创建的元素不是单元素 而是一个li里面包含两个span，所以使用深拷贝 cloneNode(true); 好吧 clone的方法是对的 但是好像直接赋值会更好
切换小li到当前新增点 == 切换小li类名，切换小section类名，到当前
3. 删除功能
点击X
X 是小li的子元素 可以获取小li的索引 index
判断效果类名是否在小li盒小section中 
如果在 且index>0  切换效果
如果不在 忽略 
使用remove（）删除对应的小 li和小 section
4. 修改功能
双击小li里的文字
双击小section里的文字
消除文字选中影响 window.getSelection() ? window.getSelection().removeAllRanges : document.selection.empty();
获取双击对象原先的内容 text
将双击对象的内容变成文本框 使用innerHTML 并将text赋值给input.value
使用input.select() 出现选中状态
注册离开事件 鼠标失去焦点 onblur 和 弹起enter键 e.keyCode==13






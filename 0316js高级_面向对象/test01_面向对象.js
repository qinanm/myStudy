// 封装一个tap类 
var that;
class Taps {
    constructor(id) {
       that = this;
       // 获取元素 
       this.main = document.querySelector(id);
    //    this.lis = this.main.querySelectorAll('li');
    //    this.sections = this.main.querySelectorAll('section');
       this.add = this.main.querySelector('.add');
       this.ul = this.main.querySelector('ul');
       this.tabscon = this.main.querySelector('.tabscon');
       this.init();
    }
    // 获取所有 小li和 section
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section'); 
        this.spans = this.main.querySelectorAll('.tabsbox nav li span:last-child');
        console.log(this.spans);
    }
    // 初始化方法
    init() {
        this.updateNode();
        // 给+add注册点击事件 实现添加
        this.add.onclick = this.addTap;
        // 给每个li注册点击事件 实现切换
        for (var i = 0; i < this.lis.length; i ++){
            this.lis[i].index = i; // 给每个li添加index属性并赋值
            this.lis[i].onclick = this.toggleTap; // 点击小li切换 注意这里调用方法不能加小括号 加了小括号会不等事件发生直接调用
            // 注册点击删除事件
            this.delete = this.lis[i].querySelector('span');
            this.delete.onclick = this.removeTap; // 点击删除
            // 注册双击 删除文字 并添加文本框
            this.spans[i].ondblclick = this.editTap;
            this.sections[i].ondblclick = this.editTap;
        }
        
    }
    // 排除类名 排它思想 lis 和sections
    removeClass() {
        for(var i = 0; i < this.lis.length; i ++){
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    // 1. 切换功能
    toggleTap() {
        that.removeClass();
        this.className = 'cur-taptop';
        that.sections[this.index].className = 'conactive';
    }
    
    // 2. 添加功能
    addTap() {
        var random = Math.random();
        // 使用新的方法 element.insertAdjacentHTML()
        that.removeClass();
        var htmlLi = '<li class="cur-taptop"><span>x</span>新选项卡</li>';
        var htmlSection = '<section class="conactive">测试'+random+'</section>';
        that.ul.insertAdjacentHTML('beforeend',htmlLi);
        that.tabscon.insertAdjacentHTML('beforeend',htmlSection);
        that.init();
    }
    // 3. 删除功能
    removeTap(e) {
        // 阻止冒泡 这一步真的很重要 防止切换li的点击事件
        e.stopPropagation(); 
        var index = this.parentNode.index;
        // 做个判断 如果删除的是当前点开的tap 才要进行重新赋值className的操作
        if(this.parentNode.className){
            // 排它 然后将效果给前一个元素 再删除
            that.removeClass();
            // 如果index != 0 那么列表长度>1
            if(index != 0) {
                // that.lis[index - 1].className = 'cur-taptop';
                // that.sections[index - 1].className = 'conactive';
                // 换种方式 手动使上一个处于选定状态
                that.lis[index - 1].click();
            } else if(that.lis.length != 1){ //如果index == 0  且 列表长度不为1
                // that.lis[index + 1].className = 'cur-taptop';
                // that.sections[index + 1].className = 'conactive';
                // 换种方式 同上
                that.lis[index + 1].click();
            } // 如果index == 0  列表长度为1 不再赋值className
        }
        // 删除法1 使用parentNode.removeChild(child)
        // that.tabscon.removeChild(that.sections[index]);
        // that.ul.removeChild(this.parentNode);
        // 删除法2 remove() 直接删除指定下标的元素
        that.sections[index].remove();
        that.lis[index].remove();
        that.init(); // 重新注册点击事件
    }
    // 4. 修改功能
    editTap() {
        // 禁止双击选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); 
        // 存储原先文字
        var beforetext = this.innerHTML;
        // 动态生成一个文本框 
        this.innerHTML = '<input type="text" class="edit" value="'+beforetext+'">';
        // 获取该元素
        var edit = document.querySelector('.edit');        
        edit.select(); // 使文本框的文字处于选定状态 
        // 注册失去焦点事件  删除文本框 将文本框的值赋值给li
        edit.onblur = function(){
            console.log(this.value);
            this.parentNode.innerHTML = this.value;
        }
        // 注册按下回车事件，实现同等功能
        edit.onkeyup = function(e){
            if(e.keyCode == 13){
                this.blur();
            }
        }
    }
}
new Taps('#tab');
// 封装一个tap对象 实现切换 添加 删除 修改功能
var that = null;
class Tags{
    constructor(id){
        that = this;
        // 获取元素 
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.add');
        this.liparent = this.main.querySelector('.liparent');
        this.secparent = this.main.querySelector('.tabscon');
        this.init();   
    }
    // 用于存放不断更新 且需要一次获取多个的元素 
    updateTag(){
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.deletes = this.main.querySelectorAll('li span:first-child');
        this.liText = this.main.querySelectorAll('li span:last-child');
    }
    // 初始化所有事件
    init() {
        // 给加号注册点击事件
        this.add.onclick = this.addTag;
        this.updateTag(); // 每次初始化 先更新元素
        // 点击事件 切换功能 调用对象小li for循环给小li注册事件
        for(var i = 0; i < this.lis.length; i ++) {
            // 给每个小li自定义一个下标属性 作为索引
            this.lis[i].index = i;
            // 每个小li注册点击事件 切换功能
            this.lis[i].onclick = this.switchTag;
            // 给每个X注册点击事件 删除功能
            this.deletes[i].onclick = this.removeTag;
            // 给每个litext和section注册双击事件 修改内容
            this.liText[i].ondblclick = this.editTag;
            this.sections[i].ondblclick = this.editTag;
        }
    }
    // 封装排它思想功能 就是删除其它的li和section的类名
    removeClassName(){
        // this.updateTag();
        for(var i = 0; i < this.lis.length; i ++){
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }

    // 切换功能
    switchTag(){
        that.removeClassName();
        var index = this.index; // 获取li当前索引
        this.className = 'cur-taptop';
        that.sections[index].className = 'conactive';
    }
    // 添加功能
    addTag(){
        var random = Math.random();
        var htmlli = '<li><span>x</span><span>新选项卡</span></li>';
        var htmlsection = '<section>新选项内容：'+random+'</section>'
        that.liparent.insertAdjacentHTML('beforeend', htmlli);
        that.secparent.insertAdjacentHTML('beforeend', htmlsection);
        that.init(); // 添加后重新注册事件
        that.lis[that.lis.length-1].click(); // 手动点击切换 注意后面要加括号
    }
    // 删除功能
    removeTag(e){
        e.stopPropagation(); //清除冒泡
        var index = this.parentNode.index; // 得到对应父元素小li的索引
        if(this.parentNode.className === 'cur-taptop'){
            if(index==0){
                that.lis[index+1].click();
            }else{
                that.lis[index-1].click();
            }   
        }
        that.lis[index].remove();
        that.sections[index].remove();
        // 删完一次就要记得初始化 更新数据信息
        that.init();
    }
    // 修改功能
    editTag(){
        // 清除双击选中效果
        window.getSelection() ? window.getSelection().removeAllRanges() : document.getSelection.empty();
        // 存储原先内容
        var text = this.innerHTML;
        // 改变内容为文本框 将原先内容赋值给文本框的value
        this.innerHTML = '<input type="text" class="edit" value="'+text+'">';
        // 获取这个元素
        var input = document.querySelector('.edit');
        // 选中文字
        input.select();
        // 给input注册失去焦点事件 将内容赋值给this.parentNode 清除input
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
        };
        // 给input注册弹起enter键 和失去焦点同等效果
        input.onkeyup = function(e) {
            if(e.keyCode == 13){
                this.blur();
            }
        };
    }
}
new Tags('#tab');
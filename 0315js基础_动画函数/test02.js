// 等页面文档加载完毕后再执行事件
window.addEventListener('load', function(){
    // 获取元素
    var focus = document.querySelector('.focus');
    var lArrow = focus.querySelector('.l-arrows');
    var rArrow = focus.querySelector('.r-arrows');

    // 鼠标经过轮播图focus，显示左右箭头，离开隐藏 停止自动播放
    focus.addEventListener('mouseenter', function(){
        lArrow.style.display = 'block';
        rArrow.style.display = 'block';
        // 清除定时器
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function(){
        lArrow.style.display = 'none';
        rArrow.style.display = 'none';
        // 打开定时器
        timer = setInterval(function(){
            // 模仿手动点击右箭头
            rArrow.click();
        },2000)
    });

    // 动态生成小圆圈 小圆圈点击事件--1. 排他添加背景色 2.移动图片位置
    var ul = focus.querySelector('ul');
    var img = ul.querySelector('img');
    var distance = img.clientWidth;
    console.log(distance);
    var ol = focus.querySelector('.circle');
    var length = ul.children.length; 
    var num = 0; // 每点击一次 图片滚动一次 动画的计数器
    var circle = 0; // 小圆点的计数器 

    // 封装一个小圆圈current改变的函数
    function currentTrans(index){
        // 消除其他的current
        // 其他都没有 循环赋值className = ''消除其他影响
        for(var i = 0; i < ol.children.length; i++){
            ol.children[i].className = '';
        }
        // 只有我有
        ol.children[index].className = 'current';
    }
    // 根据获得图片数量来动态添加小圆圈
    for(var i = 0; i < length; i++){
        var li = document.createElement('li'); // 创建元素
        ol.appendChild(li); // 添加元素
        li.setAttribute('index', i); //自定义小圆圈的索引属性
        // console.log(li.getAttribute('index'));
        // 注册点击小圆圈事件 出现.current效果 注意排他 
        li.addEventListener('click', function(){
            // // 其他都没有 循环赋值className = ''消除其他影响
            // for(var i = 0; i < ol.children.length; i++){
            //     ol.children[i].className = '';
            // }
            // // 只有我有
            // this.className = 'current';
            // 移动相应图片位置 移动的距离=小圆圈的索引*图片的宽度 使用自定义索引index
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            currentTrans(index);
            animation(ul, -index * distance);
        })
    }

    // 把ol的第一个小圆圈设置为current
    ol.children[0].className = 'current';

    // 在ul末尾动态添加一个从第一个li深拷贝过来的li
    ul.appendChild(ul.children[0].cloneNode(true)); // node.cloneNode() 参数为true为深拷贝
    

    // 点击左右箭头
    // 点击右侧 箭头 一次向左移动一张照片的宽度
    var flag = true;
    rArrow.addEventListener('click', function(){
        if(flag){
            // 防止点击过快 节流阀
            flag = false;  // 关闭节流阀
            if(num == ul.children.length-1){
                num = 0;
                ul.style.left = '0';
            }
            num++;
            animation(ul, -num*distance, function(){
                flag = true; // 打开节流阀 回调函数在整个动画执行完毕后执行
            });
            if(circle == ol.children.length - 1){
                circle = -1;
            }
            circle++;
            // console.log(circle);
            currentTrans(circle);
        }
    })
    // 点击左侧 箭头 一次向左移动一张照片的宽度
    lArrow.addEventListener('click', function(){
        if(flag){
            // 防止点击过快 节流阀
            flag = false;  // 关闭节流阀
            if(num == 0){
                num = ul.children.length-1;
                ul.style.left = -num*distance + 'px';
            }
            num--;
            animation(ul, -num*distance, function(){
                flag = true; // 打开节流阀 回调函数在整个动画执行完毕后执行
            });
            circle--;
            if(circle == -1){
                circle = ol.children.length - 1;
            }
            // console.log(circle);
            currentTrans(circle);
        }
    })

    // 无操作自动播放 定时器
    var timer = setInterval(function(){
        // 模仿手动点击右箭头
        rArrow.click();
    },2000)

})
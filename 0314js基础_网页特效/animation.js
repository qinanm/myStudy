// 封装一个自己写的动画函数
function animation(obj, target, callback){
    // 在定时器开始之前 先清除先前的定时器
    clearInterval(obj.timer);
    var step = 0; // 缓动步长变量
    // 定时器
    obj.timer = setInterval(function(){
        var curY = window.pageYOffset; // 获取元素当前位置
        // 定时器终止条件 到达目的位置
        if(curY == target){
            clearInterval(obj.timer);
        }
        step = (target-curY)/10; // 缓动核心算法
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // obj.style.top = curY + step + 'px'; // 移动元素
        window.scroll(0, curY + step)
    },30)
    // 回调函数 写法一
    // if(callback){
    //     callback();
    // }
    // 写法二
    callback && callback(); // 短路运算
}
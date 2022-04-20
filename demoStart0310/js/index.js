// 背景图片效果
// 1. 获取元素
var bg_imgs = document.querySelectorAll('.bg_img');
// console.log(bg_imgs);
// 2. 操作元素 点击图片bg_img 当前图片变成body背景图
for (var i = 0; i < bg_imgs.length; i ++) {
    bg_imgs[i].onclick = function() {
        console.log('成功点击');
        // 获取body元素的特殊写法 document.body 使用字符串拼接出地址
        document.body.style.backgroundImage = 'url('+this.src+')';
    }
}
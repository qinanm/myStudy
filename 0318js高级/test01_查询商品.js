// 功能1：将数据动态渲染到页面 使用forEach()
// 1. 先创建一个存放对象的数组
// 2. 使用forEach 遍历该数组 每一次都在tbody中动态生成tr  
// 3. 得到每一个对象 使用for in遍历对象  每一次都再tr中动态生成td

// 创建存放对象的数组
var objs = [{ 
    id: 1,
    uname: '华为',
    price: 6000 
},
{ 
    id: 2,
    uname: '小米',
    price: 5000 
},
{ 
    id: 3,
    uname: '苹果',
    price: 4000 
},
{ 
    id: 4,
    uname: '魅族',
    price: 3000 
},]

// 获取元素
var tbody = document.querySelector('tbody');
var searchPrice = document.querySelector('.sech_price');
var inputPrice = searchPrice.querySelectorAll('input');
var searchBtn = searchPrice.querySelector('button');

// 功能1 渲染数据到页面
// 使用forEach遍历对象数组
function setObjs(data){
    // 可能会多次使用 所以每次渲染前要先清空tbody
    tbody.innerHTML = '';
    data.forEach(function(value, index){
        // 我写的第一版
        // tbody.appendChild(document.createElement('tr')); // 不断添加tr
        // var trs = document.querySelectorAll('tbody tr'); // 获取所有的tr
        // // 遍历每一个对象，给tr添加td
        // var i = 0;
        // for (var k in value){
        //     trs[index].appendChild(document.createElement('td'));
        //     var tds = trs[index].querySelectorAll('td'); //获取所有的td
        //     if(i < tds.length){
        //         tds[i++].innerHTML = value[k]; 
        //     } else{
        //         i = 0;
        //     }
        // }
    
        // pink老师的更简单 升级版 使用innerHTML  呜呜 代码简单好多
        // var tr = document.createElement('tr'); //创建tr
        // tr.innerHTML = '<td>'+value.id+'</td><td>'+value.uname+'</td><td>'+value.price+'</td>';  //给tr赋值 
        // tbody.appendChild(tr);
    
        // 看了pink老师的代码， 我在尝试优化一下我之前的代码 ，现在看看真的冗余 我写的第二版
        var tr = document.createElement('tr');  // 创建tr
        for (var k in value){ // 给tr添加td 并给td赋值 再将td 添加到tr上
            var td = document.createElement('td');
            td.innerHTML = value[k];
            tr.appendChild(td);
        }
        tbody.appendChild(tr); // 最后将tr添加到tbody上
        // 太好了 可以实现 而且会比pink老师的更智能，因为是动态获取td的元素，而且甚至不需要直到对象的属性名
    });
}
setObjs(objs);


// 功能2：按照 价格查询  我写的 第一版 问题想的太复杂了
// 1. 获取价格那两个文本框 获取搜索button 获取trs 给每个tr自定义一个索引
// 2. 通过value得到文本框的两个价格
// 3. 通过trs获取tds 创建一个数组prices  存放tds[2].innerHTML得到所有的价格
// 4. 注册button点击事件 
// 5. 通过 filter 筛选数据prices  把符合两个价格区间的数据拿到 还有其对应的tr索引
// 6. 通过tr索引得到相应的商品名称

// 获取元素
// var searchPrice = document.querySelector('.sech_price');
// var inputPrice = searchPrice.querySelectorAll('input');
// var searchBtn = searchPrice.querySelector('button');
// var trs = tbody.querySelectorAll('tr');

// // 设置tr索引， 获得tds 得到prices数组
// var prices = [];
// for(var i = 0; i < trs.length; i ++){
//     trs[i].index = i;  // 这个自定义属性index并没有在页面中出现，但是它却是存在的，可以使用，不知道什么原理
//     // console.log(trs[i].index);
//     var tds = trs[i].querySelectorAll('td');
//     prices.push(parseInt(tds[2].innerHTML));
// }
// console.log(prices);

// 注册searchBtn点击事件  
// searchBtn.addEventListener('click', function(){
//     // 获取两个输入框的数据
//     var min = parseFloat(inputPrice[0].value);
//     var max = parseFloat(inputPrice[1].value);
//     console.log(max);
//     console.log(min);
//     // 对两输入框的数据进行判断
//     if(min > max || min < 0){
//         alert('输入数据不合理，请重新输入');
//     } else {
//         // 输入合理，开始查询数据
//         var newprices = prices.filter(function(value, index){
//             return value >= min && value <= max;
//     })
//     console.log(newprices); // 输出筛选出来的价格
//     }
// })

// pink 老师提供的思路 起始就是获取数据的方法，pink老师直接用现有的对象数组了
// 功能2：按照 价格查询

// 注册点击事件
searchBtn.addEventListener('click', function(){
    // 获取用户输入的数据
    var min = parseFloat(inputPrice[0].value);
    var max = parseFloat(inputPrice[1].value);
    if(min > max || min < 0) {
        alert('输入数据不合理，请重新输入');
    } else {
        // 输入合理，开始查询数据 使用filter()
        var newobjs = objs.filter(function(value){
            return value.price >= min && value.price <= max;
        })
        console.log(newobjs);
        // 把筛选后的对象渲染到页面中
        setObjs(newobjs);
    } 
})

// 功能 3.按照 商品名称查询
// 1. 获取商品名称查询大盒子 获取里面的input 和 button
// 2. 给button 注册点击事件
// 3. 获取input.value  
// 4. 使用some() 查询是否存在 然后返回那个对象 
var seacrhName = document.querySelector('.sech_name');
var inputName = seacrhName.querySelector('input');
var queryBtn = seacrhName.querySelector('button');

queryBtn.addEventListener('click', function(){
    var uname = inputName.value;
    var newobjs = [];
    objs.some(function(value){
        if(uname === value.uname){
            newobjs.push(value);
            setObjs(newobjs);
            return true;
        } else{ 
            alert('您输入的商品名称不存在，请重新输入');
            return false;
        }
    })
})




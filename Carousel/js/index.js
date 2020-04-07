let $a=$(".indicators a");
let $span=$(".indicators span");
let array = ["p1","p2","p3","p4"];
// let array = ["p1","p2","p3","p4","p5","p6","p7"];
let index = 0;

$(".pre_btn").click(function() {
    preImage();
})

$(".next_btn").click(function() {
    nextImage();
})

function reorganization () {
    //i是元素的索引，e为当前处理的元素
    //each循环，当前处理的元素移除所有的class，然后添加数组索引i的class
    $("li").each(function(i,e){
        $(e).removeClass().addClass(array[i]);
    })
}
function preImage () {
    //把最后一张移动到第一个位置
    array.unshift(array[array.length-1]);
    array.pop();

    reorganization();

    index--;
    if (index<0) {
        index=array.length-1;
    }
    show();
}
function nextImage () {
    //把第一张移动到最后位置
    array.push(array[0]);
    array.shift();
    
    reorganization();

    index++;
    if (index>array.length-1) {
        index=0;
    }
    show();
}

$a.each(function(){
    $(this).click(function(){
        let myIndex = $(this).index();
        let b = myIndex - index;
        if (b === 0) return;
        if (b > 0) {
            /*
            * splice(0,b)的意思是从索引0开始,取出数量为b的数组
            * 因为每次点击之后数组都被改变了,所以当前显示的这个照片的索引才是0
            * 所以取出从索引0到b的数组,就是从原本的这个照片到需要点击的照片的数组
            * 这时候原本的数组也将这部分数组进行移除了
            * 再把移除的数组添加的原本的数组的后面
            */
            let newArray = array.splice(0,b);
            array = $.merge(array,newArray);
            reorganization();
            index = myIndex;
            show();
        } else {
            /*
            * 因为b<0,所以取数组的时候是倒序来取的,也就是说我们可以先把数组的顺序颠倒一下
            * 而b现在是负值,所以取出索引0到-b即为需要取出的数组
            * 也就是从原本的照片到需要点击的照片的数组
            * 然后将原本的数组跟取出的数组进行拼接
            * 再次倒序,使原本的倒序变为正序
            */
            array.reverse();
            let oldArrary = array.splice(0,-b);
            array = $.merge(array,oldArrary);
            array.reverse();
            reorganization();
            index = myIndex;
            show();
        }
    })
})

//改变底下按钮的背景色
function show(){
    $($span).eq(index).addClass("blue").parent().siblings().children().removeClass("blue");
}

$(document).on("click",".p3",function(){
    preImage();
    return false;
})

$(document).on("click",".p1",function(){
    nextImage();
    return false;
})
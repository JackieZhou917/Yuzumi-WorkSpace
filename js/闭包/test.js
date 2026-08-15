var arr = []

for (var i = 1; i <= 5; i++) {
    function fn(j) {
        arr.push(function() {
            console.log(j);
        })
    }
    fn(i)
}



// for循环调用数组中每一个函数
for(let k = 0; k < arr.length; k++){
    arr[k]()
}
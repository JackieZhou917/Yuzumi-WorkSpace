// function bar() {
//     console.log(myName);
// }

// function foo(){
//     var myName = 'yuzumi';
//     bar()
// }
// var myName = '柚'
// foo();

let count = 1;
function main(){
    let count = 2;
    function bar(){
        let count = 3;
        foo();
    }
    bar();
}
function foo(){
    console.log(count); 
}

main();
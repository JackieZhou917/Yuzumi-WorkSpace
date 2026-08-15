
function foo() {
    var myName = 'yuzumi'
    var age = 18
    function bar() {
        console.log(myName);
       
    }
    return bar
}

var baz = foo()
baz()
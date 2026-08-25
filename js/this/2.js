// var a = 1    // === window: {a:1}
// function foo() {
//     console.log(this.a);
    
// }

// function bar() {
//     var a = 2
//     foo()
// }

// bar()

var a = 1

function bar() {
    var a = 2
    function foo() {
        console.log(this.a);
    }
    foo()
}

bar()
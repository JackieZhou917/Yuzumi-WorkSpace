function  fn(a) {
    console.log(a); //[Function: a]
    var a = 123;
    console.log(a); //123
    function a() {}
    var b = function b() {}
    console.log(b); //[Function: b]
    function c() {}
    var c = a;
    console.log(c); //123
}

AO = {
    // a: undefined,
    // a: 1,
    // a: Function,
    a: 123,
    // b: undefined,
    b: Function,
    // c: undefined
    // c: Function
    c: 123
}

fn(1);

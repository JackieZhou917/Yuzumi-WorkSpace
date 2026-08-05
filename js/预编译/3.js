function foo(a, b) {
    console.log(b); //[Function: b]
    c = 0;
    var c;
    a = 3;
    b = 2;
    console.log(b); // 2
    function b() {}
    console.log(b); //2
}

foo(1);

AO  = {
    // a: undefined,
    // a: 1,
    a: 3,
    // b: undefined,
    // b: Function,
    b: 2,
    // c: undefined
    c: 0
}
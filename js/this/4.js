function foo(x, y) {
    console.log(this.a, x + y);
}

var GGbond = {
    a: 1
}

var FF = {
    a: 2
}

var CRQ = {
   a: 3
}

foo.call(GGbond, 1, 2)

foo.apply(FF, [2,3])

// const bar = foo.bind(CRQ, 3, 4)
// bar()

// const bar = foo.bind(CRQ)
// bar(3, 4)

// const bar = foo.bind(CRQ, 3)
// bar(4)

foo.bind(CRQ, 3, 4)()
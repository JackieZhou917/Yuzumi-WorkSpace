const stack = [];

stack.push(1);
stack.push(2);
stack.push(3);


while (stack.length > 0) {
    const val = stack.pop()
    console.log(val); 
}
function add() {
    let count = 0;
    function plus(){
        console.log(++count); 
    }
    return plus
}

var plus = add()
plus()
plus()
plus()
plus()
plus()
plus()
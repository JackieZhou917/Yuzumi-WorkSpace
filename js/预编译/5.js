// var g = 100;
// function fn() {
//     console.log(g);
// }
// fn();

// GO = {
//     golbal: undefined, 100, 
//     fn: function fn() {}, 
// }

global = 100;
function fn() {
    console.log(global); //undfined
    global = 200;
    console.log(global); // 200
    var global = 300;
}

// AO = {
//     global: undefined, 200, 300
// }

fn();
var global;
var queue = []
var input = 0
//on load
function init() {
    document.getElementById("txt").value = "0"
    document.body.style.zoom = "200%" 
}
//for backspacing on display key
function bksp() {
    var value = document.getElementById("txt").value;
    if (value.length > 1) {
        queue.pop();
        input = queue.slice(-1)
        document.getElementById("txt").value = value.substr(0, value.length - 1);
        console.log("Bckp Queue: " + queue);
        console.log("Bckp Input: " + input);
    }
    else if (value.length == 1) {
        document.getElementById("txt").value = "0";
        queue = [];
        input = queue.slice(-1)
        console.log("Bckp Queue: " + queue);
        console.log("Bckp Input: " + input);
    }
    document.getElementById("backspace").style.backgroundColor = "#4d2600";
}
//factorial of a number
function fact() {
    var inp = parseInt(document.getElementById("txt").value);
    var i, fact = 1;
    for (i = 1; i <= inp; i++) {
        fact = fact * i;
    }
    if (document.getElementById("txt").value != "0") {
        document.getElementById("txt").value = fact
    }
    else {
        document.getElementById("txt").value = 1
    }
    input = fact
    document.getElementById("factorial").style.backgroundColor = "#4d2600";
}
//clear data
function clr() {
    queue = [];
    input = 0;
    document.getElementById("txt").value = "0";
    console.log("Eq Queue: " + queue);
    console.log("Eq Input: " + input);
    document.getElementById("clear").style.backgroundColor = "#4d2600";
}
//show alert on dividing by zero
function dispOnDivZero() {
    var inp = document.getElementById("txt").value
    var inp_arr = inp.split("")
    var l = inp_arr.length;
    var i;
    for (i = 0; i < l - 1; i++) {
        if (inp[i] == "/" && inp[i + 1] == "0") {
            alert("Divisibility by zero is not possible.")
            document.getElementById("txt").value = "0"
            document.getElementById("zero").style.backgroundColor = "beige";
            document.getElementById("zero-zero").style.backgroundColor = "beige";
        }
    }
}
//on enter key presss
function KeyInpData() {
    var inp_data = document.getElementById("txt").value
    var res = inp_data.split("")
    queue = res;
    calculateQueue();
}
//action listener for enter key press
function epresskey(event) {
    if (event.keyCode == 13 || event.which == 13) 
    {
        KeyInpData();
    }
    if((event.keyCode == 8 || event.which == 8) || (event.keyCode == 46 || event.which == 46)  )
    {
        bksp();
        alert("Working")
    }
}
//calculate answer
function calculateQueue() {
    var tLeft, tRight, i;

    if (input !== 0) {
        input = parseFloat(input);
        addToQueue(input);
    }
    console.log(queue)
    //Handle Divide
    for (i = 0; i <= queue.length; i++) {
        if (queue[i] == '0') {
            queue.splice(i, 1)
        }
        cItem = queue[i];
        if (cItem == '/') {
            tLeft = parseFloat(queue[i - 1]);
            tRight = parseFloat(queue[i + 1]);
            nVal = tLeft / tRight;
            queue[i - 1] = nVal;
            queue.splice(i, 2);
            i = i - 1
        }
    }
    //Handle Multiply
    for (i = 0; i <= queue.length; i++) {
        cItem = queue[i];
        if (cItem == '*') {
            tLeft = parseFloat(queue[i - 1]);
            tRight = parseFloat(queue[i + 1]);
            nVal = tLeft * tRight;
            queue[i - 1] = nVal;
            queue.splice(i, 2);
            i = i - 1
        }
    }

    //Handle Plus
    for (i = 0; i < queue.length; i++) {
        cItem = queue[i];
        if (cItem == '+') {
            tLeft = parseFloat(queue[i - 1]);
            tRight = parseFloat(queue[i + 1]);
            nVal = tLeft + tRight;
            queue[i - 1] = nVal;
            queue.splice(i, 2);
            i = i - 1
        }
    }

    //Handle Minus
    for (i = 0; i < queue.length; i++) {
        cItem = queue[i];
        if (cItem == '-') {
            tLeft = parseFloat(queue[i - 1]);
            tRight = parseFloat(queue[i + 1]);
            nVal = tLeft - tRight;
            queue[i - 1] = nVal;
            queue.splice(i, 2);
            i = i - 1
        }
    }
    if (queue.length == 0) {
        document.getElementById("txt").value = 0
    }
    document.getElementById("txt").value = queue.slice(-1);
    console.log("Eq Queue: " + queue);
    input = queue;
    queue = [];
    console.log("Eq Queue: " + queue);
    console.log("Eq Input: " + input);
}
//push into queue
function addToQueue(input) {
    if (input != '0') {
        queue.push(input);
    }
}
//on number key press
function numericButton(arg) {
    if (document.getElementById("txt").value == "0" && arg != '.') {
        input = arg;
        document.getElementById("txt").value = arg;
    }
    else if (document.getElementById("txt").value == "0" && arg == ".") {
        input += "0" + arg;
        document.getElementById("txt").value += arg;
    }
    else if (document.getElementById("txt").value != "0" && arg == ".") {
        input += arg;
        document.getElementById("txt").value += "0" + arg;
    }
    else if (arg == "0" && document.getElementById("txt").value == "0") {
        input += "0";
        document.getElementById("txt").value = "0"
    }
    else {
        if (document.getElementById("txt").value == Infinity || document.getElementById("txt").value == "undefined") {
            document.getElementById("txt").value = arg;
        }
        else {
            document.getElementById("txt").value += arg;
        }
     
        if (input != 0) {
            input += arg;
        }
        else {
            input = arg
        }
    }
    console.log("Num input" + input)
    console.log("Num queue" + queue)
}
//on operator key press
function operatorButton(arg) {
    console.log("In Opr - Length: " + queue.length)
    if (input != '0')
    {
        console.log("if executes(input)")
        input = parseFloat(input);
        addToQueue(input);
        console.log("queue1: " + queue)
        addToQueue(arg);
        document.getElementById("txt").value += arg;
        console.log("last in queue2: " + queue.slice(-1))
    }
    input = 0;
    console.log("In Opr - Length: " + queue.length)
    console.log("Opr queue " + queue)
    console.log("Opr input " + input)
    console.log("----------------")
}      
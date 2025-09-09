import React, { useState } from 'react'

const arr = {
    "/": 4,
    "*": 3,
    "-": 2,
    "+": 1
};
const isOperator = (e) => arr[e] !== undefined;

export default function Calculator() {
    const [input, setInput] = useState("0");
    const [evaluated, setEvaluated] = useState(false);

    const handleClick = (e) => {
        let equation = e.target.value;

        if (equation === "AC") {
            setInput("0");
            setEvaluated(false);
        }
        else if (equation === "=") {
            try {
                let sol = solve(input);
                let rounded = Math.round((sol + Number.EPSILON) * 100000) / 100000;
                setInput(rounded.toString());
                setEvaluated(true);
            } catch {
                setInput("Error");
            }
        }
        else {
            if (evaluated) {
                if (isOperator(equation)) {
                    // ✅ continue calculation with previous result
                    setInput(input + equation);
                    setEvaluated(false);
                    return;
                } else {
                    // ✅ start fresh if number is pressed
                    setInput(equation);
                    setEvaluated(false);
                    return;
                }
            }

            if (input === "0" && equation !== "." && !isOperator(equation)) {
                setInput(equation);
            }
            else if (isOperator(equation)) {
                if (isOperator(input.slice(-1))) {
                    if (equation === "-") {
                        setInput(input + equation); // allow negative numbers
                    } else {
                        let newInput = input.replace(/[\+\-\*\/]+$/, equation);
                        setInput(newInput);
                    }
                } else {
                    setInput(input + equation);
                }
            }
            else if (equation === ".") {
                const parts = input.split(/[\+\-\*\/]/);
                const currentNum = parts[parts.length - 1];
                if (!currentNum.includes(".")) {
                    setInput(input + equation);
                }
            }
            else {
                setInput(input + equation);
            }
        }
    }


    const solve = (p) => {
        let s = intopostfix(p);
        let Stack = [];
        s.forEach(element => {
            if (!isOperator(element)) {
                Stack.push(Number(element));
            }
            else {
                let b = Stack.pop();
                let a = Stack.pop();
                switch (element) {
                    case "+": Stack.push(a + b); break;
                    case "-": Stack.push(a - b); break;
                    case "*": Stack.push(a * b); break;
                    case "/": Stack.push(a / b); break;
                    default: break;
                }
            }
        });
        return Stack.pop();
    };

    const intopostfix = (s) => {
        let Stack = [];
        let String = [];
        let number = "";

        for (let i = 0; i < s.length; i++) {
            let element = s[i];
            if (!isOperator(element)) {
                number += element;
            } else {
                if (number !== "") {
                    String.push(number);
                    number = "";
                }
                // handle negative numbers
                if (element === "-" && (i === 0 || isOperator(s[i - 1]))) {
                    number = "-";
                } else {
                    while (Stack.length !== 0 &&
                        isOperator(Stack[Stack.length - 1]) && arr[element] <= arr[Stack[Stack.length - 1]]) {
                        String.push(Stack.pop());
                    }
                    Stack.push(element);
                }
            }
        }
        if (number !== "") {
            String.push(number);
        }
        while (Stack.length !== 0) {
            String.push(Stack.pop());
        }
        return String;
    }

    return (
        <div className='Container'>
            <button id="display" className='item'>{input}</button>
            <button id="clear" className='item1' value='AC' onClick={handleClick}>AC</button>
            <button id="divide" className='item2' value='/' onClick={handleClick}>/</button>
            <button id="multiply" className='item3' value='*' onClick={handleClick}>x</button>
            <button id="seven" className='item4' value='7' onClick={handleClick}>7</button>
            <button id="eight" className='item5' value='8' onClick={handleClick}>8</button>
            <button id="nine" className='item6' value='9' onClick={handleClick}>9</button>
            <button id="subtract" className='item7' value='-' onClick={handleClick}>-</button>
            <button id="four" className='item8' value='4' onClick={handleClick}>4</button>
            <button id="five" className='item9' value='5' onClick={handleClick}>5</button>
            <button id="six" className='item10' value='6' onClick={handleClick}>6</button>
            <button id="add" className='item11' value='+' onClick={handleClick}>+</button>
            <button id="one" className='item12' value='1' onClick={handleClick}>1</button>
            <button id="two" className='item13' value='2' onClick={handleClick}>2</button>
            <button id="three" className='item14' value='3' onClick={handleClick}>3</button>
            <button id="equals" className='item15' value='=' onClick={handleClick}>=</button>
            <button id="zero" className='item16' value='0' onClick={handleClick}>0</button>
            <button id="decimal" className='item17' value='.' onClick={handleClick}>.</button>
        </div>
    )
}

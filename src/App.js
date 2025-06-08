import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");

  // Simple arithmetic parser/evaluator (supports +, -, *, /)
  const evaluateExpression = (expr) => {
    try {
      // Tokenize numbers and operators
      const tokens = expr.match(/(\d+\.?\d*|\.\d+|[+\-*/()])/g);
      if (!tokens) return "Error";

      const values = [];
      const ops = [];

      const precedence = (op) => (op === "+" || op === "-" ? 1 : op === "*" || op === "/" ? 2 : 0);

      const applyOp = () => {
        const op = ops.pop();
        const b = values.pop();
        const a = values.pop();
        let res;
        if (op === "+") res = a + b;
        else if (op === "-") res = a - b;
        else if (op === "*") res = a * b;
        else if (op === "/") res = a / b;
        values.push(res);
      };

      for (let token of tokens) {
        if (!isNaN(token)) {
          values.push(parseFloat(token));
        } else if (token === "(") {
          ops.push(token);
        } else if (token === ")") {
          while (ops.length && ops[ops.length - 1] !== "(") applyOp();
          ops.pop(); // remove "("
        } else { // operator
          while (
            ops.length &&
            precedence(ops[ops.length - 1]) >= precedence(token)
          ) {
            applyOp();
          }
          ops.push(token);
        }
      }

      while (ops.length) applyOp();
      const result = values.pop();
      if (typeof result !== "number" || !isFinite(result)) throw new Error();
      return result;
    } catch {
      return "Error";
    }
  };

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
    } else if (value === "Back") {
      setInput((prev) => prev.slice(0, -1));
    } else if (value === "=") {
      setInput(String(evaluateExpression(input)));
    } else {
      setInput((prev) => prev + value);
    }
  };

  return (
    <div className="calculator">
      <input className="value" type="text" value={input} readOnly />
      <button className="numclear" onClick={() => handleClick("C")}>C</button>
      <button className="numclear" onClick={() => handleClick("Back")}>Back</button>
      <button className="num" onClick={() => handleClick("/")}>/</button>
      <button className="num" onClick={() => handleClick("*")}>*</button>

      <button className="num" onClick={() => handleClick("7")}>7</button>
      <button className="num" onClick={() => handleClick("8")}>8</button>
      <button className="num" onClick={() => handleClick("9")}>9</button>
      <button className="num" onClick={() => handleClick("-")}>-</button>

      <button className="num" onClick={() => handleClick("4")}>4</button>
      <button className="num" onClick={() => handleClick("5")}>5</button>
      <button className="num" onClick={() => handleClick("6")}>6</button>
      <button className="num plus" onClick={() => handleClick("+")}>+</button>

      <button className="num" onClick={() => handleClick("3")}>3</button>
      <button className="num" onClick={() => handleClick("2")}>2</button>
      <button className="num" onClick={() => handleClick("1")}>1</button>
      <button className="num" onClick={() => handleClick("0")}>0</button>

      <button className="num" onClick={() => handleClick("00")}>00</button>
      <button className="num equal" onClick={() => handleClick("=")}>=</button>
    </div>
  );
};

export default App;

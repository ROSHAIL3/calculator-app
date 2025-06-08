import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import SoundToggle from './SoundToggle';
import HistoryPanel from './HistoryPanel';
import './App.css';

function App() {
  const [expression, setExpression] = useState("0");
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState("light");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [justCalculated, setJustCalculated] = useState(false);

  // Safe arithmetic evaluator (shunting-yard algorithm)
  const evaluateExpression = (expr) => {
    try {
      const tokens = expr.match(/(\d+\.?\d*|\.\d+|[+\-*/^()])/g);
      if (!tokens) return "Error";
      const values = [];
      const ops = [];
      const precedence = (op) => (op === '+' || op === '-') ? 1 : (op === '*' || op === '/') ? 2 : 0;
      const applyOp = () => {
        const op = ops.pop();
        const b = values.pop();
        const a = values.pop();
        let res;
        if (op === '+') res = a + b;
        else if (op === '-') res = a - b;
        else if (op === '*') res = a * b;
        else if (op === '/') res = a / b;
        values.push(res);
      };
      for (let token of tokens) {
        if (!isNaN(token)) {
          values.push(parseFloat(token));
        } else if (token === '(') {
          ops.push(token);
        } else if (token === ')') {
          while (ops.length && ops[ops.length - 1] !== '(') applyOp();
          ops.pop();
        } else {
          while (ops.length && precedence(ops[ops.length - 1]) >= precedence(token)) applyOp();
          ops.push(token);
        }
      }
      while (ops.length) applyOp();
      const result = values.pop();
      if (typeof result !== 'number' || !isFinite(result)) throw new Error();
      return result;
    } catch {
      return "Error";
    }
  };

  // Play click sound using Web Audio API
  function playClickSound() {
    if (!soundEnabled) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = 440;
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
      if (audioCtx.close) audioCtx.close();
    }, 100);
  }

  // Handle button clicks
  const handleButtonClick = (value) => {
    playClickSound();
    if (justCalculated && /[0-9.]/.test(value)) {
      setExpression(value === '.' ? '0.' : value);
      setJustCalculated(false);
      return;
    }
    switch (value) {
      case 'C':
        setExpression('0');
        setJustCalculated(false);
        return;
      case '⌫':
        setExpression(prev => prev.length === 1 ? '0' : prev.slice(0, -1));
        setJustCalculated(false);
        return;
      case '√': {
        const match = expression.match(/(\d+\.?\d*)$/);
        if (match) {
          const lastNum = parseFloat(match[1]);
          const result = Math.sqrt(lastNum).toString();
          const newExpr = expression.slice(0, match.index) + result;
          setExpression(newExpr);
          setHistory(prev => [...prev, `√${lastNum} = ${result}`]);
          setJustCalculated(true);
        }
        return;
      }
      case '=': {
        let exp = expression;
        if (/[+\-*/^.]$/.test(exp)) exp = exp.slice(0, -1);
        exp = exp.replace(/\^/g, '**');
        const result = evaluateExpression(exp);
        const resultStr = result.toString();
        setHistory(prev => [...prev, `${expression} = ${resultStr}`]);
        setExpression(resultStr);
        setJustCalculated(true);
        return;
      }
      default:
        break;
    }
    // Prevent double operators
    if (/[+\-*/^]/.test(value)) {
      if (/[+\-*/^]$/.test(expression)) {
        setExpression(prev => prev.slice(0, -1) + value);
        setJustCalculated(false);
        return;
      }
      if (expression === '0' && value !== '-') return;
      setExpression(prev => prev + value);
      setJustCalculated(false);
      return;
    }
    // Decimal point handling
    if (value === '.') {
      const parts = expression.split(/[+\-*/^]/);
      const current = parts[parts.length - 1];
      if (current.includes('.')) return;
      setExpression(prev => prev + '.');
      setJustCalculated(false);
      return;
    }
    // Digit input
    setExpression(prev => prev === '0' ? value : prev + value);
    setJustCalculated(false);
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleSound = () => setSoundEnabled(prev => !prev);

  return (
    <div className="app" data-theme={theme}>
      <header className="app-header">
        <h1>Calculator</h1>
        <div className="toggles">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <SoundToggle soundEnabled={soundEnabled} toggleSound={toggleSound} />
        </div>
      </header>
      <div className="app-main">
        <div className="calculator">
          <div className="display" aria-live="polite" aria-label="Calculator display">
            {expression}
          </div>
          <div className="keypad">
            {[ 'C', '√', '^', '⌫', 7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '-', 0, '.', '=', '+' ]
              .map((btn, i) => (
                <button
                  key={i}
                  type="button"
                  className="calc-button"
                  onClick={() => handleButtonClick(btn.toString())}
                >
                  {btn}
                </button>
              ))}
          </div>
        </div>
        <HistoryPanel history={history} />
      </div>
    </div>
  );
}

export default App;

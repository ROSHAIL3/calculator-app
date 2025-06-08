import React from 'react';

function HistoryPanel({ history }) {
  // Displays a list of past calculations
  return (
    <aside className="history-panel" aria-label="Calculation History">
      <h2>History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </aside>
  );
}

export default HistoryPanel;

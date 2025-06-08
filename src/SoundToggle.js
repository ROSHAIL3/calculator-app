import React from 'react';

function SoundToggle({ soundEnabled, toggleSound }) {
  // A button to enable/disable click sounds
  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={toggleSound}
      aria-pressed={soundEnabled}
      aria-label={soundEnabled ? "Disable button sound" : "Enable button sound"}
    >
      {soundEnabled ? '🔊' : '🔇'}
    </button>
  );
}

export default SoundToggle;

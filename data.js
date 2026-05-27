*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --orange: #D85A30;
  --orange-dark: #B34820;
  --orange-glow: rgba(216, 90, 48, 0.15);
  --black: #0a0a0a;
  --surface: #141414;
  --surface2: #1e1e1e;
  --surface3: #282828;
  --border: rgba(255,255,255,0.08);
  --border-hover: rgba(255,255,255,0.16);
  --text: #ffffff;
  --text-secondary: rgba(255,255,255,0.5);
  --text-tertiary: rgba(255,255,255,0.25);
  --font-display: 'Bebas Neue', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --radius: 16px;
  --radius-sm: 10px;
  --radius-pill: 999px;
}

html {
  font-family: var(--font-body);
  background: var(--black);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

body {
  min-height: 100dvh;
  background: var(--black);
}

#root {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

button {
  font-family: var(--font-body);
  cursor: pointer;
  border: none;
  background: none;
  color: inherit;
}

button:active {
  transform: scale(0.97);
}

/* Scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--surface3); border-radius: 4px; }

/* Animations */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes barGrow {
  from { width: 0; }
}

@keyframes popIn {
  0% { transform: scale(0.85); opacity: 0; }
  70% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.animate-fadeUp { animation: fadeUp 0.35s ease both; }
.animate-fadeIn { animation: fadeIn 0.25s ease both; }
.animate-popIn { animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

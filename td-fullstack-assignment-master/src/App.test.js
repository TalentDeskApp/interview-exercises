import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

it('renders without crashing', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const root = createRoot(div);

  root.render(<App />);

  root.unmount();
  document.body.removeChild(div);
});

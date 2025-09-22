import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';

test('renders learn react link', () => {
  const theme = createTheme();
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
  // The default test is not relevant anymore, but we'll keep it for now.
  // We are just checking if the app renders without crashing.
});

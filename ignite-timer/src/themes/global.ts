import { createGlobalStyle } from 'styled-components'
import { white9, gray9, gray6, gray7 } from '~/themes'

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    font-family: 'Poppins', Arial, Helvetica, sans-serif;
    font-weight: 400;

    outline: none;
    border: none;
    list-style: none;
    text-decoration: none;
  }

  html {
    scroll-behavior: smooth;

    color: ${white9};
    background: ${gray7};

    @media (max-width: 1024px) { font-size: 93.75%; }
    @media (max-width: 768px) { font-size: 87.5%; }
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  a { color: ${white9}; }
  a, button { cursor: pointer; }

  body, input, textarea, button {
    font-family: 'Poppins', Arial, Helvetica, sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: ${gray9}; }
  ::-webkit-scrollbar-thumb {
    border-radius: 0.5rem;
    background: ${gray6};
    &:hover { background: ${gray7}; }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

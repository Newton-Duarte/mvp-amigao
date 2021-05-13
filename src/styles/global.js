import { createGlobalStyle } from 'styled-components';
import { shade } from 'polished'

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #f0f2f5;
    --input-background: #e7e9ee;
    --red: #e52e4d;
    --green: #33cc95;
    --blue: #5429cc;
    --blue-light: #6933ff;
    --text-title: #363f5f;
    --text-body: #969cb3;
    --shape: #ffffff;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }
    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }
  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }
  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }
  button {
    cursor: pointer;
  }
  [disabled] {
    opacity: .6;
    cursor: not-allowed;
  }
  ul {
    list-style: none;
  }
  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 800px) {
      padding: 1rem;
    }
  }
  .react-modal-content {
    width: 100%;
    max-width: 576px;
    background: var(--background);
    padding: 3rem;
    position: relative;
    border-radius: 0.24rem;
    max-height: 95vh;
    overflow: auto;

    @media (max-width: 800px) {
      padding: 1rem;
    }
  }
  .react-modal-content.large {
    max-width: 800px;
  }
  .react-modal-content.small {
    max-width: 400px;
  }
  .react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;
    transition: filter .2s;
    &:hover {
      filter: brightness(0.8);
    }
  }

  &::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--text-body);
    border-radius: 0.5rem;

    &:hover {
      background: ${shade(.2, '#969cb3')};
    }
  }
`
import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  
  label {
    display: block;
    margin-bottom: .5rem;
    color: var(--text-title);
  }
  input {
    outline: 0;
    width: 100%;
    flex: 1;
    height: 55px !important;
    font-size: 1rem;
    padding: 16px;
    background: transparent;
    background: var(--input-background);
    border-radius: 0.25rem;
    border: 2px solid var(--input-background);
    color: var(--text-title);
    &::placeholder {
      color: #666360;
    }
    ${props => props.isErrored && css`
      border-color: var(--red);
    `}
    ${props => props.isFocused && css`
      border-color: var(--green);
    `}
  }
`
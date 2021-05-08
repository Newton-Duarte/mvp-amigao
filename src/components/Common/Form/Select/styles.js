import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  label {
    display: block;
    margin-bottom: .5rem;
    color: var(--text-title);
  }
  select {
    width: 100%;
    border-radius: 0.25rem;
    background: var(--input-background);
    border: 2px solid var(--input-background);
    outline: 0;
    flex: 1;
    height: 55px;
    font-size: 1rem;
    padding: 16px;
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
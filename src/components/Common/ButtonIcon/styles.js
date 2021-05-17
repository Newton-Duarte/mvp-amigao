import styled from 'styled-components'

export const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: transparent;

  svg {
    font-size: 1rem;
  }

  & + button {
    margin-left: .5rem;
  }
`
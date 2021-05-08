import styled from 'styled-components'

export const Button = styled.button`
  border: none;
  background: transparent;
  svg {
    font-size: 1rem;
  }
  & + button {
    margin-left: .5rem;
  }
`
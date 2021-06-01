import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--shape);
  padding: 1rem;
  border-radius: 0.25rem;
  margin-top: 2rem;

  div {
    h5 {
      font-size: 1rem;
      font-weight: 400;
      margin-bottom: .5rem;
    }

    span {
      font-weight: 700;
      font-size: 1.5rem;
    }
  }

  div + div {
    margin-left: 5rem;
  }
`
import styled from 'styled-components';

export const Container = styled.form`
  h2 {
    margin-bottom: 2rem;
    color: var(--text-title);
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 800px) {
    flex-direction: column;
    h2 {
      margin-bottom: 1rem;
    }
  }
`

export const Actions = styled.div`
  display: flex;
  margin-top: 2rem;

  button:first-child {
    background: var(--input-background);
    color: var(--text-title);
    transition: filter .2s;

    &:hover {
      filter: brightness(.9);
    }
  }

  button + button {
    margin-left: 1rem;
  }
`
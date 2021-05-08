import styled from 'styled-components';

export const Container = styled.form`
  h2 {
    margin-bottom: 2rem;
    color: var(--text-title);
  }
  button[type="submit"] {
    margin-top: 2rem;
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
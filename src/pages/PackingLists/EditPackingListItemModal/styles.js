import styled from 'styled-components';

export const Container = styled.form`
  h2 {
    margin-bottom: 2rem;
    color: var(--text-title);
  }
  
  button[type="submit"] {
    margin-top: 2rem;
  }

  div + div {
    margin-top: 1rem;
  }
`
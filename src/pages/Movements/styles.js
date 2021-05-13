import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div``

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    color: var(--text-title);
  }

  div {
    display: flex;
    align-items: center;
    /* width: 100%; */

    button {
      width: 108px;
      height: 54px;
      border: none;
      border-radius: 0.25rem;
      background: var(--green);
      color: #fff;
      font-size: 1rem;
      box-shadow: 3px 3px 3px rgba(0, 0, 0, .3);
      margin-left: 1rem;
      transition: background .2s;

      &:hover {
        background: ${shade(0.2, '#33cc95')};
      }
    }
  }

  @media (max-width: 800px) {
    align-items: flex-start;
    flex-direction: column;

    h1 {
      margin-bottom: 1rem;
    }

    div {
      width: 100%;
    }
  }
`
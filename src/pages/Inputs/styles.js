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

  > div {
    display: flex;
    align-items: center;
    /* width: 100%; */

    button[type="button"] {
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
export const TitleFilters = styled.div`
  flex-direction: column;
  align-items: flex-start !important;
`

export const ActiveFilters = styled.ul`
  display: flex;
  margin-top: 0.5rem;
  
  li {
    display: flex;
    align-items: center;
    background: var(--input-background);
    padding: .5rem;
    border-radius: .25rem;

    > span {
      font-weight: bold;
      padding-right: .5rem;
      color: var(--text-title);
    }

    button {
      background: var(--blue-light);
      border-radius: 0.25rem;
      color: #fff;
      margin-left: .5rem;
    }

    & + li {
      margin-left: 1rem;
    }
  }

  @media (max-width: 800px) {
    flex-direction: column;
    margin-bottom: 1rem;

    li {
      align-self: flex-start;

      > div {
        width: auto;
      }

      & + li {
        margin-left: 0;
        margin-top: 1rem;
      }
    }
  }
`
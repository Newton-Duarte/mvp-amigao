import styled, { css } from 'styled-components'

export const Container = styled.header`
  background: var(--blue);
  padding: 1rem;
`

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      color: #fff;
    }

    button {
      display: none;

      @media (max-width: 800px) {
        display: block;
      }
    }
  }

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const Navigation = styled.ul`
  display: flex;
  
  @media (max-width: 800px) {
    max-height: 0;
    visibility: hidden;
    flex-direction: column;
    transition: max-height .2s ease-in;
    
    ${props => props.showMenu && css`
      visibility: visible;
      max-height: 220px;
      margin: 1rem 0;
    `}
  }
`

export const NavItem = styled.li`
  a {
      text-decoration: none;
      color: #fff;
      padding: .5rem;
      ${props => props.active && css`
        border: 1px solid #fff;
        border-radius: 0.25rem;
      `}
    }
    & + li {
      margin-left: 1rem;
    }

    @media (max-width: 800px) {
      & + li {
        margin-top: 1rem;
        margin-left: 0;
      } 
    }
`
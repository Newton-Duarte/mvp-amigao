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
  h3 {
    color: #fff;
  }
`

export const Navigation = styled.ul`
  display: flex;
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
`
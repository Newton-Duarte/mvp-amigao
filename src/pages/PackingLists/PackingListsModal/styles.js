import styled, { css } from 'styled-components';
import { shade } from 'polished'

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

  & div.Pendente,
  & div.Faturado,
  & div.Finalizado,
  & div.Cancelado {
    max-width: 100px;
    margin-bottom: 2rem;
  }
`

export const ItemsContainer = styled.div`
  margin-top: 2rem;
`

export const ItemsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`

export const TabsContainer = styled.div`
  display: flex;
  flex: 1;
`

export const TabButton = styled.button`
  background: transparent;
  outline: none;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  margin: 1rem 0;
  opacity: .5;
  color: var(--text-title);
  ${({ isActive }) => isActive && css`
    border-bottom: 2px solid var(--text-title);
    opacity: 1;
  `};
  & + button {
    margin-left: 0.5rem;
  }

  &:hover {
    color: ${shade(0.9, '#363f5f')};
    opacity: 0.7;
  }
`

export const AddButton = styled.button`
  padding: .3rem .6rem;
  outline: none;
  border: none;
  border-radius: 0.25rem;
  background-color: rgba(93, 102, 112, .4);
  transition: filter .2s;

  &:hover {
    filter: brightness(.1);
  }
`

export const TabContent = styled.div`
  width: 100%;
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
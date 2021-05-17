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

  h4 {
    color: var(--text-title);
    border-bottom: 1px solid var(--text-title);
  }
`

export const ItemsTotal = styled.div`
  display: flex;
  align-items: center;
  color: var(--text-title);

  p {
    font-weight: bold;
    margin-right: 0.25rem;
  }
`

export const AddItem = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 1rem 0;

  button {
    margin-top: 24px;
    max-width: 48px;
    height: 54px;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;

    label {
      margin-top: 1rem;
    }

    button {
      margin-top: 1rem;
      width: 100%;
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
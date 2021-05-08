import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 32px;
  background: var(--input-background);
  font-size: 14px;
  border-radius: 16px;
  padding: 1rem;
  &.Pendente {
    background: var(--blue);
    color: #fff;
  }
  &.Faturado {
    background: var(--red);
    color: #fff;
  }
  &.Finalizado {
    background: var(--green);
    color: #fff;
  }
  &.Cancelado {
    background: var(--text-body);
    color: #fff;
  }
`
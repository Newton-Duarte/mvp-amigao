import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid var(--text-title);
  padding: 1rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;
    th {
      color: var(--text-body);
      padding: .5rem;
      font-weight: 400;
      text-align: left;
      line-height: 1.5rem;
    }
    td {
      border: 0;
      padding: .5rem;
      background: var(--shape);
      color: var(--text-body);
      &:first-child {
        color: var(--text-title);
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
      }
      &:last-child {
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
      }
    }
  }

  @media (max-width: 800px) {
    overflow: auto;

    table {
      table-layout: fixed;
      width: 680px;
    }
  }
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    background: transparent;
    width: 16px;
    height: 16px;
    outline: none;
    border: none;

    & + button {
      margin-left: 1rem;
    }
  }
`
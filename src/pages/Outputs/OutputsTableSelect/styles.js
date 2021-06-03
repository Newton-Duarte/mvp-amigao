import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 2rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;
    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem;
      text-align: left;
      line-height: 1.5rem;
    }
    tr {
      &.selectable {
        cursor: pointer;
        font-size: 14px;
      }
      
      &.active {
        > td {
          color: #fff;
          background-color: var(--text-body);
        }
      }
    }

    td {
      padding: 1rem;
      border: 0;
      background: var(--shape);
      color: var(--text-body);

      div + div {
        margin-left: .5rem;
      }

      &:first-child {
        color: var(--text-title);
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
      }
      
      &:last-child {
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
      }

      &.Pendente {

        &::before {
          content: '';
          display: inline-block;
          margin-right: .5rem;
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background: var(--blue);
        }
      }

      &.Faturado {

        &::before {
          content: '';
          display: inline-block;
          margin-right: .5rem;
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background: var(--red);
        }
      }

      &.Finalizado {

        &::before {
          content: '';
          display: inline-block;
          margin-right: .5rem;
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background: var(--green);
        }
      }

      &.Cancelado {

        &::before {
          content: '';
          display: inline-block;
          margin-right: .5rem;
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background: var(--text-body);
        }
      }

      & > div.Entrada,
      & > div.Saída {
        max-width: 100px !important;
      }
    }
  }

  @media (max-width: 800px) {
    overflow: auto;

    table {
      table-layout: fixed;
      width: 1200px;
    }
  }
`
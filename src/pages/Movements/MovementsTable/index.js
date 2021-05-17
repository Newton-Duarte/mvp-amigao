// import { useMovements } from '../../../hooks/useMovements';
import { formatDate } from '../../../utils/formatDate';
import { convertStringToCompare } from '../../../utils/convertStringToCompare'
import { Container } from './styles';
import { FiEdit2, FiTrash, FiCheck } from 'react-icons/fi'
import { ButtonIcon, Chip } from '../../../components/Common'
import { Tooltip } from '../../../components/Common/Tooltip';
import { formatNumberToCurrency } from '../../../utils/formatNumberToCurrency';

export function MovementsTable({ movements, search, date, onEdit, onComplete, onDelete }) {
  const renderMovements =
  movements.filter(
    movement => {
      const [movementYear, movementMonth, movementDate] = new Date(movement.createdAt).toISOString().substr(0, 10).split('-')
      const movementDateTime = new Date(movementYear, movementMonth - 1, movementDate, 0, 0, 0).getTime()

      const [startYear, startMonth, startDate] = date.start.split('-')
      const [endYear, endMonth, endDate] = date.end.split('-')

      const startDateTime = new Date(startYear, startMonth - 1, startDate, 0, 0, 0).getTime()
      const endDateTime = new Date(endYear, endMonth - 1, endDate, 0, 0, 0).getTime()

      if (movementDateTime >= startDateTime && movementDateTime <= endDateTime) {
        return true
      }

      return false
    }
  ) 
  .filter(
      obj => Object.keys(obj)
        .some(key => convertStringToCompare(obj[key])
        .includes(convertStringToCompare(search)))
      )

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Cliente/Fornecedor</th>
            <th>Número</th>
            <th>Data</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Colaborador</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {renderMovements.map(movement => (
            <tr key={movement.id}>
              <td>{movement.customer || movement.vendor}</td>
              <td>{movement.id}</td>
              <td>
                {formatDate(new Date(movement.createdAt), 'pt-BR')}
              </td>
              <td>
                <Chip className={movement.type}>{movement.type}</Chip>
              </td>
              <td className={movement.status}>{movement.status}</td>
              <td>{movement.user}</td>
              <td>{formatNumberToCurrency(movement.total)}</td>
              <td>
                <Tooltip text="Editar">
                  <ButtonIcon
                    onClick={() => onEdit(movement)}
                  >
                    <FiEdit2 />
                  </ButtonIcon>
                </Tooltip>
                <Tooltip text="Finalizar">
                  <ButtonIcon
                    onClick={() => onComplete(movement.id)}
                    disabled={movement.status === 'Cancelado' || movement.status === 'Finalizado'}
                  >
                    <FiCheck />
                  </ButtonIcon>
                </Tooltip>
                <Tooltip text="Excluir">
                  <ButtonIcon
                    onClick={() => onDelete(movement.id)}
                    disabled={movement.status === 'Cancelado'}
                  >
                    <FiTrash />
                  </ButtonIcon>
                </Tooltip>
              </td>
            </tr>
          ))}
          {!renderMovements.length && (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>Nenhum registro encontrado {search && (<span>com o termo: <strong>{search}</strong></span>)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
}
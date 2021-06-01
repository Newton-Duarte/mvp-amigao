// import { useInputs } from '../../../hooks/useInputs';
import { formatDate } from '../../../utils/formatDate';
import { convertStringToCompare } from '../../../utils/convertStringToCompare'
import { Container } from './styles';
import { FiEdit2, FiTrash, FiCheck } from 'react-icons/fi'
import { ButtonIcon, Chip } from '../../../components/Common'
import { Tooltip } from '../../../components/Common/Tooltip';
import { formatNumberToCurrency } from '../../../utils/formatNumberToCurrency';

export function InputsTable({ inputs, filters, search, onEdit, onComplete, onDelete }) {
  const renderInputs =
  inputs.filter(
    input => {
      const [inputYear, inputMonth, inputDate] = new Date(input.createdAt).toISOString().substr(0, 10).split('-')
      const inputDateTime = new Date(inputYear, inputMonth - 1, inputDate, 0, 0, 0).getTime()

      const [startYear, startMonth, startDate] = filters.date.start.split('-')
      const [endYear, endMonth, endDate] = filters.date.end.split('-')

      const startDateTime = new Date(startYear, startMonth - 1, startDate, 0, 0, 0).getTime()
      const endDateTime = new Date(endYear, endMonth - 1, endDate, 0, 0, 0).getTime()

      if (inputDateTime >= startDateTime && inputDateTime <= endDateTime) {
        return true
      }

      return false
    }
  )
  .filter(obj => filters.userId ? +obj.userId === +filters.userId : true)
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
            <th>Data</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Colaborador</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {renderInputs.map(input => (
            <tr key={input.id}>
              <td>{input.customer || input.vendor}</td>
              <td>
                {formatDate(new Date(input.createdAt), 'pt-BR')}
              </td>
              <td>
                <Chip className={input.type}>{input.type}</Chip>
              </td>
              <td className={input.status}>{input.status}</td>
              <td>{input.user}</td>
              <td>{formatNumberToCurrency(input.total)}</td>
              <td>
                <Tooltip text="Editar">
                  <ButtonIcon
                    onClick={() => onEdit(input)}
                  >
                    <FiEdit2 />
                  </ButtonIcon>
                </Tooltip>
                <Tooltip text="Finalizar">
                  <ButtonIcon
                    onClick={() => onComplete(input.id)}
                    disabled={input.status === 'Cancelado' || input.status === 'Finalizado'}
                  >
                    <FiCheck />
                  </ButtonIcon>
                </Tooltip>
                <Tooltip text="Excluir">
                  <ButtonIcon
                    onClick={() => onDelete(input.id)}
                    disabled={input.status === 'Cancelado'}
                  >
                    <FiTrash />
                  </ButtonIcon>
                </Tooltip>
              </td>
            </tr>
          ))}
          {!renderInputs.length && (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>Nenhum registro encontrado {search && (<span>com o termo: <strong>{search}</strong></span>)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
}
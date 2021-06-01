// import { useOutputs } from '../../../hooks/useOutputs';
import { formatDate } from '../../../utils/formatDate';
import { convertStringToCompare } from '../../../utils/convertStringToCompare'
import { Container } from './styles';
import { FiEdit2, FiTrash, FiCheck } from 'react-icons/fi'
import { ButtonIcon, Chip } from '../../../components/Common'
import { Tooltip } from '../../../components/Common/Tooltip';
import { formatNumberToCurrency } from '../../../utils/formatNumberToCurrency';

export function OutputsTable({ outputs, filters, search, onEdit, onComplete, onDelete }) {
  const renderOutputs =
  outputs.filter(
    output => {
      const [outputYear, outputMonth, outputDate] = new Date(output.createdAt).toISOString().substr(0, 10).split('-')
      const outputDateTime = new Date(outputYear, outputMonth - 1, outputDate, 0, 0, 0).getTime()

      const [startYear, startMonth, startDate] = filters.date.start.split('-')
      const [endYear, endMonth, endDate] = filters.date.end.split('-')

      const startDateTime = new Date(startYear, startMonth - 1, startDate, 0, 0, 0).getTime()
      const endDateTime = new Date(endYear, endMonth - 1, endDate, 0, 0, 0).getTime()

      if (outputDateTime >= startDateTime && outputDateTime <= endDateTime) {
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
          {renderOutputs.map(output => (
            <tr key={output.id}>
              <td>{output.customer || output.vendor}</td>
              <td>
                {formatDate(new Date(output.createdAt), 'pt-BR')}
              </td>
              <td>
                <Chip className={output.type}>{output.type}</Chip>
              </td>
              <td className={output.status}>{output.status}</td>
              <td>{output.user}</td>
              <td>{formatNumberToCurrency(output.total)}</td>
              <td>
                <Tooltip text="Editar">
                  <ButtonIcon
                    onClick={() => onEdit(output)}
                  >
                    <FiEdit2 />
                  </ButtonIcon>
                </Tooltip>
                <Tooltip text="Finalizar">
                  <ButtonIcon
                    onClick={() => onComplete(output.id)}
                    disabled={output.status === 'Cancelado' || output.status === 'Finalizado'}
                  >
                    <FiCheck />
                  </ButtonIcon>
                </Tooltip>
                <Tooltip text="Excluir">
                  <ButtonIcon
                    onClick={() => onDelete(output.id)}
                    disabled={output.status === 'Cancelado'}
                  >
                    <FiTrash />
                  </ButtonIcon>
                </Tooltip>
              </td>
            </tr>
          ))}
          {!renderOutputs.length && (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>Nenhum registro encontrado {search && (<span>com o termo: <strong>{search}</strong></span>)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
}
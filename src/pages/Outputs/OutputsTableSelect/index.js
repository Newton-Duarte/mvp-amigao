// import { useOutputs } from '../../../hooks/useOutputs';
import { formatDate } from '../../../utils/formatDate';
import { convertStringToCompare } from '../../../utils/convertStringToCompare'
import { Container } from './styles';
import { Chip } from '../../../components/Common'
import { formatNumberToCurrency } from '../../../utils/formatNumberToCurrency';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';

export function OutputsTableSelect({ outputs, filters, search, selectedOutputs, onSelect }) {
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

  const isOutputSelected = outputId => {
    return selectedOutputs.some(output => +output.id === +outputId)
  }
  
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Colaborador</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {renderOutputs.map(output => (
            <tr
              key={output.id}
              onClick={() => onSelect(output.id)}
              className={`selectable ${isOutputSelected(output.id) && 'active'}`}
            >
              <td>
                {isOutputSelected(output.id) ? <FiCheckSquare size={24} /> : <FiSquare size={24} />}
                {/* <input
                  type="checkbox"
                  value={output.id}
                  onChange={({ target }) => onSelect(target.value)}
                  checked={isOutputSelected(output.id)}
                /> */}
              </td>
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
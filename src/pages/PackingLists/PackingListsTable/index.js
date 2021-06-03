// import { usePackingLists } from '../../../hooks/usePackingLists';
import { formatDate } from '../../../utils/formatDate';
import { convertStringToCompare } from '../../../utils/convertStringToCompare'
import { Container } from './styles';
import { FiEdit2, FiTrash, FiCheck } from 'react-icons/fi'
import { ButtonIcon } from '../../../components/Common'
import { Tooltip } from '../../../components/Common/Tooltip';

export function PackingListsTable({ packingLists, filters, search, onEdit, onComplete, onDelete }) {
  const renderPackingLists =
  packingLists.filter(
    packingList => {
      const [packingListYear, packingListMonth, packingListDate] = new Date(packingList.createdAt).toISOString().substr(0, 10).split('-')
      const packingListDateTime = new Date(packingListYear, packingListMonth - 1, packingListDate, 0, 0, 0).getTime()

      const [startYear, startMonth, startDate] = filters.date.start.split('-')
      const [endYear, endMonth, endDate] = filters.date.end.split('-')

      const startDateTime = new Date(startYear, startMonth - 1, startDate, 0, 0, 0).getTime()
      const endDateTime = new Date(endYear, endMonth - 1, endDate, 0, 0, 0).getTime()

      if (packingListDateTime >= startDateTime && packingListDateTime <= endDateTime) {
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
            <th>Data</th>
            <th>Motorista</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {renderPackingLists.map(packingList => (
            <tr key={packingList.id}>
              <td>
                {formatDate(new Date(packingList.createdAt), 'pt-BR')}
              </td>
              <td>{packingList.driver}</td>
              <td className={packingList.status}>{packingList.status}</td>
              <td>
                <Tooltip text="Editar">
                  <ButtonIcon
                    onClick={() => onEdit(packingList)}
                  >
                    <FiEdit2 />
                  </ButtonIcon>
                </Tooltip>
                <Tooltip text="Finalizar">
                  <ButtonIcon
                    onClick={() => onComplete(packingList.id)}
                    disabled={packingList.status === 'Cancelado' || packingList.status === 'Finalizado'}
                  >
                    <FiCheck />
                  </ButtonIcon>
                </Tooltip>
                <Tooltip text="Excluir">
                  <ButtonIcon
                    onClick={() => onDelete(packingList.id)}
                    disabled={packingList.status === 'Cancelado'}
                  >
                    <FiTrash />
                  </ButtonIcon>
                </Tooltip>
              </td>
            </tr>
          ))}
          {!renderPackingLists.length && (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>Nenhum registro encontrado {search && (<span>com o termo: <strong>{search}</strong></span>)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
}
import { FiTrash } from 'react-icons/fi';
import { Actions, Container } from './styles';
import { formatNumberToCurrency } from '../../../utils/formatNumberToCurrency'

export function PackingListOutputsTable({ 
  packingList,
  onDeleteClick 
}) {
  const items = packingList.items

  const getItemTotalQuantity = item => {
    return item.items.reduce((accumulator, output) => accumulator += +output.quantity, 0)
  }

  return (
    <Container>
      {!items.length 
        ? <p>Nenhum pedido adicionado</p>
        : (
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Cliente</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.customer}</td>
                  <td>{getItemTotalQuantity(item)}</td>
                  <td>{formatNumberToCurrency(item.total)}</td>
                  <td>
                    <Actions>
                      <button
                        type="button"
                        onClick={() => onDeleteClick(item.id)}
                        disabled={packingList.status !== 'Pendente'}
                      >
                        <FiTrash size={16} />
                      </button>
                    </Actions>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </Container>
  )
}
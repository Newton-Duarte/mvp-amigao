import { FiEdit2, FiTrash } from 'react-icons/fi';
import { Actions, Container } from './styles';
import { formatNumberToCurrency } from '../../../utils/formatNumberToCurrency'

export function MovementProductsTable({ 
  movement,
  onEditClick,
  onDeleteClick 
}) {
  const items = movement.items

  return (
    <Container>
      {!items.length 
        ? <p>Nenhum item adicionado</p>
        : (
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Total</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.product}</td>
                  <td>{item.quantity}</td>
                  <td>{formatNumberToCurrency(item.productPrice)}</td>
                  <td>{formatNumberToCurrency(item.total)}</td>
                  <td>
                    <Actions>
                      <button
                        type="button"
                        onClick={() => onEditClick(item.id)}
                        disabled={movement.status !== 'Pendente'}
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteClick(item.id)}
                        disabled={movement.status !== 'Pendente'}
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
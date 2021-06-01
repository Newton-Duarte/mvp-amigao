import { FiTrash } from 'react-icons/fi';
import { Actions, Container } from './styles';
import { formatNumberToCurrency } from '../../../utils/formatNumberToCurrency'

export function PriceTableProductsTable({ 
  priceTable,
  onDeleteClick 
}) {
  const items = priceTable.items

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
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.product}</td>
                  <td>{formatNumberToCurrency(item.productPrice)}</td>
                  <td>
                    <Actions>
                      <button
                        type="button"
                        onClick={() => onDeleteClick(item.id)}
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
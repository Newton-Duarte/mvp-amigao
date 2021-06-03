import { Container } from './styles';
import { formatNumberToCurrency } from '../../../utils/formatNumberToCurrency'

export function PackingListOutputsProductsTable({ outputs }) {
  const items = outputs.map(output => output.items.map(item => item))

  const renderItems = [].concat(...items)

  return (
    <Container>
      {!renderItems.length 
        ? <p>Nenhum produto adicionado</p>
        : (
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {renderItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.product}</td>
                  <td>{item.quantity}</td>
                  <td>{formatNumberToCurrency(item.productPrice)}</td>
                  <td>{formatNumberToCurrency(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </Container>
  )
}
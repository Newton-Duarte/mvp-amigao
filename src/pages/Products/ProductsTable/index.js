import { FiEdit2, FiTrash } from 'react-icons/fi'

import { ButtonIcon, Tooltip } from '../../../components/Common'
import { formatNumberToCurrency } from '../../../utils/formatNumberToCurrency';
import { convertStringToCompare } from '../../../utils/convertStringToCompare'

import { Container } from './styles';
import { useProducts } from '../../../hooks/useProducts';

export function ProductsTable({ search, onEdit, onDelete }) {
  const { products } = useProducts()

  const renderProducts = products.filter(
    obj => Object.keys(obj)
      .some(key => convertStringToCompare(obj[key])
      .includes(convertStringToCompare(search)))
    )

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {renderProducts.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{formatNumberToCurrency(product.price)}</td>
              <td>
                <Tooltip text="Edit">
                  <ButtonIcon
                    onClick={() => onEdit(product)}
                  >
                    <FiEdit2 />
                  </ButtonIcon>
                </Tooltip>
                <Tooltip text="Delete">
                  <ButtonIcon onClick={() => onDelete(product.id)}>
                    <FiTrash />
                  </ButtonIcon>
                </Tooltip>
              </td>
            </tr>
          ))}
          {!renderProducts.length && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>Nothing found with the term: <strong>{search}</strong></td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
}
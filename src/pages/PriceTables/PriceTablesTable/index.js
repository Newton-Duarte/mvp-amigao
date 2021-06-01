import { FiEdit2, FiTrash } from 'react-icons/fi'

import { ButtonIcon, Tooltip } from '../../../components/Common'
import { convertStringToCompare } from '../../../utils/convertStringToCompare'

import { Container } from './styles';
import { usePriceTables } from '../../../hooks/usePriceTables';

export function PriceTablesTable({ search, onEdit, onDelete }) {
  const { priceTables } = usePriceTables()

  const renderPriceTables = priceTables.filter(
    obj => Object.keys(obj)
      .some(key => convertStringToCompare(obj[key])
      .includes(convertStringToCompare(search)))
    )

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Itens</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {renderPriceTables.map(priceTable => (
            <tr key={priceTable.id}>
              <td>{priceTable.name}</td>
              <td>{priceTable.items.length}</td>
              <td>
                <Tooltip text="Editar">
                  <ButtonIcon
                    onClick={() => onEdit(priceTable)}
                  >
                    <FiEdit2 />
                  </ButtonIcon>
                </Tooltip>
                <Tooltip text="Excluir">
                  <ButtonIcon onClick={() => onDelete(priceTable.id)}>
                    <FiTrash />
                  </ButtonIcon>
                </Tooltip>
              </td>
            </tr>
          ))}
          {!renderPriceTables.length && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>Nenhum registro encontrado com o termo: <strong>{search}</strong></td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
}
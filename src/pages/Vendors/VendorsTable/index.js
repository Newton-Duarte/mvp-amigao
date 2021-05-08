import { FiEdit2, FiTrash } from 'react-icons/fi'

import { ButtonIcon, Tooltip } from '../../../components/Common'
import { convertStringToCompare } from '../../../utils/convertStringToCompare'

import { Container } from './styles';
import { useVendors } from '../../../hooks/useVendors';
import { formatDate } from '../../../utils/formatDate';

export function VendorsTable({ search, onEdit, onDelete }) {
  const { vendors } = useVendors()

  const renderVendors = vendors.filter(
    obj => Object.keys(obj)
      .some(key => convertStringToCompare(obj[key])
      .includes(convertStringToCompare(search)))
    )

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Razão Social</th>
            <th>CNPJ</th>
            <th>Inscrição Estadual</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Criado em</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {renderVendors.map(vendor => (
            <tr key={vendor.id}>
              <td>{vendor.businessName}</td>
              <td>{vendor.employerNumber}</td>
              <td>{vendor.nationalIdentity}</td>
              <td>{vendor.city}</td>
              <td>{vendor.state}</td>
              <td>{vendor.phone}</td>
              <td>{vendor.email}</td>
              <td>{formatDate(vendor.createdAt)}</td>
              <td>
                <Tooltip text="Editar">
                  <ButtonIcon
                    onClick={() => onEdit(vendor)}
                  >
                    <FiEdit2 />
                  </ButtonIcon>
                </Tooltip>
                <Tooltip text="Excluir">
                  <ButtonIcon onClick={() => onDelete(vendor.id)}>
                    <FiTrash />
                  </ButtonIcon>
                </Tooltip>
              </td>
            </tr>
          ))}
          {!renderVendors.length && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>Nothing found with the term: <strong>{search}</strong></td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
}
import { FiEdit2, FiTrash } from 'react-icons/fi'

import { ButtonIcon, Tooltip } from '../../../components/Common'
import { convertStringToCompare } from '../../../utils/convertStringToCompare'

import { Container } from './styles';
import { useCustomers } from '../../../hooks/useCustomers';
import { formatDate } from '../../../utils/formatDate';

export function CustomersTable({ search, onEdit, onDelete }) {
  const { customers } = useCustomers()

  const renderCustomers = customers.filter(
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
          {renderCustomers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.businessName}</td>
              <td>{customer.employerNumber}</td>
              <td>{customer.nationalIdentity}</td>
              <td>{customer.city}</td>
              <td>{customer.state}</td>
              <td>{customer.phone}</td>
              <td>{customer.email}</td>
              <td>{formatDate(customer.createdAt)}</td>
              <td>
                <Tooltip text="Editar">
                  <ButtonIcon
                    onClick={() => onEdit(customer)}
                  >
                    <FiEdit2 />
                  </ButtonIcon>
                </Tooltip>
                <Tooltip text="Excluir">
                  <ButtonIcon onClick={() => onDelete(customer.id)}>
                    <FiTrash />
                  </ButtonIcon>
                </Tooltip>
              </td>
            </tr>
          ))}
          {!renderCustomers.length && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>Nenhum registro encontrado com o termo: <strong>{search}</strong></td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
}
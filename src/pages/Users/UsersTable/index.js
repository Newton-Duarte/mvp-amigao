import { FiEdit2, FiTrash } from 'react-icons/fi'

import { ButtonIcon, Tooltip } from '../../../components/Common'
import { formatDate } from '../../../utils/formatDate';
import { convertStringToCompare } from '../../../utils/convertStringToCompare'

import { Container } from './styles';
import { useUsers } from '../../../hooks/useUsers';

export function UsersTable({ search, onEdit, onDelete }) {
  const { users } = useUsers()

  const renderUsers = users.filter(
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
            <th>E-mail</th>
            <th>Criado em</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {renderUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {formatDate(new Date(user.createdAt), 'pt-BR')}
              </td>
              <td>
                <Tooltip text="Editar">
                  <ButtonIcon
                    onClick={() => onEdit(user)}
                  >
                    <FiEdit2 />
                  </ButtonIcon>
                </Tooltip>
                <Tooltip text="Excluir">
                  <ButtonIcon onClick={() => onDelete(user.id)}>
                    <FiTrash />
                  </ButtonIcon>
                </Tooltip>
              </td>
            </tr>
          ))}
          {!renderUsers.length && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>Nenhum registro encontrado com o termo: <strong>{search}</strong></td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
}
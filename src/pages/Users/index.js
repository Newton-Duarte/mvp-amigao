import { useEffect, useState } from 'react'

import {
  Input
} from '../../components/Common'

import { UserModal } from './UserModal'
import { UsersTable } from './UsersTable'

import { useUsers } from '../../hooks/useUsers'

import { Container, Header } from './styles'

export default function Users() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const [userEdit, setUserEdit] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
 
  const { users, createUser, updateUser, deleteUser } = useUsers()

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedTerm(searchTerm), 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [searchTerm])

  useEffect(() => {
    if (!isUserModalOpen) {
      setUserEdit(null)
    }
  }, [isUserModalOpen])

  const handleAddUser = (user) => {
    console.log(user)
    if (user.id) {
      updateUser(user)
      setIsUserModalOpen(false)
    } else {
      createUser(user)
      setIsUserModalOpen(false)
    }
  }

  const handleEdit = user => {
    console.log(user)
    setUserEdit(user)
    setIsUserModalOpen(true)
  }

  const handleDelete = id => {
    if (window.confirm(`Want to delete the id ${id}?`)) {
      deleteUser(id)
    }
  }

  return (
    <Container>
      <Header>
        <h1>Users ({users.length})</h1>
        <div>
          <Input
            type="search"
            placeholder="Pesquisar..."
            onChange={({ target }) => setSearchTerm(target.value)}
          />
          <button
            type="button"
            onClick={() => setIsUserModalOpen(true)}
          >
            Novo
          </button>
        </div>
      </Header>
      <UserModal
        isOpen={isUserModalOpen}
        onRequestClose={() => setIsUserModalOpen(false)}
        editUser={userEdit}
        onSubmit={handleAddUser}
      />
      <UsersTable
        users={users} 
        search={debouncedTerm}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Container>
  )
}
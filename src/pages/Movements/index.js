import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid'
import { Button, ButtonIcon, SearchBar, Select, Tooltip } from '../../components/Common';
import { MovementModal } from './MovementsModal';
import { MovementsTable } from './MovementsTable';
import { MovementsTotalizer } from './MovementsTotalizer';
import { useMovements } from '../../hooks/useMovements';
import { Container, Header, TitleFilters, ActiveFilters } from './styles'
import { useUsers } from '../../hooks/useUsers';
import { formatDate } from '../../utils/formatDate';
import { FiX } from 'react-icons/fi';
import { useProducts } from '../../hooks/useProducts';

export default function Movements() {
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
  const { 
    movements, 
    createMovement, 
    editMovement, 
    deleteMovement, 
    completeMovement 
  } = useMovements()
  const [movementEdit, setMovementEdit] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
  const [date, setDate] = useState({
    start: new Date().toISOString().substr(0, 10),
    end: new Date().toISOString().substr(0, 10)
  })
  const [filterUser, setFilterUser] = useState()
  const [filters, setFilters] = useState({
    search: debouncedTerm,
    date,
    userId: filterUser
  })

  const { users } = useUsers()
  const { updateProductQuantity } = useProducts()

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedTerm(searchTerm), 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [searchTerm])

  useEffect(() => {
    if (!isMovementModalOpen) {
      setMovementEdit(null)
    }
  }, [isMovementModalOpen])

  const handleAddMovement = (movement) => {
    console.log(movement)
    if (movement.id) {
      editMovement(movement)
      setIsMovementModalOpen(false)
    } else {
      createMovement(movement)
      
      const isOutput = movement.type === 'Saída'

      if (isOutput) {
        movement.items.forEach(item => {
          updateProductQuantity(item.productId, -item.quantity)
        })
      } else {
        movement.items.forEach(item => {
          updateProductQuantity(item.productId, item.quantity)
        })
      }
      setIsMovementModalOpen(false)
    }
  }

  const handleEdit = movement => {
    console.log(movement)
    setMovementEdit(movement)
    setIsMovementModalOpen(true)
  }

  const handleDelete = id => {
    if (window.confirm(`Deseja excluir o movimento ${id}?`)) {
      deleteMovement(id)
    }
  }

  const handleComplete = id => {
    if (window.confirm(`Deseja finalizar o movimento ${id}?`)) {
      completeMovement(id)
    }
  }

  const handleChangeFilterUser = ({ target }) => {
    const userId = target.value
    setFilterUser(userId)
  }

  const handleSaveFilter = date => {
    setDate(date)
    setFilters({
      ...filters,
      date,
      userId: filterUser
    })
  }

  const handleRemoverFilterUser = () => {
    setFilterUser()
    setFilters({
      ...filters,
      userId: ''
    })
  }

  return (
    <Container>
      <Header>
        <TitleFilters>
          <h1>Movimentos ({movements.length})</h1>
          <ActiveFilters>
            {Object.keys(filters)
              .map(key => {
                if (key === 'date') {
                  return (
                    <li key={uuid()}>
                      <span>Data Inicial: </span> {formatDate(new Date(filters[key].start + ' 00:00'))}&nbsp;
                      <span>Data Final: </span> {formatDate(new Date(filters[key].end + ' 00:00'))}
                    </li>
                  )
                } else if (key === 'userId' && !!filters.userId) {
                  const user = users.find(user => +user.id === +filters.userId)
                  return (
                    <li key={uuid()}>
                      <span>Colaborador:</span> {user.name}
                      <Tooltip text="Remover" left="32px">
                        <ButtonIcon onClick={handleRemoverFilterUser}>
                          <FiX />
                        </ButtonIcon>
                      </Tooltip>
                    </li>
                  )
                }
                return ''
              })}
          </ActiveFilters>
        </TitleFilters>
        <div>
          <SearchBar
            type="text"
            placeholder="Pesquisar..."
            onChange={({ target }) => setSearchTerm(target.value)}
            filters
            onSaveFilter={handleSaveFilter}
          >
            <Select
              name="user"
              label="Filtrar Colaborador"
              value={filterUser}
              onChange={handleChangeFilterUser}
              containerStyle={{ marginTop: '1rem', fontWeight: 'bold' }}
            >
              {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
            </Select>
          </SearchBar>
          <Button
            type="button"
            onClick={() => setIsMovementModalOpen(true)}
          >
            Novo
          </Button>
        </div>
      </Header>
      <MovementsTotalizer />
      <MovementModal
        isOpen={isMovementModalOpen}
        onRequestClose={() => setIsMovementModalOpen(false)}
        editMovement={movementEdit}
        onSubmit={handleAddMovement}
      />
      <MovementsTable
        movements={movements}
        filters={filters}
        search={debouncedTerm}
        onEdit={handleEdit}
        onComplete={handleComplete}
        onDelete={handleDelete}
      />
    </Container>
  )
}
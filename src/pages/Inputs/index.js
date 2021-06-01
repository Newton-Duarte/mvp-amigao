import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid'
import { Button, ButtonIcon, SearchBar, Select, Tooltip } from '../../components/Common';
import { InputModal } from './InputsModal';
import { InputsTable } from './InputsTable';
import { InputsTotalizer } from './InputsTotalizer';
import { useInputs } from '../../hooks/useInputs';
import { Container, Header, TitleFilters, ActiveFilters } from './styles'
import { useUsers } from '../../hooks/useUsers';
import { formatDate } from '../../utils/formatDate';
import { FiX } from 'react-icons/fi';
import { useProducts } from '../../hooks/useProducts';

export default function Inputs() {
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const { 
    inputs, 
    createInput, 
    editInput, 
    deleteInput, 
    completeInput 
  } = useInputs()
  const [inputEdit, setInputEdit] = useState()
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
    if (!isInputModalOpen) {
      setInputEdit(null)
    }
  }, [isInputModalOpen])

  const handleAddInput = (input) => {
    console.log(input)
    if (input.id) {
      editInput(input)
      setIsInputModalOpen(false)
    } else {
      createInput(input)
      
      const isInput = input.type === 'Saída'

      if (isInput) {
        input.items.forEach(item => {
          updateProductQuantity(item.productId, -item.quantity)
        })
      } else {
        input.items.forEach(item => {
          updateProductQuantity(item.productId, item.quantity)
        })
      }
      setIsInputModalOpen(false)
    }
  }

  const handleEdit = input => {
    console.log(input)
    setInputEdit(input)
    setIsInputModalOpen(true)
  }

  const handleDelete = id => {
    if (window.confirm(`Deseja excluir o movimento ${id}?`)) {
      deleteInput(id)
    }
  }

  const handleComplete = id => {
    if (window.confirm(`Deseja finalizar o movimento ${id}?`)) {
      completeInput(id)
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
          <h1>Entradas ({inputs.length})</h1>
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
            onClick={() => setIsInputModalOpen(true)}
          >
            Novo
          </Button>
        </div>
      </Header>
      <InputsTotalizer />
      <InputModal
        isOpen={isInputModalOpen}
        onRequestClose={() => setIsInputModalOpen(false)}
        editInput={inputEdit}
        onSubmit={handleAddInput}
      />
      <InputsTable
        inputs={inputs}
        filters={filters}
        search={debouncedTerm}
        onEdit={handleEdit}
        onComplete={handleComplete}
        onDelete={handleDelete}
      />
    </Container>
  )
}
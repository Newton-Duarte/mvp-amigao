import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { v4 as uuid } from 'uuid'

import { formatDate } from "../../../utils/formatDate";
import { useOutputs } from '../../../hooks/useOutputs'
import { useUsers } from '../../../hooks/useUsers'

import { Modal, Button, Tooltip, ButtonIcon, SearchBar, Select } from "../../../components/Common";

import { Container, Header, ActiveFilters, Actions } from './styles';
import { OutputsTableSelect } from "../../Outputs/OutputsTableSelect";

export function OutputsListSelectModal({ isOpen, onRequestClose, selected, onSubmit }) {
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
  const [selectedOutputs, setSelectedOutputs] = useState([])

  useEffect(() => {
    setSelectedOutputs(selected)
  }, [selected])

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedTerm(searchTerm), 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [searchTerm])

  const { users } = useUsers()
  const { outputs } = useOutputs()

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

  const handleSelectOutput = outputId => {
    const outputIsSelected = selectedOutputs.some(output => +output.id === +outputId)
    
    if (!outputIsSelected) {
      const output = outputs.find(output => +output.id === +outputId)
      return setSelectedOutputs([
        ...selectedOutputs,
        output
      ])
    } else {
      setSelectedOutputs(
        selectedOutputs.filter(output => +output.id !== +outputId)
      )
    }
  }

  const handleSubmit = () => {
    onSubmit(selectedOutputs)
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      size="large"
    >
      <Container>
        <Header>
          <h2>Selecione os pedidos</h2>
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
          </div>
        </Header>
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
        <OutputsTableSelect
          outputs={outputs}
          selectedOutputs={selectedOutputs}
          filters={filters}
          search={debouncedTerm}
          onSelect={handleSelectOutput}
        />
        <Actions>
          <Button type="button" onClick={onRequestClose}>Cancelar</Button>
          <Button type="submit" onClick={handleSubmit}>Confirmar</Button>
        </Actions>
      </Container>
    </Modal>
  )
}
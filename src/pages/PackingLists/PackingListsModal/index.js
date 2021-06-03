import { useCallback, useEffect, useState } from "react";

import { useOutputs } from '../../../hooks/useOutputs'
import { useUsers } from '../../../hooks/useUsers'

import { Modal, Select, Button, Input, FormGroup, Chip } from "../../../components/Common";
import { PackingListOutputsTable } from '../PackingListOutputsTable'
import { PackingListOutputsProductsTable } from '../PackingListOutputsProductsTable'
import { EditPackingListItemModal } from '../EditPackingListItemModal'

import { Actions, AddItem, Container, Header, ItemsContainer, ItemsHeader, TabsContainer, TabButton, TabContent, ItemsTotal, AddButton } from './styles';
import { formatNumberToCurrency } from "../../../utils/formatNumberToCurrency";
import { OutputsListSelectModal } from "../OutputsListSelectModal";

export function PackingListModal({ isOpen, onRequestClose, editPackingList, onSubmit }) {
  const [isOutputsListSelectModal, setIsOutputsListSelectModal] = useState(false);
  const [tab, setTab] = useState('outputs')
  const [packingList, setPackingList] = useState({
    driverId: '',
    driver: '',
    status: 'Pendente',
    items: []
  })
  const { outputs } = useOutputs()
  const { users } = useUsers()

  const [lastId, setLastId] = useState(0)

  useEffect(() => {
    if (editPackingList) {
      setPackingList(editPackingList)
    }
  }, [editPackingList])

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

  const totalPackingList = packingList.items.reduce((acc, item) => {
    acc += +item.total;
    return acc;
  }, 0);

  const handleSubmit = useCallback(event => {
    event.preventDefault()
    onSubmit({
      ...packingList,
      total: totalPackingList
    })

    resetForm()
  }, [packingList, onSubmit, totalPackingList]);

  const resetForm = () => {
    setPackingList({
      driverId: '',
      driver: '',
      status: 'Pendente',
      items: []
    })
  }

  const handleAddSelectedOuput = useCallback(selectedOutputs => {
    setPackingList({
      ...packingList,
      items: [...selectedOutputs]
    })
  }, [packingList])

  const handleDeleteItem = id => {
    if (window.confirm(`Deseja remover o item ${id}?`)) {
      setPackingList({
        ...packingList,
        items: [
          ...packingList.items.filter(item => +item.id !== +id)
        ]
      })
    }
  }

  const handleChangeDriver = ({ target }) => {
    const driverId = target.value
    const driver = users.find(user => +user.id === +driverId)
    if (driver) {
      setPackingList({ ...packingList, driverId: driver.id, driver: driver.name })
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      size="large"
    >
      <Container onSubmit={handleSubmit}>
        <Header>
          <h2>{packingList.id ? `Editar Romaneio` : `Nova Romaneio`}</h2>
          {packingList.id && <Chip className={packingList.status}>{packingList.status}</Chip>}
        </Header>
        <FormGroup>
          <Select
            name="user"
            label="Motorista"
            value={packingList.driverId}
            onChange={handleChangeDriver}
            disabled={packingList.status !== 'Pendente'}
          >
            {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
          </Select>
        </FormGroup>
        <ItemsContainer>
          <ItemsHeader>
            <TabsContainer>
              <TabButton
                type="button"
                onClick={() => setTab('outputs')}
                isActive={tab === 'outputs'}
              >
                Pedidos
              </TabButton>
              <TabButton
                type="button"
                onClick={() => setTab('items')}
                isActive={tab === 'items'}
              >
                Produtos
              </TabButton>
            </TabsContainer>
            {tab === 'outputs' && (
              <AddButton
                type="button"
                onClick={() => setIsOutputsListSelectModal(true)}
                disabled={packingList.status !== 'Pendente'}
              >
                Adicionar
              </AddButton>
            )}
          </ItemsHeader>
          <TabContent>
            {tab === 'outputs' && (
              <PackingListOutputsTable
                packingList={packingList}
                onDeleteClick={handleDeleteItem}
              />
            )}

            {tab === 'items' && (
              <PackingListOutputsProductsTable
                outputs={packingList.items}
              />
            )}
          </TabContent>
        </ItemsContainer>
        <Actions>
          <Button type="button" onClick={onRequestClose}>Cancelar</Button>
          <Button type="submit" disabled={packingList.status !== 'Pendente'}>Salvar</Button>
        </Actions>
      </Container>
      <OutputsListSelectModal
        isOpen={isOutputsListSelectModal}
        onRequestClose={() => setIsOutputsListSelectModal(false)}
        selected={packingList.items}
        onSubmit={handleAddSelectedOuput}
      />
    </Modal>
  )
}
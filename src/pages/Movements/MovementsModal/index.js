import { useCallback, useEffect, useState } from "react";
import { FiPlus } from 'react-icons/fi'

import { useProducts } from '../../../hooks/useProducts'
import { useCustomers } from '../../../hooks/useCustomers'
import { useVendors } from '../../../hooks/useVendors'
import { useUsers } from '../../../hooks/useUsers'

import { Modal, Select, Button, Input, FormGroup, Chip } from "../../../components/Common";
import { MovementProductsTable } from '../MovementProductsTable'
import { EditMovementItemModal } from '../EditMovementItemModal'

import { Actions, AddItem, Container, Header, ItemsContainer, ItemsHeader, ItemsTotal } from './styles';
import { formatNumberToCurrency } from "../../../utils/formatNumberToCurrency";

export function MovementModal({ isOpen, onRequestClose, editMovement, onSubmit }) {
  const [movement, setMovement] = useState({
    vendorId: '',
    vendor: '',
    customerId: '',
    customer: '',
    userId: 1,
    user: '',
    type: 'Saída',
    status: 'Pendente',
    items: []
  })
  const [movementItem, setMovementItem] = useState({
    productId: '',
    product: '',
    productPrice: 0,
    total: 0,
    quantity: 1
  })
  const { products } = useProducts()
  const { customers } = useCustomers()
  const { vendors } = useVendors()
  const { users } = useUsers()

  const [lastId, setLastId] = useState(0)
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)
  const [editMovementItem, setEditMovementItem] = useState()

  useEffect(() => {
    if (editMovement) {
      setMovement(editMovement)
    }
  }, [editMovement])

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

  const totalMovement = movement.items.reduce((acc, item) => {
    acc += +item.total;
    return acc;
  }, 0);

  const handleSubmit = useCallback(event => {
    event.preventDefault()
    onSubmit({
      ...movement,
      total: totalMovement
    })

    resetForm()
  }, [movement, onSubmit, totalMovement]);

  const resetForm = () => {
    setMovement({
      vendorId: '',
      vendor: '',
      customerId: '',
      customer: '',
      userId: 1,
      user: 'John Doe',
      type: 'Saída',
      status: 'Pendente',
      items: []
    })
  }

  const resetItemForm = () => {
    setMovementItem({
      productId: '',
      product: '',
      productPrice: 0,
      total: 0,
      quantity: 1
    })
  }

  const handleAddItem = useCallback(() => {
    const newItem = {
      ...movementItem,
      id: lastId + 1,
      quantity: movementItem.quantity,
      total: movementItem.quantity * movementItem.productPrice
    }

    setLastId(
      lastId + 1
    )

    setMovement({
      ...movement,
      items: [
        ...movement.items,
        newItem
      ]
    })

    resetItemForm()
  }, [lastId, movement, movementItem])

  const handleEditItemClick = id => {
    const item = movement.items.find(mItem => mItem.id === id)
    setEditMovementItem(item)
    setIsItemModalOpen(true)
  }

  const handleEditItem = item => {
    setMovement({
      ...movement,
      items: movement.items.map(mapItem => {
        if (mapItem.id === item.id) {
          return {
            ...item,
            total: item.quantity * item.productPrice,
          }
        } else {
          return mapItem
        }
      })
    })

    setIsItemModalOpen(false)
  }

  const handleDeleteItem = id => {
    if (window.confirm(`Deseja remover o item ${id}?`)) {
      setMovement({
        ...movement,
        items: movement.items.filter(item => item.id !== id)
      })
    }
  }

  const handleCloseItemModal = () => {
    setEditMovementItem()
    setIsItemModalOpen(false)
  }

  const handleChangeUser = ({ target }) => {
    const userId = target.value
    const user = users.find(user => +user.id === +userId)
    if (user) {
      setMovement({ ...movement, userId: user.id, user: user.name })
    }
  }

  const handleChangeType = ({ target }) => {
    setMovement({ 
      ...movement,
      type: target.value,
      customer: '',
      customerId: '',
      vendor: '',
      vendorId: '',
      items: []
    })
  }

  const handleChangeCustomer = ({ target }) => {
    const customerId = target.value
    const customer = customers.find(customer => +customer.id === +customerId)
    if (customer) {
      setMovement({ ...movement, customerId: customer.id, customer: customer.name })
    }
  }

  const handleChangeVendor = ({ target }) => {
    const vendorId = target.value
    const vendor = vendors.find(vendor => +vendor.id === +vendorId)
    if (vendor) {
      setMovement({ ...movement, vendorId: vendor.id, vendor: vendor.name })
    }
  }

  const handleChangeProduct = ({ target }) => {
    const productId = target.value
    const product = products.find(product => +product.id === +productId)
    if (product) {
      setMovementItem({ ...movementItem, productId: product.id, product: product.name, productPrice: product.price })
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
          <h2>{movement.id ? `Editar ${movement.type}` : `Nova ${movement.type}`}</h2>
          {movement.id && <Chip className={movement.status}>{movement.status}</Chip>}
        </Header>
        <FormGroup>
          <Select
            name="user"
            label="Colaborador"
            value={movement.userId}
            onChange={handleChangeUser}
            disabled={movement.status !== 'Pendente'}
          >
            {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
          </Select>
          <Select
            name="type"
            label="Tipo"
            value={movement.type}
            onChange={handleChangeType}
            disabled={movement.status !== 'Pendente'}
          >
            <option value="Entrada">Entrada</option>
            <option value="Saída">Saída</option>
          </Select>
          {movement.type === 'Saída' ? (
            <Select
              name="customer"
              label="Cliente"
              value={movement.customerId}
              onChange={handleChangeCustomer}
              disabled={movement.status !== 'Pendente'}
            >
              {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.name}</option>)}
            </Select>
          ) : (
            <Select
              name="vendor"
              label="Fornecedor"
              value={movement.vendorId}
              onChange={handleChangeVendor}
              disabled={movement.status !== 'Pendente'}
            >
              {vendors.map(vendor => <option key={vendor.id} value={vendor.id}>{vendor.name}</option>)}
            </Select>
          )}
        </FormGroup>
        <ItemsContainer>
          <ItemsHeader>
            <h4>Itens</h4>
            <ItemsTotal className="total">
              <p>Total:</p>
              <span>{formatNumberToCurrency(totalMovement)}</span>
            </ItemsTotal>
          </ItemsHeader>
          <AddItem>
            <Select
              name="product"
              label="Produto"
              value={movementItem.productId}
              onChange={handleChangeProduct}
              containerStyle={{ flex: 3, marginRight: '1rem' }}
              disabled={movement.status !== 'Pendente'}
            >
              {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
            </Select>
            <Input
              name="quantity"
              label="Quantidade"
              value={movementItem.quantity}
              onChange={({ target }) => setMovementItem({ ...movementItem, quantity: target.value })}
              containerStyle={{ flex: 1, marginRight: '1rem' }}
              disabled={movement.status !== 'Pendente'}
            />
            <Input
              name="productPrice"
              label="Preço"
              value={movementItem.productPrice}
              onChange={({ target }) => setMovementItem({ ...movementItem, productPrice: target.value })}
              containerStyle={{ flex: 1, marginRight: '1rem' }}
              disabled={movement.status !== 'Pendente'}
            />
            <Button onClick={handleAddItem} disabled={movement.status !== 'Pendente'}>
              <FiPlus />
            </Button>
          </AddItem>
          <MovementProductsTable
            movement={movement}
            onEditClick={handleEditItemClick}
            onDeleteClick={handleDeleteItem}
          />
        </ItemsContainer>
        <Actions>
          <Button type="button" onClick={onRequestClose}>Cancelar</Button>
          <Button type="submit" disabled={movement.status !== 'Pendente'}>Salvar</Button>
        </Actions>
      </Container>
      <EditMovementItemModal
        isOpen={isItemModalOpen}
        onRequestClose={handleCloseItemModal}
        movementItem={editMovementItem}
        onSubmit={handleEditItem}
      />
    </Modal>
  )
}
import { useCallback, useEffect, useState } from "react";
import { FiPlus } from 'react-icons/fi'

import { useProducts } from '../../../hooks/useProducts'
import { useVendors } from '../../../hooks/useVendors'
import { useUsers } from '../../../hooks/useUsers'
import { useInputTypes } from '../../../hooks/useInputTypes'

import { Modal, Select, Button, Input, FormGroup, Chip } from "../../../components/Common";
import { InputProductsTable } from '../InputProductsTable'
import { EditInputItemModal } from '../EditInputItemModal'

import { Actions, AddItem, Container, Header, ItemsContainer, ItemsHeader, ItemsTotal } from './styles';
import { formatNumberToCurrency } from "../../../utils/formatNumberToCurrency";

export function InputModal({ isOpen, onRequestClose, editInput, onSubmit }) {
  const [input, setInput] = useState({
    vendorId: '',
    vendor: '',
    userId: 1,
    user: 'Colaborador 01',
    type: 'Entrada',
    typeId: 1,
    status: 'Pendente',
    items: []
  })
  const [inputItem, setInputItem] = useState({
    productId: '',
    product: '',
    productPrice: 0,
    total: 0,
    quantity: 1
  })
  const { products } = useProducts()
  const { vendors } = useVendors()
  const { users } = useUsers()
  const { inputTypes } = useInputTypes()

  const [lastId, setLastId] = useState(0)
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)
  const [editInputItem, setEditInputItem] = useState()

  useEffect(() => {
    if (editInput) {
      setInput(editInput)
    }
  }, [editInput])

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

  const totalInput = input.items.reduce((acc, item) => {
    acc += +item.total;
    return acc;
  }, 0);

  const handleSubmit = useCallback(event => {
    event.preventDefault()
    onSubmit({
      ...input,
      total: totalInput
    })

    resetForm()
  }, [input, onSubmit, totalInput]);

  const resetForm = () => {
    setInput({
      vendorId: '',
      vendor: '',
      userId: 1,
      user: 'Colaborador 01',
      type: 'Entrada',
      typeId: 1,
      status: 'Pendente',
      items: []
    })
  }

  const resetItemForm = () => {
    setInputItem({
      productId: '',
      product: '',
      productPrice: 0,
      total: 0,
      quantity: 1
    })
  }

  const handleAddItem = useCallback(() => {
    const newItem = {
      ...inputItem,
      id: lastId + 1,
      quantity: inputItem.quantity,
      total: inputItem.quantity * inputItem.productPrice
    }

    setLastId(
      lastId + 1
    )

    setInput({
      ...input,
      items: [
        ...input.items,
        newItem
      ]
    })

    resetItemForm()
  }, [lastId, input, inputItem])

  const handleEditItemClick = id => {
    const item = input.items.find(mItem => mItem.id === id)
    setEditInputItem(item)
    setIsItemModalOpen(true)
  }

  const handleEditItem = item => {
    setInput({
      ...input,
      items: input.items.map(mapItem => {
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
      setInput({
        ...input,
        items: input.items.filter(item => item.id !== id)
      })
    }
  }

  const handleCloseItemModal = () => {
    setEditInputItem()
    setIsItemModalOpen(false)
  }

  const handleChangeUser = ({ target }) => {
    const userId = target.value
    const user = users.find(user => +user.id === +userId)
    if (user) {
      setInput({ ...input, userId: user.id, user: user.name })
    }
  }

  const handleChangeType = ({ target }) => {
    const typeId = target.value
    const inputType = inputTypes.find(inputType => +inputType.id === +typeId)
    if (inputType) {
      setInput({ ...input, typeId: inputType.id, type: inputType.name })
    }
  }

  const handleChangeVendor = ({ target }) => {
    const vendorId = target.value
    const vendor = vendors.find(vendor => +vendor.id === +vendorId)
    if (vendor) {
      setInput({ ...input, vendorId: vendor.id, vendor: vendor.name })
    }
  }

  const handleChangeProduct = ({ target }) => {
    const productId = target.value
    const product = products.find(product => +product.id === +productId)
    if (product) {
      setInputItem({ ...inputItem, productId: product.id, product: product.name, productPrice: product.price })
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
          <h2>{input.id ? `Editar Entrada` : `Nova Entrada`}</h2>
          {input.id && <Chip className={input.status}>{input.status}</Chip>}
        </Header>
        <FormGroup>
          <Select
            name="user"
            label="Colaborador"
            value={input.userId}
            onChange={handleChangeUser}
            disabled={input.status !== 'Pendente'}
          >
            {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
          </Select>
          <Select
            name="type"
            label="Tipo de Entrada"
            value={input.typeId}
            onChange={handleChangeType}
            disabled={input.status !== 'Pendente'}
          >
            {inputTypes.map(inputType => <option key={inputType.id} value={inputType.id}>{inputType.name}</option>)}
          </Select>
          <Select
            name="vendor"
            label="Fornecedor"
            value={input.vendorId}
            onChange={handleChangeVendor}
            disabled={input.status !== 'Pendente'}
          >
            {vendors.map(vendor => <option key={vendor.id} value={vendor.id}>{vendor.name}</option>)}
          </Select>
        </FormGroup>
        <ItemsContainer>
          <ItemsHeader>
            <h4>Itens</h4>
            <ItemsTotal className="total">
              <p>Total:</p>
              <span>{formatNumberToCurrency(totalInput)}</span>
            </ItemsTotal>
          </ItemsHeader>
          <AddItem>
            <Select
              name="product"
              label="Produto"
              value={inputItem.productId}
              onChange={handleChangeProduct}
              containerStyle={{ flex: 3, marginRight: '1rem' }}
              disabled={input.status !== 'Pendente'}
            >
              {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
            </Select>
            <Input
              name="quantity"
              label="Quantidade"
              value={inputItem.quantity}
              onChange={({ target }) => setInputItem({ ...inputItem, quantity: target.value })}
              containerStyle={{ flex: 1, marginRight: '1rem' }}
              disabled={input.status !== 'Pendente'}
            />
            <Input
              name="productPrice"
              label="Preço"
              value={inputItem.productPrice}
              onChange={({ target }) => setInputItem({ ...inputItem, productPrice: target.value })}
              containerStyle={{ flex: 1, marginRight: '1rem' }}
              disabled={input.status !== 'Pendente'}
            />
            <Button onClick={handleAddItem} disabled={input.status !== 'Pendente'}>
              <FiPlus />
            </Button>
          </AddItem>
          <InputProductsTable
            input={input}
            onEditClick={handleEditItemClick}
            onDeleteClick={handleDeleteItem}
          />
        </ItemsContainer>
        <Actions>
          <Button type="button" onClick={onRequestClose}>Cancelar</Button>
          <Button type="submit" disabled={input.status !== 'Pendente'}>Salvar</Button>
        </Actions>
      </Container>
      <EditInputItemModal
        isOpen={isItemModalOpen}
        onRequestClose={handleCloseItemModal}
        inputItem={editInputItem}
        onSubmit={handleEditItem}
      />
    </Modal>
  )
}
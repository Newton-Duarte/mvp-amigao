import { useCallback, useEffect, useState } from "react";
import { FiPlus } from 'react-icons/fi'

import { useProducts } from '../../../hooks/useProducts'
import { useCustomers } from '../../../hooks/useCustomers'
import { useUsers } from '../../../hooks/useUsers'
import { useOutputTypes } from '../../../hooks/useOutputTypes'
import { usePriceTables } from '../../../hooks/usePriceTables'

import { Modal, Select, Button, Input, FormGroup, Chip } from "../../../components/Common";
import { OutputProductsTable } from '../OutputProductsTable'
import { EditOutputItemModal } from '../EditOutputItemModal'

import { Actions, AddItem, Container, Header, ItemsContainer, ItemsHeader, ItemsTotal } from './styles';
import { formatNumberToCurrency } from "../../../utils/formatNumberToCurrency";

export function OutputModal({ isOpen, onRequestClose, editOutput, onSubmit }) {
  const [output, setOutput] = useState({
    customerId: '',
    customer: '',
    userId: 1,
    user: 'Colaborador 01',
    type: 'Saída',
    typeId: 1,
    status: 'Pendente',
    items: []
  })
  const [outputItem, setOutputItem] = useState({
    productId: '',
    product: '',
    productPrice: 0,
    total: 0,
    quantity: 1
  })
  const { products } = useProducts()
  const { customers } = useCustomers()
  const { users } = useUsers()
  const { outputTypes } = useOutputTypes()
  const { priceTables } = usePriceTables()

  const [lastId, setLastId] = useState(0)
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)
  const [editOutputItem, setEditOutputItem] = useState()
  const [priceTable, setPriceTable] = useState()

  const resetForm = useCallback(() => {
    setOutput({
      customerId: '',
      customer: '',
      userId: 1,
      user: 'Colaborador 01',
      type: 'Saída',
      typeId: 1,
      status: 'Pendente',
      items: []
    })
    resetItemForm()
    setLastId(0)
  }, [])

  useEffect(() => {
    if (editOutput) {
      setOutput(editOutput)
      setLastId(
        editOutput.items[editOutput.items.length - 1]?.id
      )
    }
  }, [editOutput])

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen, resetForm])

  const totalOutput = output.items.reduce((acc, item) => {
    acc += +item.total;
    return acc;
  }, 0)

  const resetItemForm = () => {
    setOutputItem({
      productId: '',
      product: '',
      productPrice: 0,
      total: 0,
      quantity: 1
    })
  }

  const handleAddItem = useCallback(() => {
    const newItem = {
      ...outputItem,
      id: lastId + 1,
      quantity: outputItem.quantity,
      total: outputItem.quantity * outputItem.productPrice
    }

    setLastId(
      lastId + 1
    )

    setOutput({
      ...output,
      items: [
        ...output.items,
        newItem
      ]
    })

    resetItemForm()
  }, [lastId, output, outputItem])

  const handleEditItemClick = id => {
    const item = output.items.find(mItem => +mItem.id === +id)
    console.log(id, item)
    setEditOutputItem(item)
    setIsItemModalOpen(true)
  }

  const handleEditItem = item => {
    setOutput({
      ...output,
      items: output.items.map(mapItem => {
        if (+mapItem.id === +item.id) {
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
      setOutput({
        ...output,
        items: output.items.filter(item => item.id !== id)
      })
    }
  }

  const handleCloseItemModal = () => {
    setEditOutputItem()
    setIsItemModalOpen(false)
  }

  const handleChangeUser = ({ target }) => {
    const userId = target.value
    const user = users.find(user => +user.id === +userId)
    if (user) {
      setOutput({ ...output, userId: user.id, user: user.name })
    }
  }

  const handleChangeType = ({ target }) => {
    const typeId = target.value
    const outputType = outputTypes.find(outputType => +outputType.id === +typeId)
    if (outputType) {
      setOutput({ ...output, typeId: outputType.id, type: outputType.name })
    }
  }

  const handleChangeCustomer = ({ target }) => {
    const customerId = target.value
    const customer = customers.find(customer => +customer.id === +customerId)

    if (customer) {
      setOutput({ 
        ...output, 
        customerId: customer.id, 
        customer: customer.name,
        priceTableId: customer.priceTableid
      })

      if (!customer.priceTableId) {
        return setPriceTable()
      }

      const foundPriceTable = priceTables.find(pTable => +pTable.id === +customer.priceTableId)

      if (foundPriceTable) {
        setPriceTable(foundPriceTable)
      }
    }
  }

  const handleChangeProduct = ({ target }) => {
    const productId = target.value
    const product = products.find(product => +product.id === +productId)

    if (!product) return

    if (!priceTable) {
      return setOutputItem({ 
        ...outputItem, 
        productId: product.id, 
        product: product.name, 
        productPrice: product.price
      })
    }

    const priceTableProduct = priceTable.items.find(priceTableProduct => +priceTableProduct.productId === +productId)

    if (!priceTableProduct) {
      return setOutputItem({ 
        ...outputItem, 
        productId: product.id, 
        product: product.name, 
        productPrice: product.price
      })
    }

    setOutputItem({ 
      ...outputItem, 
      productId: product.id, 
      product: product.name, 
      productPrice: priceTableProduct.productPrice
    })
  }

  const handleSubmit = useCallback(event => {
    event.preventDefault()
    onSubmit({
      ...output,
      total: totalOutput
    })

    resetForm()
  }, [output, onSubmit, totalOutput, resetForm])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      size="large"
    >
      <Container onSubmit={handleSubmit}>
        <Header>
          <h2>{output.id ? `Editar Saída` : `Nova Saída`}</h2>
          {output.id && <Chip className={output.status}>{output.status}</Chip>}
        </Header>
        <FormGroup>
          <Select
            name="user"
            label="Colaborador"
            value={output.userId}
            onChange={handleChangeUser}
            disabled={output.status !== 'Pendente'}
          >
            {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
          </Select>
          <Select
            name="type"
            label="Tipo de Saída"
            value={output.typeId}
            onChange={handleChangeType}
            disabled={output.status !== 'Pendente'}
          >
            {outputTypes.map(outputType => <option key={outputType.id} value={outputType.id}>{outputType.name}</option>)}
          </Select>
          <Select
            name="customer"
            label="Cliente"
            value={output.customerId}
            onChange={handleChangeCustomer}
            disabled={output.status !== 'Pendente' || output.items.length > 0}
          >
            {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.name}</option>)}
          </Select>
        </FormGroup>
        <ItemsContainer>
          <ItemsHeader>
            <h4>Itens</h4>
            <ItemsTotal className="total">
              <p>Total:</p>
              <span>{formatNumberToCurrency(totalOutput)}</span>
            </ItemsTotal>
          </ItemsHeader>
          <AddItem>
            <Select
              name="product"
              label="Produto"
              value={outputItem.productId}
              onChange={handleChangeProduct}
              containerStyle={{ flex: 3, marginRight: '1rem' }}
              disabled={output.status !== 'Pendente'}
            >
              {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
            </Select>
            <Input
              name="quantity"
              label="Quantidade"
              value={outputItem.quantity}
              onChange={({ target }) => setOutputItem({ ...outputItem, quantity: target.value })}
              containerStyle={{ flex: 1, marginRight: '1rem' }}
              disabled={output.status !== 'Pendente'}
            />
            <Input
              name="productPrice"
              label="Preço"
              value={outputItem.productPrice}
              onChange={({ target }) => setOutputItem({ ...outputItem, productPrice: target.value })}
              containerStyle={{ flex: 1, marginRight: '1rem' }}
              disabled={output.status !== 'Pendente'}
            />
            <Button onClick={handleAddItem} disabled={output.status !== 'Pendente'}>
              <FiPlus />
            </Button>
          </AddItem>
          <OutputProductsTable
            output={output}
            onEditClick={handleEditItemClick}
            onDeleteClick={handleDeleteItem}
          />
        </ItemsContainer>
        <Actions>
          <Button type="button" onClick={onRequestClose}>Cancelar</Button>
          <Button type="submit" disabled={output.status !== 'Pendente'}>Salvar</Button>
        </Actions>
      </Container>
      <EditOutputItemModal
        isOpen={isItemModalOpen}
        onRequestClose={handleCloseItemModal}
        movementItem={editOutputItem}
        onSubmit={handleEditItem}
      />
    </Modal>
  )
}
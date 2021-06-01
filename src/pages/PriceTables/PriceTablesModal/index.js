import { useCallback, useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi'

import { useProducts } from '../../../hooks/useProducts'

import { Modal, Button, Input, Select, FormGroup } from '../../../components/Common';
import { PriceTableProductsTable } from '../PriceTableProductsTable'

import { Actions, Container, Header, ItemsContainer, ItemsHeader, AddItem } from './styles';

export function PriceTablesModal({ isOpen, onRequestClose, editPriceTable, onSubmit }) {
  const [priceTable, setPriceTable] = useState({
    name: '',
    items: []
  })
  const [priceTableItem, setPriceTableItem] = useState({
    productId: '',
    product: '',
    productPrice: 0
  })
  const [lastId, setLastId] = useState(0)

  const { products } = useProducts()

  useEffect(() => {
    if (editPriceTable) {
      setPriceTable(editPriceTable)
    }
  }, [editPriceTable])

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

  const handleSubmit = useCallback(event => {
    event.preventDefault()
    onSubmit({
      ...priceTable
    })

    resetForm()
  }, [priceTable, onSubmit]);

  const resetForm = () => {
    setPriceTable({
      name: '',
      items: []
    })
  }

  const resetItemForm = () => {
    setPriceTableItem({
      productId: '',
      product: '',
      productPrice: 0
    })
  }

  const handleAddItem = useCallback(() => {
    const newItem = {
      ...priceTableItem,
      id: lastId + 1
    }

    setLastId(
      lastId + 1
    )

    setPriceTable({
      ...priceTable,
      items: [
        ...priceTable.items,
        newItem
      ]
    })

    resetItemForm()
  }, [lastId, priceTable, priceTableItem])

  const handleDeleteItem = id => {
    if (window.confirm(`Deseja remover o item ${id}?`)) {
      setPriceTable({
        ...priceTable,
        items: priceTable.items.filter(item => item.id !== id)
      })
    }
  }

  const handleChangeProduct = ({ target }) => {
    const productId = target.value
    const product = products.find(product => +product.id === +productId)
    
    if (product) {
      setPriceTableItem({ ...priceTableItem, productId: product.id, product: product.name, productPrice: product.price })
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      size="large"
      onRequestClose={onRequestClose}
    >
      <Container onSubmit={handleSubmit}>
        <Header>
          <h2>{priceTable.id ? 'Editar Tabela Preço' : 'Novo Tabela Preço'}</h2>
        </Header>
        <FormGroup>
          <Input
            name="name"
            label="Nome"
            value={priceTable.name}
            onChange={({ target }) => setPriceTable({ ...priceTable, name: target.value })}
          />
        </FormGroup>
        <ItemsContainer>
          <ItemsHeader>
            <h4>Itens</h4>
          </ItemsHeader>
          <AddItem>
            <Select
              name="product"
              label="Produto"
              value={priceTableItem.productId}
              onChange={handleChangeProduct}
              containerStyle={{ flex: 3, marginRight: '1rem' }}
            >
              {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
            </Select>
            <Input
              name="productPrice"
              label="Preço"
              value={priceTableItem.productPrice}
              onChange={({ target }) => setPriceTableItem({ ...priceTableItem, productPrice: target.value })}
              containerStyle={{ flex: 1, marginRight: '1rem' }}
            />
            <Button onClick={handleAddItem}>
              <FiPlus />
            </Button>
          </AddItem>
          <PriceTableProductsTable
            priceTable={priceTable}
            onDeleteClick={handleDeleteItem}
          />
        </ItemsContainer>
        <Actions>
          <Button type="button" onClick={onRequestClose}>Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </Actions>
      </Container>
    </Modal>
  )
}
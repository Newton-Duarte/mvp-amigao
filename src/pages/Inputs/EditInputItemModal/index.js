import { useCallback, useEffect, useState } from "react";

import { Modal } from "../../../components/Common";
import { Select } from '../../../components/Common'
import { Button } from '../../../components/Common'
import { Input } from "../../../components/Common";

import { Container } from './styles';

import { useProducts } from '../../../hooks/useProducts'

export function EditInputItemModal({ isOpen, onRequestClose, movementItem, onSubmit }) {
  const [editInputItem, setEditInputItem] = useState({
    id: '',
    productId: '',
    product: '',
    productPrice: 0,
    total: 0,
    quantity: 1
  })

  const { products } = useProducts()

  useEffect(() => {
    if (movementItem) {
      setEditInputItem(movementItem)
    }
  }, [movementItem])

  const handleSubmit = useCallback(event => {
    event.preventDefault()
    onSubmit({
      ...editInputItem
    })
  }, [editInputItem, onSubmit])

  const handleChangeProduct = ({ target }) => {
    const productId = target.value
    const product = products.find(product => +product.id === +productId)
    setEditInputItem({ ...editInputItem, productId: product.id, product: product.name, productPrice: product.price })
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      size="small"
    >
      <Container onSubmit={handleSubmit}>
        <h2>Editar Item ({editInputItem.id})</h2>
        <Select
          name="product"
          label="Produto"
          value={editInputItem.productId}
          onChange={handleChangeProduct}
        >
          {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
        </Select>
        <Input
          name="quantity"
          label="Quantidade"
          value={editInputItem.quantity}
          onChange={({ target }) => setEditInputItem({ ...editInputItem, quantity: target.value })}
        />
        <Input
          name="productPrice"
          label="Preço"
          value={editInputItem.productPrice}
          onChange={({ target }) => setEditInputItem({ ...editInputItem, productPrice: target.value })}
        />
        <Button type="submit">Salvar</Button>
      </Container>
    </Modal>
  )
}
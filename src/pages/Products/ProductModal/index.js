import { useCallback, useEffect, useState } from 'react';

import { Modal, Button, Input, FormGroup } from '../../../components/Common';

import { Container, Header } from './styles';

export function ProductModal({ isOpen, onRequestClose, editProduct, onSubmit }) {
  const [product, setProduct] = useState({
    name: '',
    price: ''
  })

  useEffect(() => {
    if (editProduct) {
      setProduct(editProduct)
    }
  }, [editProduct])

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

  const handleSubmit = useCallback(event => {
    event.preventDefault()
    onSubmit({
      ...product
    })

    resetForm()
  }, [product, onSubmit]);

  const resetForm = () => {
    setProduct({
      name: '',
      price: ''
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <Container onSubmit={handleSubmit}>
        <Header>
          <h2>{product.id ? 'Edit Product' : 'New Product'}</h2>
        </Header>
        <FormGroup>
          <Input
            name="name"
            label="Name"
            value={product.name}
            onChange={({ target }) => setProduct({ ...product, name: target.value })}
          />
          <Input
            name="price"
            label="Price"
            type="price"
            value={product.price}
            onChange={({ target }) => setProduct({ ...product, price: target.value })}
          />
        </FormGroup>
        <Button type="submit">Save</Button>
      </Container>
    </Modal>
  )
}
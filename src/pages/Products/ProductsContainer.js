import { useEffect, useState } from 'react'

import {
  Input
} from '../../components/Common'

import { ProductModal } from './ProductModal'
import { ProductsTable } from './ProductsTable'

import { useProducts } from '../../hooks/useProducts'

import { Container, Header } from './styles'

export default function ProductsContainer() {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const [productEdit, setProductEdit] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
 
  const { products, createProduct, updateProduct, deleteProduct } = useProducts()

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedTerm(searchTerm), 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [searchTerm])

  useEffect(() => {
    if (!isProductModalOpen) {
      setProductEdit(null)
    }
  }, [isProductModalOpen])

  const handleAddProduct = (product) => {
    console.log(product)
    if (product.id) {
      updateProduct(product)
      setIsProductModalOpen(false)
    } else {
      createProduct(product)
      setIsProductModalOpen(false)
    }
  }

  const handleEdit = product => {
    console.log(product)
    setProductEdit(product)
    setIsProductModalOpen(true)
  }

  const handleDelete = id => {
    if (window.confirm(`Deseja excluir o produto ${id}?`)) {
      deleteProduct(id)
    }
  }

  return (
    <Container>
      <Header>
        <h1>Produtos ({products.length})</h1>
        <div>
          <Input
            type="search"
            placeholder="Pesquisar..."
            onChange={({ target }) => setSearchTerm(target.value)}
          />
          <button
            type="button"
            onClick={() => setIsProductModalOpen(true)}
          >
            Novo
          </button>
        </div>
      </Header>
      <ProductModal
        isOpen={isProductModalOpen}
        onRequestClose={() => setIsProductModalOpen(false)}
        editProduct={productEdit}
        onSubmit={handleAddProduct}
      />
      <ProductsTable
        products={products} 
        search={debouncedTerm}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Container>
  )
}
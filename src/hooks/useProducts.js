import { createContext, useContext, useEffect, useState } from 'react'

const ProductsContext = createContext({})

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: 'Água Mineral Mainá 20L',
        price: 6.00,
        quantity: 0
      },
      {
        id: 2,
        name: 'Água Mineral Mainá 10L',
        price: 5.00,
        quantity: 0
      }
    ])
  }, [])

  function createProduct(productInput) {
    const lastId = products[products.length - 1].id
    setProducts([...products, {
      ...productInput,
      createdAt: new Date(),
      id: lastId ? lastId + 1 : 1,
      quantity: 0
    }])
  }

  function updateProduct(productInput) {
    setProducts(
      products.map(mapProduct => {
        if (mapProduct.id === productInput.id) {
          return {
            ...productInput
          }
        } else {
          return mapProduct
        }
      })
    )
  }

  function updateProductQuantity(id, quantity) {
    const product = products.find(product => +product.id === +id)

    if (product) {
      product.quantity += +quantity
    }
  }

  function deleteProduct(id) {
    setProducts(
      products.filter(product => product.id !== id)
    )
  }

  return (
    <ProductsContext.Provider value={{ products, createProduct, updateProduct, updateProductQuantity, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)

  return context
}
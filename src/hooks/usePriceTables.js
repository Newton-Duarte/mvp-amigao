import { createContext, useContext, useEffect, useState } from 'react'

const PriceTablesContext = createContext({})

export function PriceTablesProvider({ children }) {
  const [priceTables, setPriceTables] = useState([])

  useEffect(() => {
    setPriceTables([
      {
        id: 1,
        name: 'Mainá 20L R$ 5,00',
        items: [
          {
            id: 1,
            productId: 1,
            product: 'Água Mineral Mainá 20L',
            productPrice: 5.00
          },
        ]
      },
      {
        id: 2,
        name: 'Mainá 20L R$ 5,50',
        items: [
          {
            id: 2,
            productId: 1,
            product: 'Água Mineral Mainá 20L',
            productPrice: 5.50
          },
        ]
      },
    ])
  }, [])

  function createPriceTable(priceTableInput) {
    const lastId = priceTables[priceTables.length - 1].id
    setPriceTables([...priceTables, {
      ...priceTableInput,
      createdAt: new Date(),
      id: lastId ? lastId + 1 : 1
    }])
  }

  function updatePriceTable(priceTableInput) {
    setPriceTables(
      priceTables.map(mapPriceTable => {
        if (mapPriceTable.id === priceTableInput.id) {
          return {
            ...priceTableInput
          }
        } else {
          return mapPriceTable
        }
      })
    )
  }

  function updatePriceTableQuantity(id, quantity) {
    const priceTable = priceTables.find(priceTable => +priceTable.id === +id)

    if (priceTable) {
      priceTable.quantity += +quantity
    }
  }

  function deletePriceTable(id) {
    setPriceTables(
      priceTables.filter(priceTable => priceTable.id !== id)
    )
  }

  return (
    <PriceTablesContext.Provider value={{ priceTables, createPriceTable, updatePriceTable, updatePriceTableQuantity, deletePriceTable }}>
      {children}
    </PriceTablesContext.Provider>
  )
}

export function usePriceTables() {
  const context = useContext(PriceTablesContext)

  return context
}
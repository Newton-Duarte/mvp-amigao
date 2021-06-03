import { createContext, useContext, useState } from 'react'

const PackingListsContext = createContext({})

export function PackingListsProvider({ children }) {
  const [packingLists, setPackingLists] = useState([])

  function createPackingList(packingListInput) {
    const lastId = packingLists[packingLists.length - 1] && packingLists[packingLists.length - 1].id
    setPackingLists([...packingLists, {
      ...packingListInput,
      createdAt: new Date(),
      id: lastId ? lastId + 1 : 1,
      status: 'Pendente'
    }])
  }

  function editPackingList(packingListInput) {
    setPackingLists(
      packingLists.map(mapPackingList => {
        if (mapPackingList.id === packingListInput.id) {
          return {
            ...packingListInput
          }
        } else {
          return mapPackingList
        }
      })
    )
  }

  function deletePackingList(id) {
    setPackingLists(
      packingLists.map(packingList => {
        if (packingList.id === id) {
          return {
            ...packingList,
            status: 'Cancelado'
          }
        } else {
          return packingList
        }
      })
    )
  }

  function completePackingList(id) {
    setPackingLists(
      packingLists.map(packingList => {
        if (packingList.id === id) {
          return {
            ...packingList,
            status: 'Finalizado'
          }
        } else {
          return packingList
        }
      })
    )
  }

  return (
    <PackingListsContext.Provider value={{ packingLists, createPackingList, editPackingList, deletePackingList, completePackingList }}>
      {children}
    </PackingListsContext.Provider>
  )
}

export function usePackingLists() {
  const context = useContext(PackingListsContext)

  return context
}
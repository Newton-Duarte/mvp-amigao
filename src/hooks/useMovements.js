import { createContext, useContext, useState } from 'react'

const MovementsContext = createContext({})

export function MovementsProvider({ children }) {
  const [movements, setMovements] = useState([])

  function createMovement(movementInput) {
    const lastId = movements[movements.length - 1] && movements[movements.length - 1].id
    setMovements([...movements, {
      ...movementInput,
      createdAt: new Date(),
      id: lastId ? lastId + 1 : 1,
      status: 'Pendente'
    }])
  }

  function editMovement(movementInput) {
    setMovements(
      movements.map(mapMovement => {
        if (mapMovement.id === movementInput.id) {
          return {
            ...movementInput
          }
        } else {
          return mapMovement
        }
      })
    )
  }

  function deleteMovement(id) {
    setMovements(
      movements.map(movement => {
        if (movement.id === id) {
          return {
            ...movement,
            status: 'Cancelado'
          }
        } else {
          return movement
        }
      })
    )
  }

  function completeMovement(id) {
    setMovements(
      movements.map(movement => {
        if (movement.id === id) {
          return {
            ...movement,
            status: 'Finalizado'
          }
        } else {
          return movement
        }
      })
    )
  }

  return (
    <MovementsContext.Provider value={{ movements, createMovement, editMovement, deleteMovement, completeMovement }}>
      {children}
    </MovementsContext.Provider>
  )
}

export function useMovements() {
  const context = useContext(MovementsContext)

  return context
}
import { createContext, useContext, useState } from 'react'

const InputsContext = createContext({})

export function InputsProvider({ children }) {
  const [inputs, setInputs] = useState([])

  function createInput(inputInput) {
    const lastId = inputs[inputs.length - 1] && inputs[inputs.length - 1].id
    setInputs([...inputs, {
      ...inputInput,
      createdAt: new Date(),
      id: lastId ? lastId + 1 : 1,
      status: 'Pendente'
    }])
  }

  function editInput(inputInput) {
    setInputs(
      inputs.map(mapInput => {
        if (mapInput.id === inputInput.id) {
          return {
            ...inputInput
          }
        } else {
          return mapInput
        }
      })
    )
  }

  function deleteInput(id) {
    setInputs(
      inputs.map(input => {
        if (input.id === id) {
          return {
            ...input,
            status: 'Cancelado'
          }
        } else {
          return input
        }
      })
    )
  }

  function completeInput(id) {
    setInputs(
      inputs.map(input => {
        if (input.id === id) {
          return {
            ...input,
            status: 'Finalizado'
          }
        } else {
          return input
        }
      })
    )
  }

  return (
    <InputsContext.Provider value={{ inputs, createInput, editInput, deleteInput, completeInput }}>
      {children}
    </InputsContext.Provider>
  )
}

export function useInputs() {
  const context = useContext(InputsContext)

  return context
}
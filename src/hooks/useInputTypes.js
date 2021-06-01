import { createContext, useContext, useEffect, useState } from 'react'

const InputTypesContext = createContext({})

export function InputTypesProvider({ children }) {
  const [inputTypes, setInputTypes] = useState([])

  useEffect(() => {
    setInputTypes([
      {
        id: 1,
        name: 'Compra',
        movesStock: true
      },
      {
        id: 2,
        name: 'Retorno Empréstimo',
        movesStock: true
      },
      {
        id: 3,
        name: 'Bonificação',
        movesStock: true
      }
    ])
  }, [])

  function createInputType(inputTypeInput) {
    const lastId = inputTypes[inputTypes.length - 1].id
    setInputTypes([...inputTypes, {
      ...inputTypeInput,
      createdAt: new Date(),
      id: lastId ? lastId + 1 : 1
    }])
  }

  function updateInputType(inputTypeInput) {
    setInputTypes(
      inputTypes.map(mapInputType => {
        if (mapInputType.id === inputTypeInput.id) {
          return {
            ...inputTypeInput
          }
        } else {
          return mapInputType
        }
      })
    )
  }

  function deleteInputType(id) {
    setInputTypes(
      inputTypes.filter(inputType => inputType.id !== id)
    )
  }

  return (
    <InputTypesContext.Provider value={{ inputTypes, createInputType, updateInputType, deleteInputType }}>
      {children}
    </InputTypesContext.Provider>
  )
}

export function useInputTypes() {
  const context = useContext(InputTypesContext)

  return context
}
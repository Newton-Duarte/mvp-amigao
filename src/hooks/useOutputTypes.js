import { createContext, useContext, useEffect, useState } from 'react'

const OutputTypesContext = createContext({})

export function OutputTypesProvider({ children }) {
  const [outputTypes, setOutputTypes] = useState([])

  useEffect(() => {
    setOutputTypes([
      {
        id: 1,
        name: 'Venda',
        movesStock: true
      },
      {
        id: 2,
        name: 'Empréstimo',
        movesStock: true
      },
      {
        id: 3,
        name: 'Perda',
        movesStock: true
      }
    ])
  }, [])

  function createOutputType(outputTypeInput) {
    const lastId = outputTypes[outputTypes.length - 1].id
    setOutputTypes([...outputTypes, {
      ...outputTypeInput,
      createdAt: new Date(),
      id: lastId ? lastId + 1 : 1
    }])
  }

  function updateOutputType(outputTypeInput) {
    setOutputTypes(
      outputTypes.map(mapOutputType => {
        if (mapOutputType.id === outputTypeInput.id) {
          return {
            ...outputTypeInput
          }
        } else {
          return mapOutputType
        }
      })
    )
  }

  function deleteOutputType(id) {
    setOutputTypes(
      outputTypes.filter(outputType => outputType.id !== id)
    )
  }

  return (
    <OutputTypesContext.Provider value={{ outputTypes, createOutputType, updateOutputType, deleteOutputType }}>
      {children}
    </OutputTypesContext.Provider>
  )
}

export function useOutputTypes() {
  const context = useContext(OutputTypesContext)

  return context
}
import { createContext, useContext, useState } from 'react'

const OutputsContext = createContext({})

export function OutputsProvider({ children }) {
  const [outputs, setOutputs] = useState([])

  function createOutput(outputInput) {
    const lastId = outputs[outputs.length - 1] && outputs[outputs.length - 1].id
    setOutputs([...outputs, {
      ...outputInput,
      createdAt: new Date(),
      id: lastId ? lastId + 1 : 1,
      status: 'Pendente'
    }])
  }

  function editOutput(outputInput) {
    setOutputs(
      outputs.map(mapOutput => {
        if (mapOutput.id === outputInput.id) {
          return {
            ...outputInput
          }
        } else {
          return mapOutput
        }
      })
    )
  }

  function deleteOutput(id) {
    setOutputs(
      outputs.map(output => {
        if (output.id === id) {
          return {
            ...output,
            status: 'Cancelado'
          }
        } else {
          return output
        }
      })
    )
  }

  function completeOutput(id) {
    setOutputs(
      outputs.map(output => {
        if (output.id === id) {
          return {
            ...output,
            status: 'Finalizado'
          }
        } else {
          return output
        }
      })
    )
  }

  return (
    <OutputsContext.Provider value={{ outputs, createOutput, editOutput, deleteOutput, completeOutput }}>
      {children}
    </OutputsContext.Provider>
  )
}

export function useOutputs() {
  const context = useContext(OutputsContext)

  return context
}
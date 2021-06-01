import { useEffect, useState } from 'react'

import {
  Input
} from '../../components/Common'

import { PriceTablesModal } from './PriceTablesModal'
import { PriceTablesTable } from './PriceTablesTable'

import { usePriceTables } from '../../hooks/usePriceTables'

import { Container, Header } from './styles'

export default function PriceTablesContainer() {
  const [isPriceTableModalOpen, setIsPriceTableModalOpen] = useState(false);

  const [priceTableEdit, setPriceTableEdit] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
 
  const { priceTables, createPriceTable, updatePriceTable, deletePriceTable } = usePriceTables()

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedTerm(searchTerm), 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [searchTerm])

  useEffect(() => {
    if (!isPriceTableModalOpen) {
      setPriceTableEdit(null)
    }
  }, [isPriceTableModalOpen])

  const handleAddPriceTable = (priceTable) => {
    console.log(priceTable)
    if (priceTable.id) {
      updatePriceTable(priceTable)
      setIsPriceTableModalOpen(false)
    } else {
      createPriceTable(priceTable)
      setIsPriceTableModalOpen(false)
    }
  }

  const handleEdit = priceTable => {
    console.log(priceTable)
    setPriceTableEdit(priceTable)
    setIsPriceTableModalOpen(true)
  }

  const handleDelete = id => {
    if (window.confirm(`Deseja excluir o produto ${id}?`)) {
      deletePriceTable(id)
    }
  }

  return (
    <Container>
      <Header>
        <h1>Tabelas de Preço ({priceTables.length})</h1>
        <div>
          <Input
            type="search"
            placeholder="Pesquisar..."
            onChange={({ target }) => setSearchTerm(target.value)}
          />
          <button
            type="button"
            onClick={() => setIsPriceTableModalOpen(true)}
          >
            Novo
          </button>
        </div>
      </Header>
      <PriceTablesModal
        isOpen={isPriceTableModalOpen}
        onRequestClose={() => setIsPriceTableModalOpen(false)}
        editPriceTable={priceTableEdit}
        onSubmit={handleAddPriceTable}
      />
      <PriceTablesTable
        priceTables={priceTables} 
        search={debouncedTerm}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Container>
  )
}
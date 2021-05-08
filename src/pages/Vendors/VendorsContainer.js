import { useEffect, useState } from 'react'

import {
  Input
} from '../../components/Common'

import { VendorModal } from './VendorModal'
import { VendorsTable } from './VendorsTable'

import { useVendors } from '../../hooks/useVendors'

import { Container, Header } from './styles'

export default function VendorsContainer() {
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);

  const [vendorEdit, setVendorEdit] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
 
  const { vendors, createVendor, updateVendor, deleteVendor } = useVendors()

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedTerm(searchTerm), 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [searchTerm])

  useEffect(() => {
    if (!isVendorModalOpen) {
      setVendorEdit(null)
    }
  }, [isVendorModalOpen])

  const handleAddVendor = (vendor) => {
    console.log(vendor)
    if (vendor.id) {
      updateVendor(vendor)
      setIsVendorModalOpen(false)
    } else {
      createVendor(vendor)
      setIsVendorModalOpen(false)
    }
  }

  const handleEdit = vendor => {
    console.log(vendor)
    setVendorEdit(vendor)
    setIsVendorModalOpen(true)
  }

  const handleDelete = id => {
    if (window.confirm(`Deseja excluir o fornecedor ${id}?`)) {
      deleteVendor(id)
    }
  }

  return (
    <Container>
      <Header>
        <h1>Fornecedores ({vendors.length})</h1>
        <div>
          <Input
            type="search"
            placeholder="Pesquisar..."
            onChange={({ target }) => setSearchTerm(target.value)}
          />
          <button
            type="button"
            onClick={() => setIsVendorModalOpen(true)}
          >
            Novo
          </button>
        </div>
      </Header>
      <VendorModal
        isOpen={isVendorModalOpen}
        onRequestClose={() => setIsVendorModalOpen(false)}
        editVendor={vendorEdit}
        onSubmit={handleAddVendor}
      />
      <VendorsTable
        vendors={vendors} 
        search={debouncedTerm}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Container>
  )
}
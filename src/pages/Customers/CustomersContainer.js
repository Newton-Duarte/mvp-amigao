import { useEffect, useState } from 'react'

import {
  Input
} from '../../components/Common'

import { CustomerModal } from './CustomerModal'
import { CustomersTable } from './CustomersTable'

import { useCustomers } from '../../hooks/useCustomers'

import { Container, Header } from './styles'

export default function CustomersContainer() {
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  const [customerEdit, setCustomerEdit] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
 
  const { customers, createCustomer, updateCustomer, deleteCustomer } = useCustomers()

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedTerm(searchTerm), 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [searchTerm])

  useEffect(() => {
    if (!isCustomerModalOpen) {
      setCustomerEdit(null)
    }
  }, [isCustomerModalOpen])

  const handleAddCustomer = (customer) => {
    console.log(customer)
    if (customer.id) {
      updateCustomer(customer)
      setIsCustomerModalOpen(false)
    } else {
      createCustomer(customer)
      setIsCustomerModalOpen(false)
    }
  }

  const handleEdit = customer => {
    console.log(customer)
    setCustomerEdit(customer)
    setIsCustomerModalOpen(true)
  }

  const handleDelete = id => {
    if (window.confirm(`Deseja excluir o cliente ${id}?`)) {
      deleteCustomer(id)
    }
  }

  return (
    <Container>
      <Header>
        <h1>Clientes ({customers.length})</h1>
        <div>
          <Input
            type="search"
            placeholder="Pesquisar..."
            onChange={({ target }) => setSearchTerm(target.value)}
          />
          <button
            type="button"
            onClick={() => setIsCustomerModalOpen(true)}
          >
            Novo
          </button>
        </div>
      </Header>
      <CustomerModal
        isOpen={isCustomerModalOpen}
        onRequestClose={() => setIsCustomerModalOpen(false)}
        editCustomer={customerEdit}
        onSubmit={handleAddCustomer}
      />
      <CustomersTable
        customers={customers} 
        search={debouncedTerm}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Container>
  )
}
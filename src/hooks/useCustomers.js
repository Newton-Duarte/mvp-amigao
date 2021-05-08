import { createContext, useContext, useEffect, useState } from 'react'

const CustomersContext = createContext({})

export function CustomersProvider({ children }) {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    setCustomers([
      {
        id: 1,
        name: 'Newton Duarte',
        businessName: 'Newton LTDA',
        employerNumber: '069.836.994-75',
        nationalIdentity: '',
        streetName: '',
        streetNumber: '',
        complement: '',
        city: 'Maceió',
        state: 'AL',
        postalCode: '',
        phone: '',
        email: '',
        createdAt: new Date(2021, 4, 8)
      }
    ])
  }, [])

  function createCustomer(customerInput) {
    const lastId = customers[customers.length - 1].id
    setCustomers([...customers, {
      ...customerInput,
      id: lastId ? lastId + 1 : 1,
      createdAt: new Date()
    }])
  }

  function updateCustomer(customerInput) {
    setCustomers(
      customers.map(mapCustomer => {
        if (mapCustomer.id === customerInput.id) {
          return {
            ...customerInput
          }
        } else {
          return mapCustomer
        }
      })
    )
  }

  function deleteCustomer(id) {
    setCustomers(
      customers.filter(customer => customer.id !== id)
    )
  }

  return (
    <CustomersContext.Provider value={{ customers, createCustomer, updateCustomer, deleteCustomer }}>
      {children}
    </CustomersContext.Provider>
  )
}

export function useCustomers() {
  const context = useContext(CustomersContext)

  return context
}
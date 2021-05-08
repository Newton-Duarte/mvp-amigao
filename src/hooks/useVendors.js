import { createContext, useContext, useEffect, useState } from 'react'

const VendorsContext = createContext({})

export function VendorsProvider({ children }) {
  const [vendors, setVendors] = useState([])

  useEffect(() => {
    setVendors([
      {
        id: 1,
        name: 'Água Mineral Mainá LTDA',
        businessName: 'Mainá LTDA',
        employerNumber: '12.123.456/0001-11',
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

  function createVendor(vendorInput) {
    const lastId = vendors[vendors.length - 1].id
    setVendors([...vendors, {
      ...vendorInput,
      id: lastId ? lastId + 1 : 1,
      createdAt: new Date()
    }])
  }

  function updateVendor(vendorInput) {
    setVendors(
      vendors.map(mapVendor => {
        if (mapVendor.id === vendorInput.id) {
          return {
            ...vendorInput
          }
        } else {
          return mapVendor
        }
      })
    )
  }

  function deleteVendor(id) {
    setVendors(
      vendors.filter(vendor => vendor.id !== id)
    )
  }

  return (
    <VendorsContext.Provider value={{ vendors, createVendor, updateVendor, deleteVendor }}>
      {children}
    </VendorsContext.Provider>
  )
}

export function useVendors() {
  const context = useContext(VendorsContext)

  return context
}
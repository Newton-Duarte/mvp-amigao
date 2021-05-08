import { UsersProvider } from './useUsers'
import { ProductsProvider } from './useProducts'
import { CustomersProvider } from './useCustomers'
import { VendorsProvider } from './useVendors'

export function AppProvider({ children }) {
  return (
    <UsersProvider>
      <ProductsProvider>
        <CustomersProvider>
          <VendorsProvider>
            {children}
          </VendorsProvider>
        </CustomersProvider>
      </ProductsProvider>
    </UsersProvider>
  )
}
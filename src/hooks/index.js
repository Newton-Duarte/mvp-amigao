import { UsersProvider } from './useUsers'
import { ProductsProvider } from './useProducts'
import { CustomersProvider } from './useCustomers'
import { VendorsProvider } from './useVendors'
import { MovementsProvider } from './useMovements'

export function AppProvider({ children }) {
  return (
    <UsersProvider>
      <ProductsProvider>
        <CustomersProvider>
          <VendorsProvider>
            <MovementsProvider>
              {children}
            </MovementsProvider>
          </VendorsProvider>
        </CustomersProvider>
      </ProductsProvider>
    </UsersProvider>
  )
}
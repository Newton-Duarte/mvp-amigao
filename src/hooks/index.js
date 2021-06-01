import { UsersProvider } from './useUsers'
import { ProductsProvider } from './useProducts'
import { CustomersProvider } from './useCustomers'
import { VendorsProvider } from './useVendors'
import { MovementsProvider } from './useMovements'
import { OutputTypesProvider } from './useOutputTypes'
import { OutputsProvider } from './useOutputs'

export function AppProvider({ children }) {
  return (
    <UsersProvider>
      <ProductsProvider>
        <CustomersProvider>
          <VendorsProvider>
            <MovementsProvider>
              <OutputTypesProvider>
                <OutputsProvider>
                  {children}
                </OutputsProvider>
              </OutputTypesProvider>
            </MovementsProvider>
          </VendorsProvider>
        </CustomersProvider>
      </ProductsProvider>
    </UsersProvider>
  )
}
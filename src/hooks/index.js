import { UsersProvider } from './useUsers'
import { ProductsProvider } from './useProducts'
import { CustomersProvider } from './useCustomers'
import { VendorsProvider } from './useVendors'
import { MovementsProvider } from './useMovements'
import { PriceTablesProvider } from './usePriceTables'
import { OutputTypesProvider } from './useOutputTypes'
import { InputTypesProvider } from './useInputTypes'
import { OutputsProvider } from './useOutputs'
import { InputsProvider } from './useInputs'
import { PackingListsProvider } from './usePackingLists'

export function AppProvider({ children }) {
  return (
    <UsersProvider>
      <ProductsProvider>
        <CustomersProvider>
          <VendorsProvider>
            <MovementsProvider>
              <OutputTypesProvider>
                <InputTypesProvider>
                  <PriceTablesProvider>
                    <OutputsProvider>
                      <InputsProvider>
                        <PackingListsProvider>
                          {children}
                        </PackingListsProvider>
                      </InputsProvider>
                    </OutputsProvider>
                  </PriceTablesProvider>
                </InputTypesProvider>
              </OutputTypesProvider>
            </MovementsProvider>
          </VendorsProvider>
        </CustomersProvider>
      </ProductsProvider>
    </UsersProvider>
  )
}
import { CustomersProvider } from '../../hooks/useCustomers';
import CustomersContainer from './CustomersContainer';

export default function Customers() {
  return (
    <CustomersProvider>
      <CustomersContainer />
    </CustomersProvider>
  )
}
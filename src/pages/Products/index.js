import { ProductsProvider } from '../../hooks/useProducts';
import ProductsContainer from './ProductsContainer';

export default function Products() {
  return (
    <ProductsProvider>
      <ProductsContainer />
    </ProductsProvider>
  )
}
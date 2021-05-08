import { lazy } from 'react';

// First route
import Home from '../pages/Home';

// Private Routes
const Users = lazy(() => import('../pages/Users'));
const Products = lazy(() => import('../pages/Products'));
const Customers = lazy(() => import('../pages/Customers'));
const Vendors = lazy(() => import('../pages/Vendors'));

export const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
    icon: '',
    name: 'Início',
  },
  {
    path: '/users',
    component: Users,
    icon: '',
    name: 'Usuários',
  },
  {
    path: '/products',
    component: Products,
    icon: '',
    name: 'Produtos',
  },
  {
    path: '/customers',
    component: Customers,
    icon: '',
    name: 'Clientes',
  },
  {
    path: '/vendors',
    component: Vendors,
    icon: '',
    name: 'Fornecedores',
  }
]
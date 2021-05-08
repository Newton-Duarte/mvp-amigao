import { lazy } from 'react';

// First route
import Home from '../pages/Home';

// Private Routes
const Users = lazy(() => import('../pages/Users'));
const Products = lazy(() => import('../pages/Products'));
const Customers = lazy(() => import('../pages/Customers'));

export const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
    icon: '',
    name: 'Home',
  },
  {
    path: '/users',
    component: Users,
    icon: '',
    name: 'Users',
  },
  {
    path: '/products',
    component: Products,
    icon: '',
    name: 'Products',
  },
  {
    path: '/customers',
    component: Customers,
    icon: '',
    name: 'Customers',
  }
]
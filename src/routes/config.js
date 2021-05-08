import { lazy } from 'react';

// First route
import Home from '../pages/Home';

// Private Routes
const Users = lazy(() => import('../pages/Users'));

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
  }
]
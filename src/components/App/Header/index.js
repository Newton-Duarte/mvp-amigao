import { Link, useLocation } from 'react-router-dom';
import { Container, Content, Navigation, NavItem } from './styles';

import { routes } from '../../../routes/config'

export function Header() {
  const { pathname } = useLocation()

  return (
    <Container>
      <Content>
        <h3>MVP Amigão</h3>
        
        <Navigation>
          {routes.map(route => (
            <NavItem
              key={route.name}
              active={pathname === route.path}
            >
              <Link
                to={route.path}
              >{route.name}</Link>
            </NavItem>
          ))}
        </Navigation>
      </Content>
    </Container>
  )
}
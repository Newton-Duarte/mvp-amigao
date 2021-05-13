import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Content, Navigation, NavItem } from './styles';

import { routes } from '../../../routes/config'
import { FiMenu } from 'react-icons/fi';
import { ButtonIcon } from '../../Common';

export function Header() {
  const menuRef = useRef()
  const [showMenu, setShowMenu] = useState(false)
  const { pathname } = useLocation()

  function handleClickOutside (event) {
    if (showMenu) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false)
      }
    }
  }

  useEffect(() => {
    // Add the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  return (
    <Container>
      <Content>
        <div>
          <h3>MVP Amigão</h3>
          <ButtonIcon onClick={() => setShowMenu(!showMenu)}>
            <FiMenu size={24} color="#fff" />
          </ButtonIcon>
        </div>
        
        <Navigation
          ref={menuRef}
          showMenu={showMenu}
        >
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
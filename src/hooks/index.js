import { UsersProvider } from './useUsers'

export function AppProvider({ children }) {
  return (
    <UsersProvider>
      {children}
    </UsersProvider>
  )
}
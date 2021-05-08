import { createContext, useContext, useEffect, useState } from 'react'

const UsersContext = createContext({})

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    setUsers([
      {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        createdAt: new Date(2021, 4, 7)
      }
    ])
  }, [])

  function createUser(userInput) {
    const lastId = users[users.length - 1].id
    setUsers([...users, {
      ...userInput,
      createdAt: new Date(),
      id: lastId ? lastId + 1 : 1
    }])
  }

  function updateUser(userInput) {
    setUsers(
      users.map(mapUser => {
        if (mapUser.id === userInput.id) {
          return {
            ...userInput
          }
        } else {
          return mapUser
        }
      })
    )
  }

  function deleteUser(id) {
    setUsers(
      users.filter(user => user.id !== id)
    )
  }

  return (
    <UsersContext.Provider value={{ users, createUser, updateUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  )
}

export function useUsers() {
  const context = useContext(UsersContext)

  return context
}
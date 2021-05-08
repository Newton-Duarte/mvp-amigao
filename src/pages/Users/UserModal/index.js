import { useCallback, useEffect, useState } from 'react';

import { Modal, Button, Input, FormGroup } from '../../../components/Common';

import { Container, Header } from './styles';

export function UserModal({ isOpen, onRequestClose, editUser, onSubmit }) {
  const [user, setUser] = useState({
    name: '',
    email: ''
  })

  useEffect(() => {
    if (editUser) {
      setUser(editUser)
    }
  }, [editUser])

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

  const handleSubmit = useCallback(event => {
    event.preventDefault()
    onSubmit({
      ...user
    })

    resetForm()
  }, [user, onSubmit]);

  const resetForm = () => {
    setUser({
      name: '',
      email: ''
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <Container onSubmit={handleSubmit}>
        <Header>
          <h2>{user.id ? 'Edit User' : 'New User'}</h2>
        </Header>
        <FormGroup>
          <Input
            name="name"
            label="Name"
            value={user.name}
            onChange={({ target }) => setUser({ ...user, name: target.value })}
          />
          <Input
            name="email"
            label="Email"
            type="email"
            value={user.email}
            onChange={({ target }) => setUser({ ...user, email: target.value })}
          />
        </FormGroup>
        <Button type="submit">Save</Button>
      </Container>
    </Modal>
  )
}
import { useCallback, useEffect, useState } from 'react';

import { Modal, Button, Input, FormGroup } from '../../../components/Common';

import { Actions, Container, Header } from './styles';

export function CustomerModal({ isOpen, onRequestClose, editCustomer, onSubmit }) {
  const [customer, setCustomer] = useState({
    name: '',
    businessName: '',
    employerNumber: '',
    nationalIdentity: '',
    streetName: '',
    streetNumber: '',
    complement: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    email: ''
  })

  useEffect(() => {
    if (editCustomer) {
      setCustomer(editCustomer)
    }
  }, [editCustomer])

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

  const handleSubmit = useCallback(event => {
    event.preventDefault()
    onSubmit({
      ...customer
    })

    resetForm()
  }, [customer, onSubmit]);

  const resetForm = () => {
    setCustomer({
      name: '',
      businessName: '',
      employerNumber: '',
      nationalIdentity: '',
      streetName: '',
      streetNumber: '',
      complement: '',
      city: '',
      state: '',
      postalCode: '',
      phone: '',
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
          <h2>{customer.id ? 'Editar Cliente' : 'Novo Cliente'}</h2>
        </Header>
        <FormGroup>
          <Input
            name="name"
            label="Razão Social"
            value={customer.name}
            onChange={({ target }) => setCustomer({ ...customer, name: target.value })}
          />
          <Input
            name="businessName"
            label="Nome Fantasia"
            value={customer.businessName}
            onChange={({ target }) => setCustomer({ ...customer, businessName: target.value })}
          />
          <Input
            name="employerNumber"
            label="CNPJ"
            value={customer.employerNumber}
            onChange={({ target }) => setCustomer({ ...customer, employerNumber: target.value })}
          />
          <Input
            name="nationalIdentity"
            label="Inscrição Estadual"
            value={customer.nationalIdentity}
            onChange={({ target }) => setCustomer({ ...customer, nationalIdentity: target.value })}
          />
          <Input
            name="streetName"
            label="Endereço"
            value={customer.streetName}
            onChange={({ target }) => setCustomer({ ...customer, streetName: target.value })}
          />
          <Input
            name="streetNumber"
            label="Número"
            value={customer.streetNumber}
            onChange={({ target }) => setCustomer({ ...customer, streetNumber: target.value })}
          />
          <Input
            name="complement"
            label="Complemento"
            value={customer.complement}
            onChange={({ target }) => setCustomer({ ...customer, complement: target.value })}
          />
          <Input
            name="city"
            label="Cidade"
            value={customer.city}
            onChange={({ target }) => setCustomer({ ...customer, city: target.value })}
          />
          <Input
            name="state"
            label="Estado"
            value={customer.state}
            onChange={({ target }) => setCustomer({ ...customer, state: target.value })}
          />
          <Input
            name="postalCode"
            label="CEP"
            value={customer.postalCode}
            onChange={({ target }) => setCustomer({ ...customer, postalCode: target.value })}
          />
          <Input
            name="phone"
            label="Telefone"
            value={customer.phone}
            onChange={({ target }) => setCustomer({ ...customer, phone: target.value })}
          />
          <Input
            name="email"
            label="E-mail"
            value={customer.email}
            onChange={({ target }) => setCustomer({ ...customer, email: target.value })}
          />
        </FormGroup>
        <Actions>
          <Button type="button" onClick={onRequestClose}>Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </Actions>
      </Container>
    </Modal>
  )
}
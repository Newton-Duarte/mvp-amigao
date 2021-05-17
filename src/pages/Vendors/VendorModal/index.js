import { useCallback, useEffect, useState } from 'react';

import { Modal, Button, Input, FormGroup } from '../../../components/Common';

import { Actions, Container, Header } from './styles';

export function VendorModal({ isOpen, onRequestClose, editVendor, onSubmit }) {
  const [vendor, setVendor] = useState({
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
    if (editVendor) {
      setVendor(editVendor)
    }
  }, [editVendor])

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

  const handleSubmit = useCallback(event => {
    event.preventDefault()
    onSubmit({
      ...vendor
    })

    resetForm()
  }, [vendor, onSubmit]);

  const resetForm = () => {
    setVendor({
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
          <h2>{vendor.id ? 'Editar Cliente' : 'Novo Cliente'}</h2>
        </Header>
        <FormGroup>
          <Input
            name="name"
            label="Razão Social"
            value={vendor.name}
            onChange={({ target }) => setVendor({ ...vendor, name: target.value })}
          />
          <Input
            name="businessName"
            label="Nome Fantasia"
            value={vendor.businessName}
            onChange={({ target }) => setVendor({ ...vendor, businessName: target.value })}
          />
          <Input
            name="employerNumber"
            label="CNPJ"
            value={vendor.employerNumber}
            onChange={({ target }) => setVendor({ ...vendor, employerNumber: target.value })}
          />
          <Input
            name="nationalIdentity"
            label="Inscrição Estadual"
            value={vendor.nationalIdentity}
            onChange={({ target }) => setVendor({ ...vendor, nationalIdentity: target.value })}
          />
          <Input
            name="streetName"
            label="Endereço"
            value={vendor.streetName}
            onChange={({ target }) => setVendor({ ...vendor, streetName: target.value })}
          />
          <Input
            name="streetNumber"
            label="Número"
            value={vendor.streetNumber}
            onChange={({ target }) => setVendor({ ...vendor, streetNumber: target.value })}
          />
          <Input
            name="complement"
            label="Complemento"
            value={vendor.complement}
            onChange={({ target }) => setVendor({ ...vendor, complement: target.value })}
          />
          <Input
            name="city"
            label="Cidade"
            value={vendor.city}
            onChange={({ target }) => setVendor({ ...vendor, city: target.value })}
          />
          <Input
            name="state"
            label="Estado"
            value={vendor.state}
            onChange={({ target }) => setVendor({ ...vendor, state: target.value })}
          />
          <Input
            name="postalCode"
            label="CEP"
            value={vendor.postalCode}
            onChange={({ target }) => setVendor({ ...vendor, postalCode: target.value })}
          />
          <Input
            name="phone"
            label="Telefone"
            value={vendor.phone}
            onChange={({ target }) => setVendor({ ...vendor, phone: target.value })}
          />
          <Input
            name="email"
            label="E-mail"
            value={vendor.email}
            onChange={({ target }) => setVendor({ ...vendor, email: target.value })}
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
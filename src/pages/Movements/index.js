import { useEffect, useState } from 'react';
import { Input } from '../../components/Common';
import { MovementModal } from './MovementsModal';
import { MovementsTable } from './MovementsTable';
import { MovementsTotalizer } from './MovementsTotalizer';
import { useMovements } from '../../hooks/useMovements';
import { Container, Header } from './styles'

export default function Movements() {
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
  const { 
    movements, 
    createMovement, 
    editMovement, 
    deleteMovement, 
    completeMovement 
  } = useMovements()
  const [movementEdit, setMovementEdit] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedTerm(searchTerm), 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [searchTerm])

  useEffect(() => {
    if (!isMovementModalOpen) {
      setMovementEdit(null)
    }
  }, [isMovementModalOpen])

  const handleAddMovement = (movement) => {
    console.log(movement)
    if (movement.id) {
      editMovement(movement)
      setIsMovementModalOpen(false)
    } else {
      createMovement(movement)
      setIsMovementModalOpen(false)
    }
  }

  const handleEdit = movement => {
    console.log(movement)
    setMovementEdit(movement)
    setIsMovementModalOpen(true)
  }

  const handleDelete = id => {
    if (window.confirm(`Deseja excluir o movimento ${id}?`)) {
      deleteMovement(id)
    }
  }

  const handleComplete = id => {
    if (window.confirm(`Deseja finalizar o movimento ${id}?`)) {
      completeMovement(id)
    }
  }

  return (
    <Container>
      <Header>
        <h1>Movimentos ({movements.length})</h1>
        <div>
          <Input
            type="search"
            placeholder="Pesquisar..."
            onChange={({ target }) => setSearchTerm(target.value)}
          />
          <button
            type="button"
            onClick={() => setIsMovementModalOpen(true)}
          >
            Novo
          </button>
        </div>
      </Header>
      <MovementsTotalizer />
      <MovementModal
        isOpen={isMovementModalOpen}
        onRequestClose={() => setIsMovementModalOpen(false)}
        editMovement={movementEdit}
        onSubmit={handleAddMovement}
      />
      <MovementsTable
        movements={movements} 
        search={debouncedTerm}
        onEdit={handleEdit}
        onComplete={handleComplete}
        onDelete={handleDelete}
      />
    </Container>
  )
}
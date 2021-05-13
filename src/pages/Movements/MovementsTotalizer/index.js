import { useMovements } from "../../../hooks/useMovements";
import { Container } from "./styled";

export function MovementsTotalizer() {
  const { movements } = useMovements()

  const summary = movements.reduce((acc, movement) => {
    const currentDate = new Date().getDate()
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const movementDate = new Date(movement.createdAt).getDate()
    const movementMonth = new Date(movement.createdAt).getMonth()
    const movementYear = new Date(movement.createdAt).getFullYear()

    if (currentDate === movementDate) {
      acc.dayTotal++
    }

    if (currentMonth === movementMonth) {
      acc.monthTotal++
    }

    if (currentYear === movementYear) {
      acc.yearTotal++
    }

    acc.total++
    return acc
  }, {
    total: 0,
    dayTotal: 0,
    monthTotal: 0,
    yearTotal: 0
  })

  return (
    <Container>
      <div>
        <h5>Total</h5>
        <span>{summary.total}</span>
      </div>
      <div>
        <h5>Dia</h5>
        <span>{summary.dayTotal}</span>
      </div>
      <div>
        <h5>Mês</h5>
        <span>{summary.monthTotal}</span>
      </div>
      <div>
        <h5>Ano</h5>
        <span>{summary.yearTotal}</span>
      </div>
    </Container>
  )
}
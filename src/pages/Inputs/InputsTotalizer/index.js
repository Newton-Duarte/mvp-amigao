import { useInputs } from "../../../hooks/useInputs";
import { Container } from "./styled";

export function InputsTotalizer() {
  const { inputs } = useInputs()

  const summary = inputs.reduce((acc, input) => {
    const currentDate = new Date().getDate()
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const inputDate = new Date(input.createdAt).getDate()
    const inputMonth = new Date(input.createdAt).getMonth()
    const inputYear = new Date(input.createdAt).getFullYear()

    if (currentDate === inputDate) {
      acc.dayTotal++
    }

    if (currentMonth === inputMonth) {
      acc.monthTotal++
    }

    if (currentYear === inputYear) {
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
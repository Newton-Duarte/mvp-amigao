import { useOutputs } from "../../../hooks/useOutputs";
import { Container } from "./styled";

export function OutputsTotalizer() {
  const { outputs } = useOutputs()

  const summary = outputs.reduce((acc, output) => {
    const currentDate = new Date().getDate()
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const outputDate = new Date(output.createdAt).getDate()
    const outputMonth = new Date(output.createdAt).getMonth()
    const outputYear = new Date(output.createdAt).getFullYear()

    if (currentDate === outputDate) {
      acc.dayTotal++
    }

    if (currentMonth === outputMonth) {
      acc.monthTotal++
    }

    if (currentYear === outputYear) {
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
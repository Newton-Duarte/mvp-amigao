import { usePackingLists } from "../../../hooks/usePackingLists";
import { Container } from "./styled";

export function PackingListsTotalizer() {
  const { packingLists } = usePackingLists()

  const summary = packingLists.reduce((acc, packingList) => {
    const currentDate = new Date().getDate()
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const packingListDate = new Date(packingList.createdAt).getDate()
    const packingListMonth = new Date(packingList.createdAt).getMonth()
    const packingListYear = new Date(packingList.createdAt).getFullYear()

    if (currentDate === packingListDate) {
      acc.dayTotal++
    }

    if (currentMonth === packingListMonth) {
      acc.monthTotal++
    }

    if (currentYear === packingListYear) {
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
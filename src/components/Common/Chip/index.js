import { Container } from './styles'

export function Chip({ children, ...rest }) {
  return (
    <Container {...rest}>
      {children}
    </Container>
  )
}
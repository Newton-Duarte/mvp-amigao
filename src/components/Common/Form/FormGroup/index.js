import { Container } from "./styles";

export function FormGroup({ children, ...rest }) {
  return (
    <Container {...rest}>
      {children}
    </Container>
  )
}
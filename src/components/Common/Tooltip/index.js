import { Container, Text } from "./styles";

export function Tooltip({ text, children }) {
  return (
    <Container>
      {children}
      <Text className="tooltip">{text}</Text>
    </Container>
  )
}
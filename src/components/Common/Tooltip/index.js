import { Container, Text } from "./styles";

export function Tooltip({ text, left, children }) {
  return (
    <Container>
      {children}
      <Text className="tooltip" left={left}>{text}</Text>
    </Container>
  )
}
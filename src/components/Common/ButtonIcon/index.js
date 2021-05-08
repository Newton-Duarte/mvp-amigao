import { Button } from "./styles";

export function ButtonIcon({ children, ...rest }) {
  return (
    <Button {...rest}>
      {children}
    </Button>
  )
}
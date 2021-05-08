import { useRef, useCallback, useState } from "react";

import { Container } from "./styles";

export function Select({ 
  name, 
  label, 
  children, 
  error,
  containerStyle = {}, 
  ...rest 
}) {
  const selectRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!selectRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  
  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      data-testid="select-container"
    >
      <label>{label}</label>
      <select
        ref={selectRef}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      >
        <option value="" disabled>{label}</option>
        {children}
      </select>
      {error && <span className="error">{error}</span>}
    </Container>
  )
}
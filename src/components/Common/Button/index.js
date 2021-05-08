import React from 'react';

import { Container } from './styles';

export function Button({ children, loading, ...rest }) {
  return (
    <Container type="button" { ...rest }>
      {loading ? 'Carregando ...' : children}
    </Container>
  );
}
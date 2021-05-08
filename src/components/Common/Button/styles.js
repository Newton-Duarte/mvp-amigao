import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: var(--blue-light);
  height: 56px;
  border-radius: 0.25rem;
  border: 0;
  padding: 0 16px;
  color: #FFF;
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, '#6933ff')};
  }
`;
import styled from 'styled-components'

export const Container = styled.div`
  display: inline-block;
  position: relative;
  &:hover .tooltip {
    visibility: visible;
  }
`

export const Text = styled.span`
  padding: .5rem;
  border-radius: 0.25rem;
  background: var(--text-title);
  color: var(--shape);
  font-size: 14px;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  z-index: 1;
  visibility: hidden;
`
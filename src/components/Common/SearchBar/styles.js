import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 240px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  input {
    padding-right: 15%;
  }
`

export const Filters = styled.div`
  position: absolute;
  width: 100%;
  top: 65px;
  left: 0;
  padding: 1rem;
  background: #fff;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;

  input[type="date"] {
    padding-right: 16px;
  }

  button#save {
    background: transparent;
    border: 1px solid var(--blue);
    width: 100%;
    margin-left: 0;
    height: 48px;
    box-shadow: none;
    color: var(--text-title);
    margin-top: 1rem;
    transition: background .2s, color .2s;

    &:hover {
      background: var(--blue);
      color: #fff;
    }
  }

  // arrow-up
  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background: #fff;
    position: absolute;
    right: 20px;
    top: -4px;
    transition: background-color .2s ease;
    transform: rotate(45deg);
  }
`

export const Append = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 3%;
  width: 24px !important;
  height: 24px !important;

  > div button {
    color: var(--green);
  }
`
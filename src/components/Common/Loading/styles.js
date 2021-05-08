import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  border-radius: 50%;
  width: 10em;
  height: 10em;
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 1);
  border-right: 1.1em solid rgba(255, 255, 255, 1);
  border-bottom: 1.1em solid rgba(255, 255, 255, 1);
  border-left: 1.1em solid #5429cc;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: ${loading} 1.1s infinite linear;
  animation: ${loading} 1.1s infinite linear;
  &::after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
`
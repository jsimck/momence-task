import { memo } from 'react';
import styled, { keyframes } from 'styled-components';

export const Loader = memo(() => {
  return (
    <LoaderOverlay>
      <Spinner />
    </LoaderOverlay>
  );
});

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.backgroundOverlay};
  backdrop-filter: blur(4px);
  z-index: 50;
  border-radius: ${props => props.theme.radius.lg};
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${props => props.theme.colors.backgroundSecondary};
  border-top-color: ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

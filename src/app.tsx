import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { Converter } from './components/converter/converter';
import { Loader } from './components/loader';
import { RatesTable } from './components/rates-table/rates-table';

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO connect to actual data fetch
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper>
      <Container>
        {isLoading ? (
          <LoadingWrapper>
            <Loader />
          </LoadingWrapper>
        ) : (
          <ContentWrapper>
            <Converter />
            <RatesTable />
          </ContentWrapper>
        )}
      </Container>
    </Wrapper>
  );
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  padding: 60px 20px;
  background-color: #f8fafc;
  background-image:
    radial-gradient(at 0% 0%, hsla(253, 16%, 90%, 1) 0, transparent 50%),
    radial-gradient(at 50% 0%, hsla(225, 39%, 90%, 1) 0, transparent 50%),
    radial-gradient(at 100% 0%, hsla(339, 49%, 90%, 1) 0, transparent 50%);

  &::before {
    content: '';
    position: absolute;
    top: -10%;
    left: -10%;
    width: 60%;
    height: 60%;
    background: radial-gradient(
      circle,
      rgba(99, 102, 241, 0.15) 0%,
      rgba(0, 0, 0, 0) 70%
    );
    filter: blur(60px);
    z-index: 0;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10%;
    right: -10%;
    width: 60%;
    height: 60%;
    background: radial-gradient(
      circle,
      rgba(236, 72, 153, 0.1) 0%,
      rgba(0, 0, 0, 0) 70%
    );
    filter: blur(60px);
    z-index: 0;
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 480px;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.6s ease-out;
`;

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
`;

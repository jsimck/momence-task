import { ArrowUpDown } from 'lucide-react';
import { memo } from 'react';
import styled from 'styled-components';

import { useCurrencyStore } from '../../stores/currency-store';

export const ConverterDivider = memo(() => {
  const swapCurrencies = useCurrencyStore(state => state.swapCurrencies);

  return (
    <Container>
      <Button aria-label='Swap currencies' onClick={swapCurrencies}>
        <ArrowUpDown size={20} />
      </Button>
    </Container>
  );
});

const Container = styled.div`
  position: relative;
  z-index: 10;
  top: -10px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: ${props => props.theme.colors.primary};
  border-radius: 50%;
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.sm};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
    background-color: ${props => props.theme.colors.backgroundSecondary};
    box-shadow: ${props => props.theme.shadows.md};
  }

  &:active {
    transform: scale(0.95);
  }
`;

import { memo } from 'react';
import styled from 'styled-components';
import { useShallow } from 'zustand/shallow';

import { ConverterDivider } from './converter-divider';
import { ConverterHeader } from './converter-header';
import { ConverterInput } from './converter-input';
import { useCurrencyStore } from '../../stores/currency-store';

export const Converter = memo(() => {
  const {
    fromAmount,
    toAmount,
    fromCurrency,
    toCurrency,
    lastUpdated,
    setFromAmount,
    setFromCurrency,
    setToCurrency,
  } = useCurrencyStore(
    useShallow(state => ({
      fromAmount: state.fromAmount,
      toAmount: state.toAmount,
      fromCurrency: state.fromCurrency,
      toCurrency: state.toCurrency,
      lastUpdated: state.lastUpdated,
      setFromAmount: state.setFromAmount,
      setFromCurrency: state.setFromCurrency,
      setToCurrency: state.setToCurrency,
    })),
  );

  return (
    <Card>
      <ConverterHeader lastUpdated={lastUpdated || 'N/A'}>
        Currency Converter
      </ConverterHeader>

      <ConverterSection>
        <Top>
          <ConverterInput
            label='From'
            value={fromAmount}
            onChange={setFromAmount}
            currency={fromCurrency}
            onCurrencyChange={setFromCurrency}
          />
        </Top>

        <DividerWrapper>
          <ConverterDivider />
        </DividerWrapper>

        <Bottom>
          <ConverterInput
            label='To'
            value={toAmount}
            readOnly
            currency={toCurrency}
            onCurrencyChange={setToCurrency}
          />
        </Bottom>
      </ConverterSection>
    </Card>
  );
});

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  background: ${props => props.theme.colors.background};
  backdrop-filter: blur(12px);
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.glass};
  border: 1px solid ${props => props.theme.colors.borderLight};
  overflow: hidden;
  position: relative;
`;

const ConverterSection = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Top = styled.div`
  display: flex;
  padding: 0 24px 24px;
  flex-direction: column;
  z-index: 1;
`;

const Bottom = styled.div`
  display: flex;
  padding: 24px 24px 24px;
  flex-direction: column;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.02);
`;

const DividerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

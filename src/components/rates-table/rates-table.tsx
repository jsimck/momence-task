import { memo } from 'react';
import styled from 'styled-components';

import { getFlagImageByCode } from '../../constants/currency-code-to-flag';
import { formatRate } from '../../lib/format-rate';
import { useCurrencyStore } from '../../stores/currency-store';

export const RatesTable = memo(() => {
  const rates = useCurrencyStore(state => state.rates);
  const getCurrency = useCurrencyStore(state => state.getCurrency);
  const toCurrency = useCurrencyStore(state => state.toCurrency);

  const baseCurrency = getCurrency(toCurrency);
  const baseRate = baseCurrency?.amount ?? 1;
  const baseAmount = baseCurrency?.rate ?? 1;
  const normalizedBaseRate = baseAmount / baseRate;

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <Th>Currency</Th>
            <Th>
              Rate {baseRate} (vs {toCurrency})
            </Th>
          </tr>
        </thead>
        <tbody>
          {rates.map(currency => {
            const normalizedCurrencyRate = currency.rate / currency.amount;
            const relativeRate = normalizedCurrencyRate / normalizedBaseRate;

            return (
              <Tr key={currency.code}>
                <Td>
                  <CurrencyCell>
                    <FlagImage
                      src={getFlagImageByCode(currency.code)}
                      alt={`${currency.code} flag`}
                    />
                    <Code>{currency.code}</Code>
                  </CurrencyCell>
                </Td>
                <Td>{formatRate(relativeRate, 1)}</Td>
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </TableWrapper>
  );
});

const TableWrapper = styled.div`
  max-height: 600px;
  overflow-y: auto;
  border-radius: ${props => props.theme.radius.lg};
  background: ${props => props.theme.colors.background};
  backdrop-filter: blur(12px);
  box-shadow: ${props => props.theme.shadows.glass};
  border: 1px solid ${props => props.theme.colors.borderLight};

  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: ${props => props.theme.radius.lg};
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 3px;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.25);
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

const Th = styled.th`
  text-align: left;
  padding: 20px 32px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
  letter-spacing: 0.05em;
  color: ${props => props.theme.colors.mutedForeground};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
  position: sticky;
  top: 0;
  z-index: 10;

  &:last-child {
    text-align: right;
  }
`;

const Td = styled.td`
  padding: 20px 32px;
  font-size: 15px;
  color: ${props => props.theme.colors.foreground};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transition: background-color 0.2s;

  &:last-child {
    text-align: right;
    font-variant-numeric: tabular-nums;
    font-weight: 500;
  }
`;

const Tr = styled.tr`
  &:last-child ${Td} {
    border-bottom: none;
  }

  &:hover ${Td} {
    background-color: ${props => props.theme.colors.backgroundSecondary};
  }
`;

const FlagImage = styled.img`
  width: 24px;
  height: 18px;
  border-radius: 4px;
  object-fit: cover;
  margin-right: 16px;
  vertical-align: middle;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CurrencyCell = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const Code = styled.span`
  font-weight: 600;
  letter-spacing: -0.01em;
`;

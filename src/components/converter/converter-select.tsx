import { ChevronDown, Check } from 'lucide-react';
import { Select } from 'radix-ui';
import { memo } from 'react';
import styled from 'styled-components';

import { getFlagImageByCode } from '../../constants/currency-code-to-flag';
import { useCurrencyStore } from '../../stores/currency-store';

export interface ConverterSelectProps {
  currency: string;
  onCurrencyChange: (code: string) => void;
}

export const ConverterSelect = memo(
  ({ currency, onCurrencyChange }: ConverterSelectProps) => {
    const rates = useCurrencyStore(state => state.rates);

    return (
      <Select.Root value={currency} onValueChange={onCurrencyChange}>
        <SelectTrigger>
          <Select.Value />
          <SelectIcon>
            <ChevronDown size={16} />
          </SelectIcon>
        </SelectTrigger>
        <Select.Portal>
          <SelectContent position='popper' sideOffset={5}>
            <SelectViewport>
              {rates.map(currency => (
                <SelectItem key={currency.code} value={currency.code}>
                  <SelectItemIndicator>
                    <Check size={14} />
                  </SelectItemIndicator>
                  <Select.ItemText>
                    <ItemContent>
                      <FlagImage
                        src={getFlagImageByCode(currency.code)}
                        alt={`${currency.code} flag`}
                      />
                      {currency.code}
                    </ItemContent>
                  </Select.ItemText>
                </SelectItem>
              ))}
            </SelectViewport>
          </SelectContent>
        </Select.Portal>
      </Select.Root>
    );
  },
);

const SelectTrigger = styled(Select.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border-radius: ${props => props.theme.radius.md};
  padding: 0 8px 0 8px;
  font-size: 16px;
  line-height: 1;
  height: 40px;
  gap: 8px;
  background-color: transparent;
  color: ${props => props.theme.colors.foreground};
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.backgroundSecondary};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary};
  }
`;

const SelectIcon = styled(Select.Icon)`
  color: ${props => props.theme.colors.muted};
  display: flex;
  align-items: center;
`;

const SelectContent = styled(Select.Content)`
  overflow: hidden;
  background-color: ${props => props.theme.colors.backgroundSolid};
  border-radius: ${props => props.theme.radius.md};
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.border};
  z-index: 50;
  min-width: var(--radix-select-trigger-width);
`;

const SelectViewport = styled(Select.Viewport)`
  padding: 5px;
  max-height: 300px;
  overflow-y: auto;
`;

const SelectItem = styled(Select.Item)`
  font-size: 14px;
  line-height: 1;
  color: ${props => props.theme.colors.foreground};
  border-radius: ${props => props.theme.radius.sm};
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 35px 0 25px;
  position: relative;
  user-select: none;
  cursor: default;

  &[data-highlighted] {
    outline: none;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primaryFg};
  }
`;

const SelectItemIndicator = styled(Select.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const FlagImage = styled.img`
  width: 20px;
  height: 15px;
  border-radius: 2px;
  object-fit: cover;
  margin-right: 8px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center;
`;

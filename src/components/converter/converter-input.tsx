import { memo, useCallback, type ChangeEvent } from 'react';
import styled from 'styled-components';

import { ConverterSelect } from './converter-select';

export interface ConverterInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  currency: string;
  onCurrencyChange: (code: string) => void;
}

export const ConverterInput = memo(
  ({
    label,
    placeholder = '0.00',
    value,
    readOnly,
    onChange,
    currency,
    onCurrencyChange,
  }: ConverterInputProps) => {
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Allow empty string, numbers, and single decimal point
        if (inputValue === '' || inputValue === '.') {
          onChange?.(inputValue);

          return;
        }

        // Validate: only numbers and one decimal point
        const isValid = /^\d*\.?\d*$/.test(inputValue);

        if (isValid) {
          onChange?.(inputValue);
        }
      },
      [onChange],
    );

    return (
      <Wrapper>
        {label && <Label>{label}</Label>}
        <Container>
          <CountryWrapper>
            <ConverterSelect
              currency={currency}
              onCurrencyChange={onCurrencyChange}
            />
          </CountryWrapper>
          <InputWrapper
            type='text'
            placeholder={placeholder}
            value={value}
            readOnly={readOnly}
            onChange={handleChange}
          />
        </Container>
      </Wrapper>
    );
  },
);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
`;

const CountryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const InputWrapper = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.theme.colors.foreground};
  text-align: right;
  width: 100%;
  min-width: 0;

  &::placeholder {
    color: ${props => props.theme.colors.muted};
  }
`;

const Label = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.muted};
  margin-bottom: 8px;
  font-weight: 500;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

import styled from 'styled-components';

import { ConverterSelect } from './converter-select';

interface ConverterInputProps {
  label?: string;
  type: 'from' | 'to';
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
}

export function ConverterInput({
  label,
  type,
  placeholder = '0.00',
  value,
  readOnly,
}: ConverterInputProps) {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <Container>
        <CountryWrapper>
          <ConverterSelect type={type} />
        </CountryWrapper>
        <InputWrapper
          type='text'
          placeholder={placeholder}
          defaultValue={value}
          readOnly={readOnly}
        />
      </Container>
    </Wrapper>
  );
}

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

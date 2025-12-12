import { memo, type ReactNode } from 'react';
import styled from 'styled-components';

import { Metadata } from './metadata';

export interface ConverterHeaderProps {
  children?: ReactNode;
  lastUpdated?: string;
}

export const ConverterHeader = memo(
  ({ children, lastUpdated }: ConverterHeaderProps) => (
    <Header>
      <Title>{children}</Title>
      <Metadata lastUpdated={lastUpdated} />
    </Header>
  ),
);

const Header = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${props => props.theme.colors.foreground};
  margin: 0;
`;

import { memo } from 'react';
import styled from 'styled-components';

export interface MetadataProps {
  lastUpdated?: string;
}

export const Metadata = memo(({ lastUpdated }: MetadataProps) => {
  return (
    <Container>
      <span>Last updated:</span>
      <DateText>{lastUpdated}</DateText>
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${props => props.theme.colors.mutedForeground};
`;

const DateText = styled.span`
  font-weight: 500;
`;

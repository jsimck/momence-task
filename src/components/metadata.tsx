import { RefreshCw } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

interface MetadataProps {
  isRefreshing?: boolean;
  onRefresh?: () => void;
}

export function Metadata({ isRefreshing = false, onRefresh }: MetadataProps) {
  return (
    <Container>
      <span>Last updated:</span>
      <DateText>11 Dec 2025</DateText>
      <RefreshButton
        onClick={onRefresh}
        disabled={isRefreshing}
        aria-label='Refresh rates'
        $isRefreshing={isRefreshing}
      >
        <RefreshCw size={14} />
      </RefreshButton>
    </Container>
  );
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${props => props.theme.colors.mutedForeground};
`;

const RefreshButton = styled.button<{ $isRefreshing?: boolean }>`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.radius.full};
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.backgroundSecondary};
  }

  &:active:not(:disabled) {
    opacity: 0.7;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  svg {
    transition: transform 0.5s ease;
    animation: ${props =>
      props.$isRefreshing ? `${spin} 0.5s linear infinite` : 'none'};
  }
`;

const DateText = styled.span`
  font-weight: 500;
`;

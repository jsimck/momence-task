import { RefreshCw } from 'lucide-react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 0 4px;
  margin-bottom: -16px;
  z-index: 10;
`;

const Text = styled.span`
  font-size: 12px;
  color: ${props => props.theme.colors.muted};
  margin-right: 8px;
`;

const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.primary};
  padding: 4px;
  border-radius: ${props => props.theme.radius.sm};
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.backgroundSecondary};
  }

  &:active {
    transform: rotate(180deg);
  }

  svg {
    transition: transform 0.5s ease;
  }
`;

interface MetadataProps {
  lastUpdated: string;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export function Metadata({
  lastUpdated,
  onRefresh,
  isRefreshing,
}: MetadataProps) {
  return (
    <Container>
      <Text>Rates updated: {lastUpdated}</Text>
      <RefreshButton
        onClick={onRefresh}
        disabled={isRefreshing}
        aria-label='Refresh rates'
      >
        <RefreshCw
          size={14}
          style={{
            animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
            transform: isRefreshing ? 'rotate(360deg)' : 'none',
          }}
        />
      </RefreshButton>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Container>
  );
}

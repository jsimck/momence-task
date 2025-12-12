import { memo } from 'react';
import styled from 'styled-components';

export interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

export const Error = memo(({ message, onRetry }: ErrorProps) => {
  return (
    <ErrorCard>
      <ErrorContent>
        <ErrorTitle>Failed to load currency rates</ErrorTitle>
        {message && <ErrorMessage>{message}</ErrorMessage>}
        {onRetry && (
          <RetryButton onClick={onRetry} type='button'>
            Try again
          </RetryButton>
        )}
      </ErrorContent>
    </ErrorCard>
  );
});

const ErrorCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  max-width: 480px;
  padding: 32px;
  background: ${props => props.theme.colors.background};
  backdrop-filter: blur(12px);
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.glass};
  border: 1px solid ${props => props.theme.colors.borderLight};
`;

const ErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
`;

const ErrorTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.colors.foreground};
  margin: 0;
`;

const ErrorMessage = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.muted};
  margin: 0;
`;

const RetryButton = styled.button`
  margin-top: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.primaryFg};
  background-color: ${props => props.theme.colors.primary};
  border: none;
  border-radius: ${props => props.theme.radius.md};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

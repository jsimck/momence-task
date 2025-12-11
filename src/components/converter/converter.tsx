import styled from 'styled-components';

import { ConverterDivider } from './converter-divider';
import { ConverterInput } from './converter-input';
import { Metadata } from '../metadata';

export function Converter() {
  return (
    <Card>
      <Header>
        <Title>Currency Converter</Title>
        <Metadata />
      </Header>

      <ConverterSection>
        <Top>
          <ConverterInput label='From' type='from' value='1000' />
        </Top>

        <DividerWrapper>
          <ConverterDivider />
        </DividerWrapper>

        <Bottom>
          <ConverterInput label='To' type='to' value='940.50' readOnly />
        </Bottom>
      </ConverterSection>
    </Card>
  );
}

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
  background: ${props => props.theme.colors.titleGradient};
  background-clip: text;
  -webkit-text-fill-color: transparent;
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

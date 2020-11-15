import styled, { css } from 'styled-components';

export const LabelInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.h2`
  margin-top: 0;
`;

export const Input = styled.input`
  background: #ffffff;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 0.75rem;
  font-size: inherit;
`;

export const buttonStyles = css`
  padding: 0.75rem;
  background-color: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.primaryText};
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: inherit;
`;

export const Button = styled.button`
  ${buttonStyles}
`;

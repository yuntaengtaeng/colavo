import React from 'react';
import styled from 'styled-components';

interface StyledProps {
  color: string;
  backgroundColor: string;
  width?: string;
}

const StyledButton = styled.button<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;
  touch-action: manipulation;
  height: 2rem;
  padding: 0.25rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.125rem;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
`;

interface Props extends StyledProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: Props) => {
  const { children, ...rest } = props;
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;

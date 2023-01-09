import React from 'react';
import styled from 'styled-components';
import { GRAY, WHITE } from '../../../constants/color';
import { useNavigate } from 'react-router-dom';

import { VscClose } from 'react-icons/vsc';

type Property =
  | 'center'
  | 'end'
  | 'flex-end'
  | 'flex-start'
  | 'left'
  | 'right'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'
  | 'start';

interface StyledProps {
  justifyContent?: Property;
}

const Header = styled.header<StyledProps>`
  height: 3.5rem;
  width: 100vw;
  display: flex;
  align-items: center;
  background-color: ${WHITE};
  justify-content: ${(props) => props.justifyContent};
`;

interface Props extends StyledProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const BaseHeader = (props: Props) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (props.onClick) {
      props.onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <Header justifyContent={props.justifyContent}>
      <VscClose color={GRAY} onClick={onClickHandler} size={36} />
      {props.children}
    </Header>
  );
};

export default BaseHeader;

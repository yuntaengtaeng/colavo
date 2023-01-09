import React from 'react';
import styled from 'styled-components';

import { LIGHT_GRAY } from '../../constants/color';

const Round = styled.div`
  background-color: ${LIGHT_GRAY};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.425rem;
  border-radius: 0.625rem;
  min-width: max-content;
`;

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

const RoundButton = (props: Props) => {
  return <Round onClick={props.onClick}>{props.children}</Round>;
};

export default RoundButton;

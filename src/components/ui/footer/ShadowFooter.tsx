import React from 'react';
import styled from 'styled-components';

import { WHITE } from '../../../constants/color';

interface StyledProps {
  padding?: string;
}

const Footer = styled.footer<StyledProps>`
  background-color: ${WHITE};
  box-shadow: rgb(0 0 0 / 12%) 0px -4px 3px, rgb(0 0 0 / 24%) 0px 4px 3px;
  width: 100vw;
  padding: ${(props) => props.padding};
`;

interface Props extends StyledProps {
  children?: React.ReactNode;
}

const ShadowFooter = (props: Props) => {
  return <Footer padding={props.padding}>{props.children}</Footer>;
};

export default ShadowFooter;

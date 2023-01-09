import React from 'react';
import styled from 'styled-components';

import { BLACK, GRAY, PINK } from '../../constants/color';

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 0rem;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  margin-left: 1rem;
`;

const Title = styled.p`
  color: ${BLACK};
  margin-bottom: 0.4rem;
`;

const Description = styled.p`
  color: ${GRAY};
  margin-bottom: 0.4rem;
`;

const Sub = styled.p`
  color: ${PINK};
`;

interface Props {
  title: string;
  description?: string;
  sub?: string;
  rightContents?: React.ReactNode;
  onClick?: () => void;
}

const ListItem = (props: Props) => {
  return (
    <Card onClick={props.onClick}>
      <Left>
        <Title>{props.title}</Title>
        {props.description && <Description>{props.description}</Description>}
        {props.sub && <Sub>{props.sub}</Sub>}
      </Left>
      {props.rightContents && <Right>{props.rightContents}</Right>}
    </Card>
  );
};

export default ListItem;

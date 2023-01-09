import styled from 'styled-components';
import BaseHeader from './BaseHeader';

import { GRAY } from '../../../constants/color';

import { VscAdd } from 'react-icons/vsc';

const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
`;

interface Props {
  title?: string;
  plusOnClickHanlder?: () => void;
}

const TitleHeader = (props: Props) => {
  return (
    <BaseHeader justifyContent="space-between">
      <Title>{props.title}</Title>
      {!!props.plusOnClickHanlder && <VscAdd color={GRAY} size={36} />}
    </BaseHeader>
  );
};

export default TitleHeader;

import styled from 'styled-components';

import { PURPLE, WHITE, LIGHT_PURPLE } from '../../../constants/color';
import Button from '../Button';

const Footer = styled.footer`
  background-color: ${PURPLE};
  width: 100vw;
  padding: 1rem;
`;

const Guide = styled.p`
  color: ${WHITE};
  font-size: 0.8rem;
  margin-bottom: 0.625rem;
  text-align: center;
`;

interface Props {
  word?: string;
  onCompleteHandler: () => void;
}

const BackgroundFooter = (props: Props) => {
  return (
    <Footer>
      <Guide>{props.word}</Guide>
      <Button
        color={WHITE}
        backgroundColor={LIGHT_PURPLE}
        width="100%"
        onClick={props.onCompleteHandler}
      >
        완료
      </Button>
    </Footer>
  );
};

export default BackgroundFooter;

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { GRAY } from '../../constants/color';

export interface Position {
  top?: number;
  right?: number;
}

interface StyledProps extends Position {
  opacity: number;
}

const Options = styled.div<StyledProps>`
  width: 12.5rem;
  position: fixed;
  box-shadow: 0px 0px 10px #b2b2b2;
  background: #fff;
  z-index: 200;
  border: 1px solid ${GRAY};

  opacity: ${(props) => props.opacity};
  top: ${(props) => props.top}px;
  right: ${(props) => props.right}px;

  display: flex;
  flex-direction: column;

  transition: opacity 1s;
`;

const HorizontalLine = styled.hr`
  width: 100%;
  color: ${GRAY};
  margin: 0;
`;

const Top = styled.div`
  width: 100%;
  padding: 0.625rem 0.425rem;
`;

const Middle = styled.div`
  height: 9.375rem;
  overflow-y: scroll;
`;

const Bottom = styled.div`
  width: 100%;
`;

interface Props {
  menuTitle: string;
  middleContents: React.ReactNode;
  bottomContents: React.ReactNode;
  backgroundClickHandler?: () => void;
}

const OptionMenu = (props: Props) => {
  const optionRef = useRef<HTMLDivElement>(null);
  const { menuTitle, middleContents, bottomContents, backgroundClickHandler } =
    props;

  const [position, setPosition] = useState<Position>({ top: 0, right: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (
        optionRef.current !== null &&
        !optionRef.current?.parentNode?.contains(e.target)
      ) {
        if (backgroundClickHandler) {
          backgroundClickHandler();
        }
      }
    };

    window.addEventListener('click', pageClickEvent);

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [backgroundClickHandler, props]);

  useEffect(() => {
    const parentElement = optionRef.current?.parentElement;

    if (parentElement) {
      /*
      오른 쪽 끝에 배치해야하기 때문에 right 같은 경우
      => 현재 화면 가로 크기 - right(화면 왼쪽 기준 오른쪽 어디에 있다는 값(부모))

      화면 기준으로 아래에 모달을 배치할 수 있는지 여부를 판단하여 top의 높이를 설정
      => (현재 화면 세로 크기 - 화면 상단부터 대상의 처음 위치 값(부모))가 (보여줄 모달 높이 + 부모의 엘리먼트의 높이)
      보다 크다면 아래에 노출 아니라면 위에 노출
      */

      const displayHeight = window.innerHeight;
      const displayWidht = window.innerWidth;

      const {
        y: parentY,
        right: parentRight,
        height: parentHeight,
      } = parentElement.getBoundingClientRect();
      const optionHeight = optionRef.current.getBoundingClientRect().height;

      const top = (() => {
        if (displayHeight - parentY > optionHeight + parentHeight) {
          return parentY + parentHeight;
        } else {
          return parentY - optionHeight;
        }
      })();

      setPosition({ top, right: displayWidht - parentRight });
      setOpacity(1);
    }
  }, []);

  return (
    <Options
      ref={optionRef}
      top={position.top}
      right={position.right}
      opacity={opacity}
    >
      <Top>{menuTitle}</Top>
      <HorizontalLine />
      <Middle>{middleContents}</Middle>
      <HorizontalLine />
      <Bottom>{bottomContents}</Bottom>
    </Options>
  );
};

export default OptionMenu;

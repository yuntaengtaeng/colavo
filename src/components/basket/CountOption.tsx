import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import { useBasketDispatch } from '../../store/Provider';

import { AiOutlineDown } from 'react-icons/ai';
import { GRAY, PINK, WHITE, LIGHT_PURPLE } from '../../constants/color';

import OptionMenu from '../ui/OptionMenu';
import Button from '../ui/Button';
import RoundButton from '../ui/RoundButton';

const Count = styled.p`
  color: ${GRAY};
  margin-right: 0.425rem;
`;

interface StyledProps {
  isSelected: boolean;
}

const Item = styled.div<StyledProps>`
  padding: 0.625rem 0rem;
  text-align: center;

  ${({ isSelected }) =>
    isSelected &&
    `
        background-color : ${LIGHT_PURPLE};
        color : ${WHITE};
    `}
`;

const OptionMenuBottom = styled.div`
  display: flex;
  align-items: center;

  > button {
    flex: 1;
  }
`;

interface Props {
  id: string;
  count: number;
  menuTitle: string;
}

const MAX = 100;

const CountOption = (props: Props) => {
  const basketDispatch = useBasketDispatch();
  const element = useRef<HTMLDivElement>(null);

  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [selectedItemCount, setSelectedItemCount] = useState<number>(0);

  useEffect(() => {
    setSelectedItemCount(props.count);
  }, [props.count]);

  const menuVisibleControl = (isVisible: boolean) => {
    setIsMenuVisible(isVisible);
  };

  const roundOnClickHandler = () => {
    menuVisibleControl(!isMenuVisible);
  };

  const onBackgroundClickHandler = () => {
    menuVisibleControl(false);
  };

  const onItemClickHandler = (count: number) => {
    setSelectedItemCount(count);
  };

  const onDeleteHandler = () => {
    basketDispatch({ type: 'DELTED_BUSKET_ITEM', id: props.id });
  };

  const onCompleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    basketDispatch({
      type: 'CHANGE_BUSKET_ITEM',
      id: props.id,
      count: selectedItemCount,
    });
    menuVisibleControl(false);
  };

  useEffect(() => {
    if (isMenuVisible) {
      element.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isMenuVisible]);

  return (
    <>
      <RoundButton onClick={roundOnClickHandler}>
        <Count>{props.count}</Count>
        <AiOutlineDown size={16} color={GRAY} />
      </RoundButton>
      {isMenuVisible && (
        <OptionMenu
          menuTitle={props.menuTitle}
          middleContents={
            <>
              {new Array(MAX).fill(null).map((_, index) => (
                <Item
                  key={index}
                  isSelected={selectedItemCount === index + 1}
                  onClick={onItemClickHandler.bind(this, index + 1)}
                  {...(selectedItemCount === index + 1 && { ref: element })}
                >
                  {index + 1}
                </Item>
              ))}
            </>
          }
          bottomContents={
            <OptionMenuBottom>
              <Button
                color={PINK}
                backgroundColor={WHITE}
                onClick={onDeleteHandler}
              >
                삭제
              </Button>
              <Button
                color={GRAY}
                backgroundColor={WHITE}
                onClick={onCompleteHandler}
              >
                완료
              </Button>
            </OptionMenuBottom>
          }
          backgroundClickHandler={onBackgroundClickHandler}
        />
      )}
    </>
  );
};

export default CountOption;

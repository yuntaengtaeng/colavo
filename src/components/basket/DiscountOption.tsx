import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useBasketDispatch, useBasketState } from '../../store/Provider';

import { AiOutlineDown, AiOutlineCheck } from 'react-icons/ai';
import { GRAY, PINK, WHITE, PURPLE } from '../../constants/color';

import OptionMenu from '../ui/OptionMenu';
import Button from '../ui/Button';
import RoundButton from '../ui/RoundButton';
import ListItem from '../ui/ListItem';

const Text = styled.p`
  color: ${GRAY};
  margin-right: 0.425rem;
`;

const OptionMenuMiddle = styled.div`
  padding: 0 1rem;
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
  menuTitle: string;
}

const DiscountOption = (props: Props) => {
  const { baskets, selectedDiscounts } = useBasketState();
  const basketDispatch = useBasketDispatch();

  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);

  const menuVisibleControl = (isVisible: boolean) => {
    setIsMenuVisible(isVisible);
  };

  const roundOnClickHandler = () => {
    menuVisibleControl(!isMenuVisible);
  };

  const onBackgroundClickHandler = () => {
    menuVisibleControl(false);
  };

  const itemOnClickHandler = (key: string) => {
    const clone = [...selectedTargets];

    const findIndex = clone.findIndex((k: string) => key === k);

    if (findIndex === -1) {
      clone.push(key);
    } else {
      clone.splice(findIndex, 1);
    }

    setSelectedTargets(clone);
  };

  const onDeleteHandler = () => {
    basketDispatch({ type: 'DELETE_DISCOUNT', id: props.id });
  };

  const onCompleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    basketDispatch({
      type: 'SET_DISCOUNT_TARGET',
      targets: selectedTargets,
      id: props.id,
    });
    menuVisibleControl(false);
  };

  useEffect(() => {
    if (
      Object.keys(selectedDiscounts).length &&
      Object.keys(baskets).length &&
      props.id
    ) {
      const targets =
        selectedDiscounts[props.id].target &&
        selectedDiscounts[props.id].target?.length
          ? selectedDiscounts[props.id].target
          : Object.keys(baskets);

      setSelectedTargets(targets as string[]);
    }
  }, [selectedDiscounts, baskets, props.id]);

  return (
    <>
      <RoundButton onClick={roundOnClickHandler}>
        <Text>수정</Text>
        <AiOutlineDown size={16} color={GRAY} />
      </RoundButton>
      {isMenuVisible && (
        <OptionMenu
          menuTitle={props.menuTitle}
          middleContents={
            <OptionMenuMiddle>
              {Object.entries(baskets).map(([key, value]) => {
                const title = `${value.name}${
                  value.count > 1 ? `X${value.count}` : ''
                }`;
                return (
                  <ListItem
                    key={key}
                    title={title}
                    onClick={() => {
                      itemOnClickHandler(key);
                    }}
                    description={`${value.price.toLocaleString()}원`}
                    rightContents={
                      <AiOutlineCheck
                        size={24}
                        color={selectedTargets.includes(key) ? PURPLE : WHITE}
                      />
                    }
                  />
                );
              })}
            </OptionMenuMiddle>
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

export default DiscountOption;

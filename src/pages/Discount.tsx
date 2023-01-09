import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { useBasketDispatch, useBasketState } from '../store/Provider';
import { Discounts, DiscountData, SelectedDiscounts } from '../store/Provider';

import { BaseContents, BaseWrap } from '../styles/pageStructure';
import { PURPLE, WHITE } from '../constants/color';

import { AiOutlineCheck } from 'react-icons/ai';
import TitleHeader from '../components/ui/header/TitleHeader';
import BackgroundFooter from '../components/ui/footer/BackgroundFooter';
import ListItem from '../components/ui/ListItem';

import { rateToPercent } from '../common/utils';

const Wrap = styled(BaseWrap)``;

const Contents = styled(BaseContents)``;

const Discount = () => {
  const navigate = useNavigate();

  const { data, selectedDiscounts } = useBasketState();
  const dispatch = useBasketDispatch();

  const discounts = data.discounts as Discounts;
  const [selectedDiscountItem, setSelectedDiscountItem] =
    useState<SelectedDiscounts>({});

  const itemOnClickHandler = (key: string, value: DiscountData) => {
    const clone = { ...selectedDiscountItem };
    if (clone[key]) {
      delete clone[key];
    } else {
      clone[key] = value;
    }
    setSelectedDiscountItem(clone);
  };

  const completePressed = () => {
    const clone = { ...selectedDiscountItem };
    dispatch({ type: 'SET_DISCOUNTS', discounts: clone });
    navigate(-1);
  };

  useEffect(() => {
    setSelectedDiscountItem(selectedDiscounts);
  }, [selectedDiscounts]);

  return (
    <Wrap>
      <TitleHeader title="할인" plusOnClickHanlder={() => {}} />
      <Contents>
        {Object.entries(discounts).map(([key, value]) => {
          const discountInformation = (() => {
            if (value.rate) {
              return rateToPercent(value.rate);
            }
          })();

          return (
            <ListItem
              key={key}
              title={value.name}
              onClick={() => {
                itemOnClickHandler(key, value);
              }}
              sub={`${discountInformation}%`}
              rightContents={
                <AiOutlineCheck
                  size={24}
                  color={selectedDiscountItem[key] ? PURPLE : WHITE}
                />
              }
            />
          );
        })}
      </Contents>
      <BackgroundFooter
        onCompleteHandler={completePressed}
        word="할인을 선택하세요(여러 개 선택가능)"
      />
    </Wrap>
  );
};

export default Discount;

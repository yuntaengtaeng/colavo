import { useCallback } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { useBasketState } from '../store/Provider';
import {
  GRAY,
  BLACK,
  LIGHT_GRAY,
  PINK,
  LIGHT_PINK,
  PURPLE,
  WHITE,
} from '../constants/color';
import { BaseContents, BaseWrap } from '../styles/pageStructure';

import BaseHeader from '../components/ui/header/BaseHeader';
import Button from '../components/ui/Button';
import AmountInformation from '../components/basket/AmountInformation';
import ShadowFooter from '../components/ui/footer/ShadowFooter';
import ListItem from '../components/ui/ListItem';
import OptionCount from '../components/basket/CountOption';
import DiscountOption from '../components/basket/DiscountOption';

import { AiFillPlusCircle } from 'react-icons/ai';

import { calcDiscountAmount, rateToPercent } from '../common/utils';

const Wrap = styled(BaseWrap)``;

const HeaderCenter = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;

const UserName = styled.p`
  color: ${BLACK};
`;

const TIme = styled.p`
  color: ${GRAY};
`;

const Contents = styled(BaseContents)``;

const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  > button {
    flex: 1;
  }

  > button:first-child {
    margin-right: 1rem;
  }
`;

const Basket = () => {
  const navigate = useNavigate();

  const { baskets, selectedDiscounts } = useBasketState();

  const movePage = useCallback(
    (target: string) => {
      navigate(`/${target}`);
    },
    [navigate]
  );

  return (
    <Wrap>
      <BaseHeader>
        <HeaderCenter>
          <UserName>고윤태</UserName>
          <TIme>2019.6.14. 오후 5:30</TIme>
        </HeaderCenter>
      </BaseHeader>
      <Contents>
        <Options>
          <Button
            color={GRAY}
            backgroundColor={LIGHT_GRAY}
            onClick={movePage.bind(this, 'item')}
          >
            <AiFillPlusCircle size={20} color={GRAY} />
            시술
          </Button>
          <Button
            color={PINK}
            backgroundColor={LIGHT_PINK}
            onClick={movePage.bind(this, 'discount')}
          >
            <AiFillPlusCircle size={20} color={PINK} />
            할인
          </Button>
        </Options>
        {Object.entries(baskets).map(([key, value]) => {
          return (
            <ListItem
              key={key}
              title={value.name}
              description={`${value.price.toLocaleString()}원`}
              rightContents={
                <OptionCount
                  id={key}
                  count={value.count}
                  menuTitle={value.name}
                />
              }
            />
          );
        })}
        {Object.entries(selectedDiscounts).map(([key, value]) => {
          const discountAmount = calcDiscountAmount(baskets, value);

          const data =
            value.target && value.target.length
              ? [...value.target]
              : [...Object.keys(baskets)];

          const discounTargets: string = data
            .map(
              (key: string) =>
                `${baskets[key].name}${
                  baskets[key].count > 1 ? `X${baskets[key].count}` : ''
                }`
            )
            .join(', ');

          return (
            <ListItem
              key={key}
              title={value.name}
              description={discounTargets}
              sub={`-${discountAmount.toLocaleString()}원(${rateToPercent(
                value.rate
              )}%)`}
              rightContents={<DiscountOption id={key} menuTitle={value.name} />}
            />
          );
        })}
      </Contents>
      <ShadowFooter padding="1rem">
        <AmountInformation />
        <Button color={WHITE} backgroundColor={PURPLE} width="100%">
          다음
        </Button>
      </ShadowFooter>
    </Wrap>
  );
};

export default Basket;

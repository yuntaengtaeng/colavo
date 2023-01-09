import styled from 'styled-components';

import { useBasketState } from '../../store/Provider';

import { BLACK, GRAY } from '../../constants/color';

import { calcDiscountAmount } from '../../common/utils';

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.4rem;
`;

const Left = styled.p`
  color: ${GRAY};
  font-size: 0.8rem;
`;

const Right = styled.p`
  color: ${BLACK};
  font-size: 1.4rem;
`;

const AmountInformation = () => {
  const {
    baskets,
    selectedDiscounts,
    data: { currency_code },
  } = useBasketState();

  const basketsTotal = Object.values(baskets).reduce((acc, cur) => {
    const sum = cur.price * cur.count;
    acc += sum;
    return acc;
  }, 0);

  const DiscountTotal = Object.values(selectedDiscounts).reduce((acc, cur) => {
    const discountAmout = calcDiscountAmount(baskets, cur);
    acc += discountAmout;
    return acc;
  }, 0);

  const total = (basketsTotal - DiscountTotal).toLocaleString();

  return (
    <Wrap>
      <Left>합계</Left>
      <Right>{currency_code === 'KRW' ? `${total}원` : `$${total}`}</Right>
    </Wrap>
  );
};

export default AmountInformation;

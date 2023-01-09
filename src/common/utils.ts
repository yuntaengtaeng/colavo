import { Baskets, SelectedDiscountData } from '../store/Provider';

export const rateToPercent = (rate: number): string => {
  return (100 * rate).toFixed();
};

export const calcDiscountAmount = (
  baskets: Baskets,
  selectedDiscount: SelectedDiscountData
): number => {
  const data =
    selectedDiscount.target && selectedDiscount.target.length
      ? [...selectedDiscount.target]
      : [...Object.keys(baskets)];

  const total = data.reduce((acc, cur) => {
    const { count = 0, price = 0 } = baskets[cur];
    const amount = count * price;

    acc += amount;

    return acc;
  }, 0);

  const discountAmount: number = (() => {
    if (selectedDiscount.rate) {
      const discount = total * selectedDiscount.rate;
      return discount;
    }

    return 0;
  })();

  return discountAmount;
};

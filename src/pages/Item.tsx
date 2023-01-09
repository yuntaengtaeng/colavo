import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineCheck } from 'react-icons/ai';

import { BaseContents, BaseWrap } from '../styles/pageStructure';
import { PURPLE, WHITE } from '../constants/color';

import TitleHeader from '../components/ui/header/TitleHeader';
import BackgroundFooter from '../components/ui/footer/BackgroundFooter';
import ListItem from '../components/ui/ListItem';

import { useBasketState, useBasketDispatch } from '../store/Provider';
import { Items, ItemData, Baskets } from '../store/Provider';

import { useNavigate } from 'react-router-dom';

const Wrap = styled(BaseWrap)``;

const Contents = styled(BaseContents)``;

const Item = () => {
  const navigate = useNavigate();

  const { data, baskets } = useBasketState();
  const dispatch = useBasketDispatch();

  const items = data.items as Items;
  const [selectedItem, setSelectedItem] = useState<Baskets>({});

  const itemOnClickHandler = (key: string, value: ItemData) => {
    const clone = { ...selectedItem };
    if (clone[key]) {
      delete clone[key];
    } else {
      clone[key] = value;
    }

    setSelectedItem(clone);
  };

  const completePressed = () => {
    dispatch({ type: 'SET_BUSKETS', baskets: selectedItem });
    navigate(-1);
  };

  useEffect(() => {
    setSelectedItem(baskets);
  }, [baskets]);

  return (
    <Wrap>
      <TitleHeader title="시술메뉴" plusOnClickHanlder={() => {}} />
      <Contents>
        {Object.entries(items).map(([key, value]) => {
          return (
            <ListItem
              key={key}
              title={value.name}
              onClick={() => {
                itemOnClickHandler(key, value);
              }}
              description={`${value.price.toLocaleString()}원`}
              rightContents={
                <AiOutlineCheck
                  size={24}
                  color={selectedItem[key] ? PURPLE : WHITE}
                />
              }
            />
          );
        })}
      </Contents>
      <BackgroundFooter
        onCompleteHandler={completePressed}
        word="서비스를 선택하세요(여러 개 선택가능)"
      />
    </Wrap>
  );
};

export default Item;

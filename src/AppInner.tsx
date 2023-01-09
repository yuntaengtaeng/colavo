import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useBasketDispatch, useBasketState } from './store/Provider';

import Basket from './pages/Basket';
import Item from './pages/Item';
import Discount from './pages/Discount';

const AppInner = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const basketDispatch = useBasketDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          'https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData'
        );

        basketDispatch({ type: 'SET_DATA', data });
        setIsReady(true);
      } catch (error) {
        console.error('error');
      }
    };

    getData();
  }, [basketDispatch]);

  return (
    <>
      {isReady && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Basket />} />
            <Route path="/item" element={<Item />} />
            <Route path="/discount" element={<Discount />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default AppInner;

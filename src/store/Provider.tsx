import React, { useReducer, useContext, createContext, Dispatch } from 'react';

export interface ItemData {
  count: number;
  name: string;
  price: number;
}

export interface DiscountData {
  name: string;
  rate: number;
}

export interface SelectedDiscountData extends DiscountData {
  target?: string[];
}

export interface Items {
  [key: string]: ItemData;
}

export interface Discounts {
  [key: string]: DiscountData;
}

export interface Baskets {
  [key: string]: ItemData;
}

export interface SelectedDiscounts {
  [key: string]: SelectedDiscountData;
}

interface Data {
  items?: Items;
  discounts?: Discounts;
  currency_code?: string;
}

interface State {
  data: Data;
  baskets: Baskets;
  selectedDiscounts: SelectedDiscounts;
}

type Action =
  | { type: 'SET_DATA'; data: Data }
  | { type: 'SET_BUSKETS'; baskets: Baskets }
  | { type: 'DELTED_BUSKET_ITEM'; id: string }
  | { type: 'CHANGE_BUSKET_ITEM'; id: string; count: number }
  | { type: 'SET_DISCOUNTS'; discounts: SelectedDiscounts }
  | { type: 'SET_DISCOUNT_TARGET'; id: string; targets: string[] }
  | { type: 'DELETE_DISCOUNT'; id: string };

type BasketDispatch = Dispatch<Action>;

const BasketStateContext = createContext<State | null>(null);
const BasketDispatchContext = createContext<BasketDispatch | null>(null);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_DATA': {
      return {
        ...state,
        data: action.data,
      };
    }

    case 'SET_BUSKETS': {
      return {
        ...state,
        baskets: action.baskets,
      };
    }

    case 'DELTED_BUSKET_ITEM': {
      const clone = { ...state };
      delete clone.baskets[action.id];

      const deleteDiscountTarget: SelectedDiscounts = Object.entries(
        clone.selectedDiscounts
      ).reduce((acc, [key, value]) => {
        if (value.target && value.target.length) {
          value.target = value.target.filter(
            (targetId: string) => targetId !== action.id
          );
        }

        acc = { ...acc, [key]: value };

        return acc;
      }, {});

      clone.selectedDiscounts = deleteDiscountTarget;

      return clone;
    }

    case 'CHANGE_BUSKET_ITEM': {
      const clone = { ...state };
      clone.baskets[action.id].count = action.count;

      return clone;
    }

    case 'SET_DISCOUNTS': {
      return {
        ...state,
        selectedDiscounts: action.discounts,
      };
    }

    case 'SET_DISCOUNT_TARGET': {
      const clone = { ...state };
      clone.selectedDiscounts[action.id].target = action.targets;
      return clone;
    }

    case 'DELETE_DISCOUNT': {
      const clone = { ...state };
      delete clone.selectedDiscounts[action.id];

      return clone;
    }

    default:
      throw new Error('Unhandled action');
  }
};

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    data: {},
    baskets: {},
    selectedDiscounts: {},
  });

  return (
    <BasketStateContext.Provider value={state}>
      <BasketDispatchContext.Provider value={dispatch}>
        {children}
      </BasketDispatchContext.Provider>
    </BasketStateContext.Provider>
  );
};

export const useBasketState = () => {
  const state = useContext(BasketStateContext);
  if (!state) throw new Error('Cannot find Provider');
  return state;
};

export const useBasketDispatch = () => {
  const dispatch = useContext(BasketDispatchContext);
  if (!dispatch) throw new Error('Cannot find Provider');
  return dispatch;
};

export default Provider;

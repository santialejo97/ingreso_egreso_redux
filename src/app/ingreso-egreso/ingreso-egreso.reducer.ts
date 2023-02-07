import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './ingreso-egreso.actions';
import { IngresoEgresos } from '../models/ingreso-egreso.model';

export interface State {
  items: IngresoEgresos[];
}

export const initialState: State = {
  items: [],
};

export const ingresoEgresoReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unSetItems, (state) => ({ ...state, items: [] }))
);

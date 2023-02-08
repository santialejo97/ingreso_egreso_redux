import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './ingreso-egreso.actions';
import { IngresoEgresos } from '../models/ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface State {
  items: IngresoEgresos[];
}

// export interface AppStateWithIngreso extends AppState {
//   items: State;
// }

export const initialState: State = {
  items: [],
};

export const ingresoEgresoReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unSetItems, (state) => ({ ...state, items: [] }))
);

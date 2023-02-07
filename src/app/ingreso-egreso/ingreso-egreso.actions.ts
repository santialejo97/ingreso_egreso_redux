import { createAction, props } from '@ngrx/store';
import { IngresoEgresos } from '../models/ingreso-egreso.model';

export const setItems = createAction(
  '[IngresoEgreso Component] setItems',
  props<{ items: IngresoEgresos[] }>()
);
export const unSetItems = createAction('[IngresoEgreso Component] unSetItems');

import { createAction, props } from '@ngrx/store';

export const isLoading = createAction(
  '[UI Componentt isLoading',
  props<{ value: boolean }>()
);

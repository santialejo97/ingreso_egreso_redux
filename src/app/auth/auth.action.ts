import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';

export const setUser = createAction(
  '[Auth Component] setUser',
  props<{ user: Usuario }>()
);

export const UnSetUser = createAction('[Auth Component] UnSetUser');

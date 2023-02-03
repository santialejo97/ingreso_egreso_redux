import { createReducer, on } from '@ngrx/store';
import { setUser, UnSetUser } from './auth.action';
import { Usuario } from '../models/usuario.model';

export interface State {
  user: Usuario | null;
}

export const initialState: State = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user: { ...user } })),
  on(UnSetUser, (state) => ({ ...state, user: null }))
);

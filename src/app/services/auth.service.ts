import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map, Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { UnSetUser, setUser } from '../auth/auth.action';
import { unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  unSubscrition!: Subscription;
  private _user!: Usuario | null;

  constructor(
    private auth: AngularFireAuth,
    private firebase: AngularFirestore,
    private store: Store<AppState>
  ) {}

  get user() {
    return this._user;
  }

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      if (fuser) {
        this.unSubscrition = this.firebase
          .doc(`${fuser.uid}/usuario`)
          .valueChanges()
          .subscribe((firestoreUser: any) => {
            const user = Usuario.formFirebase(firestoreUser);
            this._user = user;
            this.store.dispatch(setUser({ user }));
          });
      } else {
        this._user = null;
        if (this.unSubscrition != undefined) {
          this.unSubscrition.unsubscribe();
        }

        this.store.dispatch(UnSetUser());
        this.store.dispatch(unSetItems());
      }
    });
  }

  crearUsuario(usuario: { nombre: string; email: string; password: string }) {
    return this.auth
      .createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then(({ user }) => {
        const newUser = new Usuario(user?.uid!, usuario.nombre, usuario.email);
        return this.firebase.doc(`${user?.uid}/usuario`).set({ ...newUser });
      });
  }

  loginUsuario(usuario: { email: string; password: string }) {
    return this.auth.signInWithEmailAndPassword(
      usuario.email,
      usuario.password
    );
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(map((fuser) => fuser != null));
  }
}

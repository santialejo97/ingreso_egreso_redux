import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map, Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { UnSetUser, setUser } from '../auth/auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  unSubscrition!: Subscription;

  constructor(
    private auth: AngularFireAuth,
    private firebase: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      console.log('esta en estado', fuser?.uid);
      if (fuser) {
        console.log('existe', fuser?.uid);
        this.unSubscrition = this.firebase
          .doc(`${fuser.uid}/usuario`)
          .valueChanges()
          .subscribe((firestoreUser: any) => {
            console.log(firestoreUser);
            const user = Usuario.formFirebase(firestoreUser);
            this.store.dispatch(setUser({ user }));
          });
      } else {
        console.log('no existe');
        this.unSubscrition.unsubscribe();
        this.store.dispatch(UnSetUser());
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

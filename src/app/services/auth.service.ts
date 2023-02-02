import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private firebase: AngularFirestore
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      console.log(fuser?.uid);
      console.log(fuser?.email);
      console.log(fuser);
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

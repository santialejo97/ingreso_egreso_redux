import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgresos } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgresos) {
    console.log(this.authService.user?.uid);
    delete ingresoEgreso.uid;
    return this.firestore
      .doc(`${this.authService.user?.uid}/engresos-egresos`)
      .collection('iteams')
      .add({ ...ingresoEgreso });
  }

  initIngresosEgresosListener(uid: string) {
    return this.firestore
      .collection(`${uid}/engresos-egresos/iteams`)
      .valueChanges({ idField: 'uid' });
  }

  borrarIteam(uid: string) {
    return this.firestore
      .doc(`${this.authService.user?.uid}/engresos-egresos/iteams/${uid}`)
      .delete();
  }
}
